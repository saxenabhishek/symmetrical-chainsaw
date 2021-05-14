from django.urls import path
from .views import Products


urlpatterns = [
    path("products-api", Products.as_view(), name="products_view"),
    
]