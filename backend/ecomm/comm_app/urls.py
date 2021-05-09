from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='comm_login'),
    path('products/', views.products, name="comm_products"),
]