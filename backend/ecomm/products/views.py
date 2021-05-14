from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class Products(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"access": "granted",
                         'user': str(request.user)})

    def get(self, request):
        pass

