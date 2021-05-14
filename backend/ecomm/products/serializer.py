from rest_framework import serializers
from .models import Products_Model

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products_Model
        fields = ["img_src", "name", "colors", "tags"]