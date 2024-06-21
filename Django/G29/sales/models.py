from django.db import models
from user.models import Customer
from product.models import Product


class Sales(models.Model):
    date = models.DateField()
    amount = models.FloatField()
    payment_date = models.DateField(null=True)
    payment_mode = models.CharField(max_length=50, null=True)
    payment_amount = models.FloatField(null=True)
    payment_status = models.BooleanField(null=True)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"Sales Order {self.id}"
    
    class Meta:
        verbose_name = 'Sale'  
        verbose_name_plural = 'Sales'


class SalesDetails(models.Model):
    qty = models.IntegerField()
    sale_id = models.ForeignKey(Sales, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Sale Details'  
        verbose_name_plural = 'Sale Details'


class SalesReturn(models.Model):
    date = models.DateField()
    amount = models.FloatField()
    sale_id = models.ForeignKey(Sales, on_delete=models.CASCADE)

    def __str__(self):
        return f"Sales Return {self.id}"
    
    class Meta:
        verbose_name = 'Sale Return'  
        verbose_name_plural = 'Sales Returns'


class SalesReturnDetails(models.Model):
    qty = models.IntegerField()
    sale_return_id = models.ForeignKey(SalesReturn, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Sales Return Detail'  
        verbose_name_plural = 'Sales Return Details'
    
