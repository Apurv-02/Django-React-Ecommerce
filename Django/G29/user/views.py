from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import jwt
from .models import Customer
from address.models import Area, City
from django.conf import settings
import json

@csrf_exempt
def get_customer_details(request):
    auth_header = request.headers.get('Authorization', '') 
    if not auth_header.startswith('jwt '):
        return JsonResponse({"error": "Invalid token prefix"}, status=401)
    
    token = auth_header.split(' ')[1]
    
    if not token:
        return JsonResponse({"error": "Authorization token required"}, status=401)

    try:
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded.get('user_id')
        if not user_id:
            return JsonResponse({"error": "Invalid token"}, status=401)

        customer = Customer.objects.get(id=user_id)
        print(customer.area_id, "customer\n\n\n")
        customer_details = {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "age": customer.age,
            "mobile": customer.mobile,
            "area": customer.area_id.name if customer.area_id else None,
            "city": customer.area_id.city_id.name if customer.area_id and customer.area_id.city_id else None,
            "zip": customer.area_id.zip if customer.area_id else None, 
        }

        print("Fetching cities\n\n\n")
        cities = City.objects.all().values_list('id', 'name')
        customer_details['cities'] = list(cities)
        print(customer_details, "details\n\n\n")

        return JsonResponse(customer_details, status=200)

    except jwt.ExpiredSignatureError:
        return JsonResponse({"error": "Token has expired"}, status=401)
    except jwt.InvalidTokenError:
        return JsonResponse({"error": "Invalid token"}, status=401)
    except Customer.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    

@csrf_exempt
def update_customer_details(request):
    if request.method != 'PUT':
        return JsonResponse({"error": "Method not allowed"}, status=405)

    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('jwt '):
        return JsonResponse({"error": "Invalid token prefix"}, status=401)
    
    token = auth_header.split(' ')[1]
    
    if not token:
        return JsonResponse({"error": "Authorization token required"}, status=401)

    try:
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded.get('user_id')
        if not user_id:
            return JsonResponse({"error": "Invalid token"}, status=401)

        customer = Customer.objects.get(id=user_id)

        # Parse request body and update customer details
        try:
            data = json.loads(request.body.decode('utf-8'))
            print(data, "data")
            if 'name' in data:
                customer.name = data['name']
            if 'email' in data:
                customer.email = data['email']
            if 'age' in data:
                customer.age = data['age']
            if 'mobile' in data:
                customer.mobile = data['mobile']
            if 'area' in data:
                area_id = data['area']
                if area_id:
                    try:
                        area = Area.objects.get(id=area_id)
                    except:
                        area = None
                    
                    if not area:
                        print("Fetching city")
                        city_id = data.get('city')  
                        
                        if city_id:
                            zip = data.get('zip') if 'zip' in data else None
                            city = City.objects.get(id=city_id)
                            print(city, "city fetched\n")
                            area = Area.objects.create(name=data['area'], city_id=city, zip=zip)
                        else:
                            return JsonResponse({"error": "City ID is required to create a new area"}, status=400)
                    
                    # Update customer's area_id
                    customer.area_id = area
            
            # Save updated customer object
            customer.save()

            # Prepare response data
            customer_details = {
                "id": customer.id,
                "name": customer.name,
                "email": customer.email,
                "age": customer.age,
                "mobile": customer.mobile,
                "area": customer.area_id.name if customer.area_id else None,
                "city": customer.area_id.city_id.name if customer.area_id and customer.area_id.city_id else None,
                "state": customer.area_id.city_id.state_id.name if customer.area_id and customer.area_id.city_id and customer.area_id.city_id.state_id else None,
                "zip": customer.area_id.zip if customer.area_id and customer.area_id.zip else None
            }
            return JsonResponse(customer_details, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data in request body"}, status=400)

    except jwt.ExpiredSignatureError:
        return JsonResponse({"error": "Token has expired"}, status=401)
    except jwt.InvalidTokenError:
        return JsonResponse({"error": "Invalid token"}, status=401)
    except Customer.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)}, status=500)