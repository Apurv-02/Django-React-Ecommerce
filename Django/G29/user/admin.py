from django.contrib import admin
from .models import Customer, Supplier

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'age', 'area_id')
    
    def formfield_for_dbfield(self, db_field, request, **kwargs):
        field = super().formfield_for_dbfield(db_field, request, **kwargs)
        if db_field.name in ['age', 'area_id', 'mobile']:  # Adjust with your fields
            field.required = False  
        return field

class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile', 'area_id')

admin.site.register(Customer, CustomerAdmin)
admin.site.register(Supplier, SupplierAdmin)

