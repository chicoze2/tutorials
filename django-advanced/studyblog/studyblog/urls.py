from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls')), #all urls ("") will be routed through this route that includes a list of urls from base app, urls file
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)