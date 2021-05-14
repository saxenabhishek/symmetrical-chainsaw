from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Products_Model
from .pagination import CustomPagination
from .serializer import ProductSerializer


class Products(ListAPIView):
    
    queryset = Products_Model.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    pagination_class = CustomPagination
