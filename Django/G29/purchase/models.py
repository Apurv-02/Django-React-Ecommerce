from django.db import models
from product.models import Product
from user.models import Supplier

class Purchase(models.Model):
    date = models.DateField()
    amount = models.FloatField()
    payment_date = models.DateField(null=True)
    payment_amount = models.FloatField(null=True)
    payment_status = models.BooleanField(null=True)
    supplier_id = models.ForeignKey(Supplier, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Purchase'  
        verbose_name_plural = 'Purchases'


class PurchaseDetails(models.Model):
    qty = models.IntegerField()
    purchase_id = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Purchase Detail'  
        verbose_name_plural = 'Purchase Details'


class PurchaseReturn(models.Model):
    purchase_id = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    date = models.DateField()
    amount = models.FloatField()

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Purchase Return'  
        verbose_name_plural = 'Purchase Returns'


class PurchaseReturnDetails(models.Model):
    qty = models.IntegerField()
    purchase_return_id = models.ForeignKey(PurchaseReturn, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Purchase Return Detail'  
        verbose_name_plural = 'Purchase Return Details'

