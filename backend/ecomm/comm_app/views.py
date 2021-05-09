from django.shortcuts import redirect
from django.shortcuts import HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User


def home(request):
    return HttpResponse('Home')


def products(request):
    return HttpResponse('Products')


def register(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        # checks
        user = User.objects.create_user(username, email, password1, password2)
        user.save()
        return redirect('login/')
    return HttpResponse('404 - Not Found')


def loginuser(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('products/')

        return HttpResponse('Invalid credentials')

    return HttpResponse('404-Page Not Found')


def logoutuser(request):
    logout(request)
    return redirect('signup')
