from django.contrib import admin
from .models import Category, SubCategory, Size


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']


class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'category_id']


class SizeAdmin(admin.ModelAdmin):
    list_display = ['name']


admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(Size, SizeAdmin)