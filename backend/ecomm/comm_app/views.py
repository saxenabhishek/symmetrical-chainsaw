from django.shortcuts import render
from django.shortcuts import HttpResponse


def login(request):
    return HttpResponse('Home')


def products(request):
    return HttpResponse('Products')