"""
URL configuration for G29 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
from product.views import get_all_products, get_product_by_id
from user.views import get_customer_details, update_customer_details
from sales.views import create_sales_order, get_sales_order

urlpatterns = [
    path('admin/', admin.site.urls),  
    path('register', views.register),
    path('login', views.login),
    path('send_otp', views.send_otp),
    path('home-products', get_all_products),  
    path('product-description', get_product_by_id),  
    path('send-email', views.send_contact_mail),
    path('get-customer-details', get_customer_details),
    path('update-customer-details', update_customer_details),
    path('create-sales-order', create_sales_order),
    path('get-sales-order', get_sales_order),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

