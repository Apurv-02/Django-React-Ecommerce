from user.models import Customer
from django.http import JsonResponse
from .serializers import UserSerializer
import json
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random
import jwt
from django.conf import settings
from datetime import datetime, timedelta


@csrf_exempt
def send_contact_mail(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        sender_email = "your_email_address"
        password = "your_app_password"
        subject = "Customer Request"
        body = f"Name : {data.get('fullname')},\nEmail : {data.get('email')}\nPhone : {data.get('phone')}\nMessage : {data.get('message')}"

        # Create message container - the correct MIME type is multipart/alternative
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = 'company_email_address'
        msg['Subject'] = subject

        # Attach body to the email
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)  # Change to your SMTP server and port
        # server.starttls()  # Secure the connection
        server.login(sender_email, password)
        server.set_debuglevel(1)

        # Send email
        text = msg.as_string()
        server.sendmail(sender_email, 'company_email_address', text)
        print("mail sent successfully!!\n\n\n")

        # Close the connection
        server.quit()
        return JsonResponse({"Response": "Form submitted successfully", "status":200 })
    else:
        return JsonResponse({"error": "Invalid API request method", 'status':400})
    
@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get('email')
            user = Customer.objects.get(email=email)
            print(user)
            if user:
                jwt_token = generate_jwt_token(user)
                print(settings.SECRET_KEY, "secret\n\n\n")
                print(jwt_token, "token\n\n\n")
                return JsonResponse({'token': jwt_token, 'status':200})
            else:
                return JsonResponse({'error': "User does not exist please sign up instead", 'status':400})
        except IntegrityError as e:
            # Handle IntegrityError (e.g., duplicate username or emal)
            return JsonResponse({"error": str(e), 'status': 400})
        except Exception as e:
            # Handle other exceptions
            return JsonResponse({"error": str(e), 'status':500})
    else:
        return JsonResponse({"error": "Invalid API request method", 'status':400})
        

@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get('email')
            otp = data.get('otp')
            print(otp, "otp\n\n\n\n\n")
            
            # Check if the email already exists
            # if User.objects.filter(email=email).exists():
            #     return JsonResponse({"error": "Email already exists"}, status=400)
            if check_user_exists(email):
                return JsonResponse({"error": "Email already exists", "status":400})
            username = email.split('@')
            # Create the user
            user = Customer()
            user.email = email
            user.name = username[0]
            user.save()
            return JsonResponse({"response": "User created successfully", "status":200})
        except IntegrityError as e:
            # Handle IntegrityError (e.g., duplicate username or emal)
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            # Handle other exceptions
            return JsonResponse({"error": str(e)}, status=500)
    else:
        # If the request method is not POST, return an appropriate error response
        return JsonResponse({"error": "Only POST requests are supported for this endpoint"}, status=405)

@csrf_exempt
def send_otp(request):
    print(request, "request")
    data = json.loads(request.body)
    receiver_email = data.get('email')
    print(check_user_exists(receiver_email), "exists\n\n")
    if data.get('type') == 'signup' and check_user_exists(receiver_email):
        return JsonResponse({"error": "Email already exists"}, status=400)
    elif data.get('type') == 'login' and not check_user_exists(receiver_email):
        return JsonResponse({"error": "Email does not exist"}, status=400)

    print("called\n\n\n")
    # Email details
    print(json.loads(request.body))
    otp = random.randint(1000,9999)
    print(data, "dataa\n\n\n")

    sender_email = "your_email_address"
    password = "your_app_password"
    subject = "Your OTP for G29 MEN AND WOMEN WEAR"
    body = f"Dear user,\nHere is your One Time Password for Authentication\nYour OTP: {otp}\nThank You!!\n[G29 MEN AND WOMEN WEAR]"

    # Create message container - the correct MIME type is multipart/alternative
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    # Attach body to the email
    msg.attach(MIMEText(body, 'plain'))

    # Connect to SMTP server
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)  # Change to your SMTP server and port
    # server.starttls()  # Secure the connection
    server.login(sender_email, password)
    server.set_debuglevel(1)

    # Send email
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)
    print("mail sent successfully!!\n\n\n")

    # Close the connection
    server.quit()
    return JsonResponse({"otp": otp, "status":200, })

def check_user_exists(email):
    if Customer.objects.filter(email=email).exists():
        return True
    else:
        return False
        
def generate_jwt_token(user_id):
    payload = {
        'user_id': user_id.id,
        'username': user_id.name,
        'exp': datetime.utcnow() + timedelta(days=1),  # Token expiry time
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')