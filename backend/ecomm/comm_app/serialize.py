from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerialize(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class CreateUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")


class AuthUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")