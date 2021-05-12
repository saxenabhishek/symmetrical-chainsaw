from django.urls import path
from . import views

urlpatterns = [
    path('register', views.CreateUserView().as_view(), name="register_view"),
    path('login', views.LoginUser().as_view(), name="login_view"),
]