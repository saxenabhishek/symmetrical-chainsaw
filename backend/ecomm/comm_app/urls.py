from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenVerifyView 


urlpatterns = [
    path('register', views.CreateUserView().as_view(), name="register_view"),
    path('login', views.LoginUser().as_view(), name="login_view"),
    path('logged', views.TestJWT().as_view(), name="testing"),
    path('verify/token', TokenVerifyView.as_view(), name="verify_view"),

]