from django.contrib import admin
from .models import Area, City, State, Country

class AreaAdmin(admin.ModelAdmin):
    list_display = ('name', 'city_id')

class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'state_id')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'country_id')

class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(Area, AreaAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Country, CountryAdmin)

