from django.contrib import admin
from .models import Purchase, PurchaseReturn, PurchaseDetails, PurchaseReturnDetails

class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('date', 'amount', 'payment_date', 'payment_amount', 'payment_status', 'supplier_id')


class PurchaseDetailAdmin(admin.ModelAdmin):
    list_display = ['qty', 'purchase_id', 'product_id']


class PurchaseReturnAdmin(admin.ModelAdmin):
    list_display = ('purchase_id', 'date', 'amount')


class PurchaseReturnDetailAdmin(admin.ModelAdmin):
    list_display = ['qty', 'purchase_return_id', 'product_id']

admin.site.register(Purchase, PurchaseAdmin)
admin.site.register(PurchaseReturn, PurchaseReturnAdmin)
admin.site.register(PurchaseDetails, PurchaseDetailAdmin)
admin.site.register(PurchaseReturnDetails, PurchaseReturnDetailAdmin)

