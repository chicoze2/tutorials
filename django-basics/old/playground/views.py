from django.shortcuts import render
from django.http import HttpResponse

# Create your views here. request handler

def hello_word(request):
    return render(request, 'hello.html', {'title': 'Hello World!', 'name':'Francisco' })
    
