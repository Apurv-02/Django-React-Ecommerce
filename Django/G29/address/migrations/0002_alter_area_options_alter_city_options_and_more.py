# Generated by Django 5.0.3 on 2024-03-23 08:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='area',
            options={'verbose_name': 'Area', 'verbose_name_plural': 'Areas'},
        ),
        migrations.AlterModelOptions(
            name='city',
            options={'verbose_name': 'City', 'verbose_name_plural': 'Cities'},
        ),
        migrations.AlterModelOptions(
            name='country',
            options={'verbose_name': 'Country', 'verbose_name_plural': 'Countries'},
        ),
        migrations.AlterModelOptions(
            name='state',
            options={'verbose_name': 'State', 'verbose_name_plural': 'States'},
        ),
    ]