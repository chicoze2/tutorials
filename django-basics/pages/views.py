from django.shortcuts import render
from django.http import HttpResponse

def homepage(*args):
    return HttpResponse("<h1>malu!</h1>")