from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=30)
    address = models.TextField()
    email = models.CharField(max_length=30)
    mobile =  models.CharField(max_length=15)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Company'  
        verbose_name_plural = 'Companies'
