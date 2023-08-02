from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls')) #all urls ("") will be routed through this route that includes a list of urls from base app, urls file
]