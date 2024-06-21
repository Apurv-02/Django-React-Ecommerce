# Generated by Django 5.0.3 on 2024-03-23 08:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0002_alter_area_options_alter_city_options_and_more'),
        ('user', '0003_alter_customer_address_alter_customer_age_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('mobile', models.CharField(max_length=15)),
                ('email', models.CharField(max_length=50)),
                ('area_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='address.area')),
            ],
        ),
    ]