# Generated by Django 5.0.2 on 2024-06-18 06:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_rename_username_customer_name_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customer',
            options={'verbose_name': 'Customer', 'verbose_name_plural': 'Customers'},
        ),
        migrations.AlterModelOptions(
            name='supplier',
            options={'verbose_name': 'Supplier', 'verbose_name_plural': 'Suppliers'},
        ),
    ]