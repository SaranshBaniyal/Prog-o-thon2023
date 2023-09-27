from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import EndUserSignUpSerializer, EndUserLoginSerializer
import base64
from django.core.files.base import ContentFile
import cv2
import face_recognition
import uuid
import os
import tempfile
from rest_framework.exceptions import ValidationError
from .models import EndUser
import numpy as np

class EndUserSignUp(APIView):
    def post(self, request):
        serializer = EndUserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            image_base64 = request.data.get('image_base64')
            try:
                    image_data = base64.b64decode(image_base64)
            except Exception as e:
                return Response({'error': 'Invalid base64 encoding for image.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Generate a unique file name for the image (e.g., using uuid)
            image_filename = f"{uuid.uuid4()}.png"

            # Create a ContentFile from the decoded image data
            user.image.save(image_filename, ContentFile(image_data), save=True)
            
            img = face_recognition.load_image_file(user.image.url.lstrip('/'))
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            user.image_encodings = (face_recognition.face_encodings(img)[0]).tolist()
            user.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({'access_token': access_token}, status=status.HTTP_201_CREATED)
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
                return Response({'access_token': access_token}, status=status.HTTP_200_OK)
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

            # Create a temporary directory to store the image
            temp_dir = tempfile.mkdtemp()

    
            image_filename = f"{temp_dir}/temp_image.png"

            # Write the image data to the temporary file
            with open(image_filename, 'wb') as temp_file:
                temp_file.write(image_data)

            print(image_filename)
            img = face_recognition.load_image_file(image_filename)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            temp_encodings = face_recognition.face_encodings(img)[0]
            print("User", current_user.image_encodings)
            print("Temp", temp_encodings)
            
            result = face_recognition.compare_faces([current_user.image_encodings], temp_encodings)
            os.remove(image_filename)
            os.rmdir(temp_dir)

            return Response({'result': result}, status=status.HTTP_200_OK)
        else:
            raise ValidationError({'error': 'Image data (image_base64) is required.'}, code=status.HTTP_400_BAD_REQUEST)