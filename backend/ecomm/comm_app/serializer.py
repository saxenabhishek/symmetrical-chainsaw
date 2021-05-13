from rest_framework import serializers
from django.contrib.auth.models import User


class CreateUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["username", "email", "password"]


class AuthUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "password"]
