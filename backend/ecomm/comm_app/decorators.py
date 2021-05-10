from django.shortcuts import redirect, resolve_url


def auth_redirect(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            redirect(resolve_url('products'))
        return view_func(request, *args, **kwargs)

    return wrapper


def check_perms(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            pass
        else:
            return redirect(resolve_url('login'))
        return view_func(request, *args, **kwargs)

    return wrapper
