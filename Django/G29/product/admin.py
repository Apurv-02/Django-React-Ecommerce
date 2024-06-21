from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','image', 'price', 'qoh', 'fabric', 'color', 'description', 'sub_category_id', 'size_id', 'isCarousel')


admin.site.register(Product, ProductAdmin)