from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Category'  
        verbose_name_plural = 'Categories'  


class SubCategory(models.Model):
    name = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Subcategory'  
        verbose_name_plural = 'Subcategories'  


class Size(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Size'  
        verbose_name_plural = 'Sizes'  


