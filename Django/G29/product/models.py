from django.db import models
from category.models import SubCategory, Size


class Product(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product_images/')
    qoh = models.IntegerField()
    price = models.FloatField()
    color = models.CharField(max_length=20)
    fabric = models.CharField(max_length=30)
    description = models.TextField()
    sub_category_id = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    size_id = models.ForeignKey(Size, on_delete=models.CASCADE)
    isCarousel = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Product'  
        verbose_name_plural = 'Products'
    