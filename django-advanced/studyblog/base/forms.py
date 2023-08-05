from django.forms  import *
from .models import Room, User
from django.contrib.auth.forms import UserCreationForm

# from django.contrib.auth.models import User


class RoomForm(ModelForm):
  class Meta:
    model = Room
    fields = '__all__'
    exclude = ['host', 'participants']

class UserForm(ModelForm):
  class Meta:
    model = User
    fields= ['username', 'name', 'email', 'bio', 'avatar']    

class CustomUserCreationForm(UserCreationForm):
  class Meta(UserCreationForm.Meta):
      model = User
      fields = UserCreationForm.Meta.fields + ('name', 'email')