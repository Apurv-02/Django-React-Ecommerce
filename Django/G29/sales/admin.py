from django.contrib import admin
from .models import Sales, SalesDetails, SalesReturn, SalesReturnDetails

class SaleAdmin(admin.ModelAdmin):
    list_display = ['date', 'amount','payment_mode', 'payment_date', 'payment_amount', 'payment_status', 'customer_id']


class SaleDetailAdmin(admin.ModelAdmin):
    list_display = ['qty', 'sale_id', 'product_id']


class SaleReturnAdmin(admin.ModelAdmin):
    list_display = ['date', 'amount', 'sale_id']


class SaleReturnDetailAdmin(admin.ModelAdmin):
    list_display = ['qty', 'sale_return_id', 'product_id']


admin.site.register(Sales, SaleAdmin)
admin.site.register(SalesDetails, SaleDetailAdmin)
admin.site.register(SalesReturn, SaleReturnAdmin)
admin.site.register(SalesReturnDetails, SaleReturnDetailAdmin)