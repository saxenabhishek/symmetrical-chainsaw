from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.products, name="products"),
    path('signup/', views.signup, name='signup'),
    path('login/', views.loginuser, name="login"),
    path('logout/', views.logoutuser, name="logout"),
]