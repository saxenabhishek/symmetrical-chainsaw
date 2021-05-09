from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='comm_login'),
    path('products/', views.products, name="products"),
    path('signup/', views.register, name='signup'),
    path('login/', views.loginuser, name="login"),
    path('logout/', views.logoutuser, name="logout"),
]