from django.shortcuts import redirect, resolve_url
from django.shortcuts import HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from .decorators import auth_redirect, check_perms


@check_perms
def products(request):
    return HttpResponse('Products')


@auth_redirect
def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        if password1 == password2:
            User.objects.create_user(username=username, password=password1, email=email)
        return redirect(resolve_url('login'))
    return HttpResponse('404 - Not Found')


@auth_redirect
def loginuser(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect(resolve_url('products'))

        return HttpResponse('Invalid credentials')

    return HttpResponse('404-Page Not Found')


@check_perms
def logoutuser(request):
    logout(request)
    return redirect('login/')
