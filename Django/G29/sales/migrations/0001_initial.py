# Generated by Django 5.0.3 on 2024-03-23 08:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('amount', models.FloatField()),
                ('payment_date', models.DateField()),
                ('payment_amount', models.FloatField()),
                ('payment_status', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='SalesReturn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('amount', models.FloatField()),
                ('sale_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sales.sales')),
            ],
        ),
    ]
