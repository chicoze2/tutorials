"""
URL configuration for trydjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#Default
from django.contrib import admin
from django.urls import path

#Own
from pages.views import homepage_view, contact_view, about_view
from products.views import product_detail_view, product_create_view, dynamic_product_detail_view, product_delete_view, product_list_view

urlpatterns = [
    path('', homepage_view, name='home'),

    path("contact/", contact_view),
    path("about/", about_view),

    #Refator to products app url pattern
    path("product/<int:my_id>/", dynamic_product_detail_view, name='product_detail'),
    path("create/", product_create_view),
    path("product/<int:id>/delete/", product_delete_view),
    path("products/", product_list_view),

    path('admin/', admin.site.urls),
]
