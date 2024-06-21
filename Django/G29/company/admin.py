from django.contrib import admin
from .models import Company

class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'email', 'mobile']


admin.site.register(Company, CompanyAdmin)
