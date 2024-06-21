from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Country'  
        verbose_name_plural = 'Countries'  

class State(models.Model):
    name = models.CharField(max_length=30)
    country_id = models.ForeignKey(Country, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'State'  
        verbose_name_plural = 'States'  

class City(models.Model):
    name = models.CharField(max_length=30)
    state_id = models.ForeignKey(State, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'City'  
        verbose_name_plural = 'Cities'  

class Area(models.Model):
    name = models.CharField(max_length=30)
    zip = models.IntegerField(null=True)
    city_id = models.ForeignKey(City, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Area'  
        verbose_name_plural = 'Areas'  
