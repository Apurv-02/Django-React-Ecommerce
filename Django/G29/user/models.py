from django.db import models
from address.models import Area
from company.models import Company


class Customer(models.Model):
    name = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=50)
    age = models.IntegerField(null=True)
    area_id = models.ForeignKey(Area, on_delete=models.CASCADE, null=True)
    mobile = models.CharField(max_length=15, null=True)

    def __str__(self):
        return self.name if self.name else "Unnamed Customer"

    
    class Meta:
        verbose_name = 'Customer'  
        verbose_name_plural = 'Customers'


class Supplier(models.Model):
    name = models.CharField(max_length=50, null=True)
    mobile = models.CharField(max_length=15, null=True)
    email = models.CharField(max_length=50, null=True)
    area_id = models.ForeignKey(Area, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Supplier'  
        verbose_name_plural = 'Suppliers'

