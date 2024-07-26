from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import EndUserSignUpSerializer, EndUserLoginSerializer
import base64
import cv2
import face_recognition
from rest_framework.exceptions import ValidationError
from .models import EndUser
import numpy as np
from .utils import add_voter_to_contract, create_election_in_contract, verify_voter_face

class EndUserSignUp(APIView):
    def post(self, request):
        serializer = EndUserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            image_base64 = request.data.get('image_base64')
            try:
                image_data = base64.b64decode(image_base64)
            except Exception as e:
                return Response({'error': 'Invalid base64 encoding for image.'}, status=status.HTTP_400_BAD_REQUEST)
            
            user: EndUser = serializer.save()

            np_array = np.frombuffer(image_data, np.uint8)
            img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

            if img is None:
                return Response({'error': 'Failed to decode image data.'}, status=status.HTTP_400_BAD_REQUEST)
            
            encodings = face_recognition.face_encodings(img)
            if len(encodings) == 0:
                return Response({'error': 'No face found in the image.'}, status=status.HTTP_400_BAD_REQUEST)

            encodings = encodings[0]

            user.image_encodings = encodings.tolist()
            user.save()
            
            # To add voter to the contract
            tx_hash = add_voter_to_contract(user.wallet_id)

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({
                                'access_token': access_token,
                                'wallet_id': user.wallet_id,
                                'transaction_hash': tx_hash
                             }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EndUserLogin(APIView):
    def post(self, request):
        serializer = EndUserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                return Response({'access_token': access_token,
                                 'wallet_id': user.wallet_id}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FaceId(APIView):
    def post(self, request):
        current_user = EndUser.objects.get(email=request.data.get('email'))
        image_base64 = request.data.get('image_base64')
        if image_base64:
            try:
                image_data = base64.b64decode(image_base64)
            except Exception as e:
                return Response({'error': 'Invalid base64 encoding for image.'}, status=status.HTTP_400_BAD_REQUEST)
            

            np_array = np.frombuffer(image_data, np.uint8)
            img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

            if img is None:
                return Response({'error': 'Failed to decode image data.'}, status=status.HTTP_400_BAD_REQUEST)
            
            temp_encodings = face_recognition.face_encodings(img)
            if len(temp_encodings) == 0:
                return Response({'error': 'No face found in the image.'}, status=status.HTTP_400_BAD_REQUEST)

            temp_encodings = temp_encodings[0]
            
            result = face_recognition.compare_faces([current_user.image_encodings], temp_encodings)
            face_distance = face_recognition.face_distance([current_user.image_encodings], temp_encodings)

            # Logic for allowing user to vote on contract
            if(result):
                tx_hash = verify_voter_face(request.data.get('election_id'), current_user.wallet_id)

                return Response({'result': result,
                                'face_distance': face_distance,
                                'transaction_hash': tx_hash}, status=status.HTTP_200_OK)
            
            return Response({'result': result,
                                'error': 'Face match not found.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            raise ValidationError({'error': 'Image (image_base64) is required.'}, code=status.HTTP_400_BAD_REQUEST)

  
class CreateElectionView(APIView):
# View for creating new election
    def post(self, request):
        candidates = request.data.get('candidates')
        end_datetime = request.data.get('end_datetime')
        position = request.data.get('position')

        if not candidates or not end_datetime or not position:
            return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tx_hash = create_election_in_contract(candidates, end_datetime, position)
            return Response({'transaction_hash': tx_hash, 'candidates': candidates, 'end_datetime': end_datetime, 'position': position}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

