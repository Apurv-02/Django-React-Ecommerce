# Generated by Django 5.0.3 on 2024-03-30 06:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0001_initial'),
        ('user', '0006_alter_supplier_area_id_alter_supplier_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='company_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='company.company'),
        ),
        migrations.AddField(
            model_name='supplier',
            name='company_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='company.company'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='username',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='username',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
