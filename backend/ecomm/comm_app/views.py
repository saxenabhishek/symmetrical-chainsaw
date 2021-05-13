from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from .serialize import CreateUser, AuthUser
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return None

        
    
class CreateUserView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = CreateUser

    def post(self, request):
        if not request.session.exists(request.session.session_key):
            request.session.create()
        
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            User.objects.create_user(username=email, first_name=username,
                                     password=password)

            params = {
                "user": "created"
            }
            return Response(params, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response(data='Username', status=status.HTTP_400_BAD_REQUEST)

    def get(self):
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def FlushDB(request, *args, **kwargs):
    if user := User.objects.filter(username=request.data.get('email'))[0]:
        if authenticate(username=user, password=request.data.get('password')):
            user.delete()
            params = {
                "deleted" : str(request.user)
            }
            return Response(params, status=status.HTTP_200_OK)

        params = {
            "Auth status": "Failed"
        }
        return Response(params, status=status.HTTP_400_BAD_REQUEST)

    params = {
        "User Not Found" : "None"
    }

    return Response(params, status=status.HTTP_400_BAD_REQUEST)

    

class LoginUser(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = AuthUser

    def get(self, request):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if not request.session.exists(request.session.session_key):
            request.session.create()

        if verify :=  authenticate(username=request.data.get('email'),
                              password=request.data.get('password')):

            token = RefreshToken.for_user(verify)

            return Response({'user_id': verify.id,
                             'email': verify.username,
                             'access_token': str(token.access_token)}, status=status.HTTP_200_OK)

        params = { 
            "Invalid Credentials" : None
        }

        return Response(params, status=status.HTTP_400_BAD_REQUEST)


class TestJWT(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"access": "granted",
                         'user': str(request.user)})
    
    def get(self, request):
        pass