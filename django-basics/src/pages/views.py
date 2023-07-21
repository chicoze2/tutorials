from django.shortcuts import render
from django.http import HttpResponse

def homepage_view(request, *args, **kwargs):
    ##estrutura de debug
    print("Request: ", request)
    print("Args: ", args)
    print("kwargs: ", kwargs)

    print(request.user)

    # return HttpResponse("<h1>Home page view!</h1>")

    return render(request, 'home.html', {request : request})

def contact_view(request, *args, **kwargs):
    return render(request, 'contact.html', {})

def about_view(request, *args, **kwargs):
    return render(request, 'about.html', {})
