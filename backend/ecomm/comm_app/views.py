from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import generics, status
from .serialize import UserSerialize, CreateUser, AuthUser
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken



class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return None


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerialize

    
class CreateUserView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = CreateUser

    def post(self, request):
        if not request.session.exists(request.session.session_key):
            request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')

            User.objects.create_user(email=email, username=username,
                                     password=password)

            return Response(status=status.HTTP_201_CREATED)

        return Response(data='Username', status=status.HTTP_400_BAD_REQUEST)

    def get(self):
        return Response(status=status.HTTP_404_NOT_FOUND)


class LoginUser(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = AuthUser

    def get(self, request):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if not request.session.exists(request.session.session_key):
            request.session.create()

        verify = authenticate(username=request.data.get('username'),
                              password=request.data.get('password'))
        if verify:
            token = RefreshToken.for_user(verify)

            return Response({'user_id': verify.id,
                             'username': verify.username,
                             'access_token': str(token.access_token)}, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class TestJWT(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"access": "granted",
                         'user': str(request.user)})
