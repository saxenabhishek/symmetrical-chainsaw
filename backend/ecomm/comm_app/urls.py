from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

from . import views

urlpatterns = [
    path('register', views.CreateUserView().as_view(), name="register_view"),
    path('login', views.LoginUser().as_view(), name="login_view"),
    path('logged', views.Products().as_view(), name="testing"),
    path('verify/token', TokenVerifyView.as_view(), name="verify_view"),
    path('flush', views.RemoveUser.as_view(), name="flush_db"),
    path('products', views.Products.as_view(), name="products_view")

]
