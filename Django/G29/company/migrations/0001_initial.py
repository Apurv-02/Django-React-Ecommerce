# Generated by Django 5.0.3 on 2024-03-30 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('address', models.TextField()),
                ('email', models.CharField(max_length=30)),
                ('mobile', models.CharField(max_length=15)),
            ],
        ),
    ]