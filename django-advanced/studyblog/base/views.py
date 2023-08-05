from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.db.models import Q
# from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
# from django.contrib.auth.forms import UserCreationForm

from .models import Room, Topic, Message, User
from .forms import RoomForm, UserForm, CustomUserCreationForm

def user_profile(request, pk):
  user = User.objects.get(id=pk)
  rooms = user.room_set.all()
  room_messages = user.message_set.all()
  topics = Topic.objects.all()

  context = {'user': user, 'rooms': rooms, 'room_messages': room_messages, 'topics': topics}
  return render(request, 'user_profile.html', context)

def login_page(request):
  
  page = 'login'

  if request.user.is_authenticated:
    return redirect('home')

  if request.method == 'POST':
    username = request.POST.get('username').lower()
    password = request.POST.get('password')

    try:
      user = User.objects.get(username=username)
    except:
      messages.error(request, "User does not exist")

    user = authenticate(request, username=username, password=password) 

    if user is not None:
      login(request, user)
      return redirect('home')
    else:
      messages.error(request, "Username or password is incorrect")

  context = {'page': page}
  return render(request, 'login_register.html', context)


@login_required(login_url='login')
def update_user(request):

  user = request.user
  form = UserForm(instance=user) 

  if request.method == 'POST':
    form = UserForm(request.POST, request.FILES, instance=user)

    if form.is_valid():
      form.save()
      print('>>>>>>>> form saved successfully')
      return redirect('user_profile', user.id)

  return render(request, 'update-user.html', {"form": form})


def register_user(request):
  page = 'register'
  form = CustomUserCreationForm()

  if request.method == 'POST':
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
      user = form.save(commit=False)

      user.username = user.username.lower() 
      user.save()
      login(request, user)
      return redirect('home')
    else:
      messages.error(request,'Something went wrong. Please try again')

  context = {'page': page, 'form': form}
  return render(request, 'login_register.html', context)

def logout_user(request):
  logout(request)
  return redirect('home')

def home(request):
  q = request.GET.get('q') #receive a query from the URL

  if q:
    rooms = Room.objects.filter(
      Q(topic__name__icontains=q) |
      Q(name__icontains=q) |
      Q(description__icontains=q))
    room_messages = Message.objects.filter(Q(room__name__icontains=q))
  else:
    rooms = Room.objects.filter()[0:5]
    room_messages = Message.objects.filter()[0:10]
     
  topic = Topic.objects.filter()[0:5]
  room_count = rooms.count()

  if not rooms:
    rooms = {}

  context = {'rooms': rooms, 'topics': topic, 'room_count': room_count, 'room_messages': room_messages}
  return render(request, 'home.html', context)

def room(request, pk):
  room = Room.objects.get(id=pk)
  participants = room.participants.all()
  room_messages = room.message_set.all().order_by('-created_at')

  if request.method == 'POST': #when somebpdy writes a new message
    user = request.user
    message = Message.objects.create(
      user = request.user,
      room = room,
      body = request.POST.get('body')
    )

    room.participants.add(request.user)

    return redirect('room', room.id) #to reload the page on a GET request

  ctx = {'room': room, 'room_messages': room_messages,  'participants': participants}

  return render(request, 'room.html', ctx) 

@login_required(login_url='/login')
def create_room(request):
  form = RoomForm()

  if request.method == 'POST':
    ## if receving the filled form from the user
    # print(request.POST)
    form = RoomForm(request.POST)
    if form.is_valid():
      room = form.save(commit=False)
      room.host = request.user
      room.save()
      return redirect('home')

  context = {'form': form}
  return render(request, 'base/room_form.html', context=context)

@login_required(login_url='/login')
def update_room(request, pk):
  room = Room.objects.get(id=pk)
  form = RoomForm(instance=room)

  if request.user != room.host:
    return HttpResponse('You are not allowed to update this room')

  if request.method == 'POST':
    form = RoomForm(request.POST, instance=room)
    if form.is_valid():
      form.save()
      return redirect('home')

  context = {'form': form}
  return render(request, 'base/room_form.html',context)

def delete_room(request, pk):

  room = Room.objects.get(id=pk)

  if request.method == 'POST':
    room.delete()
    return redirect('home')

  return render(request, 'base/delete.html', {'obj': room})


# @login_required(login_url='/login')
# def update_message(request):

def delete_message(request,  pk):

  message = Message.objects.get(id=pk)

  if request.user != message.user:
    return HttpResponse('You are not allowed to delete this message')


  if request.method == 'POST':
    room_id = message.room.id
    message.delete()
    return redirect('room', room_id)
  
  return render(request, 'base/delete.html', {'obj': message})

def topics_page(request):

  topics = Topic.objects.all()

  return render(request, 'base/topics.html', {'topics': topics})

def activity_page(request):

  activity = Message.objects.all()

  return render(request, 'activity.html', {'activities': activity})