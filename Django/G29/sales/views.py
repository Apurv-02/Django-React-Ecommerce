from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Sales, SalesDetails, Product
from user.models import Customer
import json
from datetime import date

@csrf_exempt
def create_sales_order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            customer_data = data.get('customer')
            cart_items = data.get('cart')
            payment_mode = data.get('payment_mode')
            razorpay_payment_id = data.get('razorpay_payment_id')
            total_amount = float(data.get('amount'))
            # Get the customer object
            customer = Customer.objects.get(id=customer_data.get("customerId"))
            print(customer_data, cart_items, payment_mode, total_amount, customer)

            # Create Sales instance
            sales_order = Sales()
            sales_order.date = date.today()
            sales_order.amount = total_amount
            if payment_mode == 'razorpay':
                sales_order.payment_date = date.today()
                sales_order.payment_amount = total_amount
                sales_order.payment_status = True
            else:
                sales_order.payment_amount = 0
                sales_order.payment_status = False
            sales_order.payment_mode = payment_mode
            sales_order.customer_id = customer
            sales_order.save()
            # sales_order = Sales.create(
            #     date=date.today(),
            #     payment_date=date.today(),
            #     amount=total_amount,
            #     payment_amount=total_amount,
            #     payment_status=True,
            #     payment_mode=payment_mode,
            #     customer=customer_data.get("customerId")
            # )
            print(sales_order, "sales order\n\n\n")
            # Create SalesDetails instances for each cart item
            for item in cart_items:
                product = get_object_or_404(Product, id=item.get('product_id'))
                SalesDetails.objects.create(
                    qty=item.get('quantity'),
                    sale_id=sales_order,
                    product_id=product
                )

            return JsonResponse({'message': 'Sales order created successfully'}, status=201)
        except Customer.DoesNotExist:
            return JsonResponse({'error': 'Customer does not exist'}, status=400)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'One or more products do not exist'}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST method allowed'}),



@csrf_exempt
def get_sales_order(request):
    user = request.GET.get('user')
    if not user:
        return JsonResponse({'error': 'User parameter missing'}, status=400)
    
    orders = Sales.objects.filter(customer_id=user)
    orders_list = []
    for order in orders:
        orders_list.append({
            'id': order.id,
            'order_number': order.__str__(),
            'total_amount': order.amount,
            'order_date': order.date,
            'payment_mode': order.payment_mode,
            'payment_status': order.payment_status,
        })
    
    return JsonResponse(orders_list, safe=False)