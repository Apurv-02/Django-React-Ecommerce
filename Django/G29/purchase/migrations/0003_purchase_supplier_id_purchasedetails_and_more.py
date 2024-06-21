# Generated by Django 5.0.3 on 2024-03-30 06:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_size_id_product_sub_category_id'),
        ('purchase', '0002_alter_purchase_payment_amount_and_more'),
        ('user', '0007_customer_company_id_supplier_company_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='supplier_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='user.supplier'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='PurchaseDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField()),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('purchase_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purchase.purchase')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseReturnDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField()),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('purchase_return_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purchase.purchasereturn')),
            ],
        ),
    ]
