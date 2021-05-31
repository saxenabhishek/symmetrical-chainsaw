from django.contrib.auth import REDIRECT_FIELD_NAME, authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework import authentication
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)


from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import CreateUserSerializer, AuthUserSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    Disables all CSRF verification.

    """

    def enforce_csrf(self, request):
        return None


class CreateUserView(APIView):
    """

    API for all User Creation.

    """

    authentication_classes = (CsrfExemptSessionAuthentication,
                              BasicAuthentication)

    serializer_class = CreateUserSerializer

    def post(self, request):
        """
        Args:
            request

        Returns:
            Respones -> HTTP_201_CREATED on user registeration,
            Response -> HTTP_400_BAD_REQUEST on registration error 

        """

        if not request.session.exists(request.session.session_key):
            request.session.create()

        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        serial_data = self.serializer_class(data=request.data)

        if serial_data.is_valid():
            User.objects.create_user(username=email, first_name=username,
                                     password=password)

            params = {
                "User": "Created"
            }

            return Response(params, status=status.HTTP_201_CREATED)

        params = {
            "ERROR": "User Not Created"
        }

        return Response(params, status=status.HTTP_400_BAD_REQUEST)

    def get(self):
        return Response(status=status.HTTP_404_NOT_FOUND)


class RemoveUser(APIView):

    permission_classes = [IsAuthenticated]
    serializer_class = AuthUserSerializer

    def delete(self, request):
        if not self.request.session.exists(self.request.session.keys):
            self.request.session.create()

        serial_data = self.serializer_class(data=request.data)

        if serial_data.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')

            if user := authenticate(username=email, password=password):

                user.delete()

                params = {
                    str(request.user): "Deleted"
                }

                return Response(params, status=status.HTTP_200_OK)

            params = {
                "Invalid Credentials": "Failed"
            }
            return Response(params, status=status.HTTP_400_BAD_REQUEST)

        params = {
            "ERROR": "USER NOT FOUND"
        }

        return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication,
                              BasicAuthentication)

    serializer_class = AuthUserSerializer

    def get(self, request):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if not request.session.exists(request.session.session_key):
            request.session.create()

        serial_data = self.serializer_class(data=request.data)

        if serial_data.is_valid():
            if verify := authenticate(username=request.data.get('email'),
                                      password=request.data.get('password')):

                token = RefreshToken.for_user(verify)

                return Response({'user_id': verify.id,
                                 'email': verify.username,
                                 'username': verify.first_name,
                                 'access_token': str(token.access_token)}, status=status.HTTP_200_OK)

            params = {
                "Invalid Credentials": None
            }

            return Response(params, status=status.HTTP_400_BAD_REQUEST)

        params = {
            "ERROR": "INVALID DATA"
        }

        return Response(params, status=status.HTTP_400_BAD_REQUEST)
