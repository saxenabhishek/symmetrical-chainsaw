# from rest_framework.response import Response
# from rest_framework import status
from django.shortcuts import HttpResponse


def check_perms(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            print(request.user)
        else:
            return HttpResponse("NO AUTH")
        return view_func(request, *args, **kwargs)

    return wrapper
