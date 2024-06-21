from django.contrib import admin
from .models import Review

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['rating', 'review', 'product_id', 'customer_id']


admin.site.register(Review, ReviewAdmin)
