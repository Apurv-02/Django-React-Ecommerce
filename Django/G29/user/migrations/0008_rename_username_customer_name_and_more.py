# Generated by Django 5.0.3 on 2024-05-15 02:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_customer_company_id_supplier_company_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='username',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='supplier',
            old_name='username',
            new_name='name',
        ),
    ]
