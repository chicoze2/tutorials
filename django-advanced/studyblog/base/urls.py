from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name='home'),

  path('room/<int:pk>/', views.room, name='room'),
  path('create-room/', views.create_room, name='create-room'),
  path('update-room/<str:pk>/', views.update_room, name='update-room'),
  path('delete-room/<str:pk>/', views.delete_room, name='delete-room'),

  path('login/', views.login_page, name='login'),
  path('register/', views.register_user, name='register'),
  path('logout/', views.logout_user, name='logout'),

  # path('update-message', views.update_message, name='update-message'),
  path('delete-message/<str:pk>/', views.delete_message, name='delete-message'),

  path('profile/<int:pk>/', views.user_profile, name='user_profile'),
  path('profile-update/', views.update_user, name='update_user'),

  path('topics/', views.topics_page, name='topics_page'),
  path('activity/', views.activity_page, name='activity_page'),


]
