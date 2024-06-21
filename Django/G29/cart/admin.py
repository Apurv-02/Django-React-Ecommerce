from django.contrib import admin
from .models import Cart


class CartAdmin(admin.ModelAdmin):
    list_display = ['qty', 'product_id', 'customer_id']

admin.site.register(Cart, CartAdmin)
