from django.db import models
from product.models import Product
from user.models import Customer


class Cart(models.Model):
    qty = models.IntegerField()
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Cart'  
        verbose_name_plural = 'Cart'  

