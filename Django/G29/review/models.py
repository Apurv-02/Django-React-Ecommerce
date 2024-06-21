from django.db import models
from product.models import Product
from user.models import Customer


class Review(models.Model):
    rating = models.IntegerField()
    review =  models.TextField(null=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Review'  
        verbose_name_plural = 'Reviews'