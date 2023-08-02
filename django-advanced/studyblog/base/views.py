from django.http import HttpResponse
from django.shortcuts import render

from .models import Room

def home(request):
  rooms = Room.objects.all()
  context = {'rooms': rooms}
  return render(request, 'home.html', context)

def room(request, pk):
  room = Room.objects.get(id=pk)

  ctx = {'room': room}

  return render(request, 'room.html', ctx) 

def create_room(request):

  context = {}
  return render(request, 'base/room_form.html', context=context)