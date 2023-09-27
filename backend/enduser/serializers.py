from rest_framework import serializers
from .models import EndUser

class EndUserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndUser
        fields = ('email', 'password', 'name', 'wallet_id', 'rollno', 'branch', 'year')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = EndUser.objects.create_user(**validated_data)
        return user

class EndUserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
