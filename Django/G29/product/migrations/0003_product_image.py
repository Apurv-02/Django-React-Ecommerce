# Generated by Django 5.0.3 on 2024-03-30 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_size_id_product_sub_category_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(default=None, upload_to='product_images/'),
            preserve_default=False,
        ),
    ]
