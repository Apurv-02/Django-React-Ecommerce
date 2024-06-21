from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from product.models import Product
from django.core.serializers import serialize
from django.core.exceptions import ObjectDoesNotExist
import json
from review.models import Review


@csrf_exempt
def get_all_products(request):
    if request.method == 'GET':
        products = Product.objects.all()
        product_dict = []
        for product in products:
            product_data = {
                "id": product.id,
                "name": product.name,
                "image_url": request.build_absolute_uri(product.image.url),  # Construct the full image URL
                "qoh": product.qoh,
                "price": product.price,
                "color": product.color,
                "fabric": product.fabric,
                "description": product.description,
                "sub_category_id": product.sub_category_id.name,  # Assuming sub_category_id is the ID of the subcategory
                "size_id": product.size_id.name,  # Assuming size_id is the ID of the size
                "isCarousel": product.isCarousel,
                "category": product.sub_category_id.category_id.name
            }
            product_dict.append(product_data)
        return JsonResponse({"products": product_dict, 'status': 200})
    else:
        return JsonResponse({"error": "Method not allowed", 'status': 405})


@csrf_exempt
def get_product_by_id(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_id = data.get('id')
        if product_id:
            try:
                product = Product.objects.get(id=product_id)
                reviews = Review.objects.filter(product_id=product)

                product_data = {
                    "id": product.id,
                    "name": product.name,
                    "image_url": request.build_absolute_uri(product.image.url),
                    "qoh": product.qoh,
                    "price": product.price,
                    "color": product.color,
                    "fabric": product.fabric,
                    "description": product.description,
                    "sub_category_id": product.sub_category_id.name,
                    "size_id": product.size_id.name,
                    "isCarousel": product.isCarousel,
                    "category": product.sub_category_id.category_id.name
                }

                reviews_data = []
                for review in reviews:
                    review_data = {
                        "id": review.id,
                        "rating": review.rating,
                        "review": review.review,
                        "customer_id": review.customer_id.id,
                        "customer_name": review.customer_id.name,  # Assuming Customer model has a 'name' field
                    }
                    reviews_data.append(review_data)

                return JsonResponse({"product": product_data, "reviews": reviews_data}, status=200)
            except Product.DoesNotExist:
                return JsonResponse({"error": "Product not found"}, status=404)
        else:
            return JsonResponse({"error": "No product id specified"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

