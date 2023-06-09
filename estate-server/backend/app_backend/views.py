from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserLoginSerializer, UserAccountSerializer, UserPasswordSerializer, CommercialPropertySerializer, ResidentialPropertySerializer, NewsSerializer, ResidentialAppointmentSerializer, CommercialAppointmentSerializer, AppointmentSerializer
from .models import CustomUser, CommercialProperty, ResidentialProperty, News, ResidentialAppointment, CommercialAppointment


class AccountViews:
    @staticmethod
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def check_authentication(request):
        user = request.user
        if user:
            return Response({"authenticated": True, "user": {"username": user.username, "email": user.email}})
        else:
            return Response({"authenticated": False})

    @staticmethod
    @api_view(['POST'])
    @permission_classes([AllowAny])
    def signup_view(request):
        username = request.data.get('username')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        password = request.data.get('password')
        preference = request.data.get('preference')

        if not (username and first_name and last_name and email and password and preference):
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password, preference=preference)
        user.save()

        # Authenticate and login the user after successful registration
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UserLoginSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    @api_view(['POST'])
    @permission_classes([AllowAny])
    def login_view(request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            serializer = UserLoginSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_400_BAD_REQUEST)
        
    @staticmethod
    @api_view(['GET'])
    def logout_view(request):
        if request.user.is_authenticated:
            logout(request)
            return Response({'success': 'You have been logged out'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not logged in'}, status=status.HTTP_400_BAD_REQUEST)
        
    @staticmethod
    @api_view(['GET', 'PUT'])
    @permission_classes([IsAuthenticated])
    def account_view(request):
        if request.method == 'GET':
            user = request.user
            serializer = UserAccountSerializer(user)
            return Response(serializer.data)

        elif request.method == 'PUT':
            user = request.user
            serializer = UserAccountSerializer(user, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    @staticmethod
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def password_view(request):
        serializer = UserPasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.data.get('old_password')
            new_password = serializer.data.get('new_password')
            user = authenticate(username=request.user.username, password=old_password)

            if user is not None:
                user.set_password(new_password)
                user.save()
                update_session_auth_hash(request, user)
                return Response({"success": "Password updated successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResidentialPropertyViews:
    @staticmethod
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def sale_view(request):
        properties = ResidentialProperty.objects.filter(type='sale')
        serializer = ResidentialPropertySerializer(properties, many=True)
        return Response(serializer.data)

    @staticmethod
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def rent_view(request):
        properties = ResidentialProperty.objects.filter(type='rent')
        serializer = ResidentialPropertySerializer(properties, many=True)
        return Response(serializer.data)
    
    @staticmethod
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def spotlight_view(request):
        properties = ResidentialProperty.objects.filter(type='rent').order_by('-price')[:1]
        serializer = ResidentialPropertySerializer(properties, many=True)
        return Response(serializer.data)
    

class CommercialPropertyViews:
    @staticmethod
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def sale_view(request):
        properties = CommercialProperty.objects.filter(type='sale')
        serializer = CommercialPropertySerializer(properties, many=True)
        return Response(serializer.data)

    @staticmethod
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def rent_view(request):
        properties = CommercialProperty.objects.filter(type='rent')
        serializer = CommercialPropertySerializer(properties, many=True)
        return Response(serializer.data)
    

class AppointmentViews:
    @staticmethod
    def get_queryset(property_id):
        if property_id is not None:
            residential_appointments = ResidentialAppointment.objects.filter(residential_property__id=property_id)
            if residential_appointments.exists():
                return residential_appointments

            commercial_appointments = CommercialAppointment.objects.filter(commercial_property__id=property_id)
            if commercial_appointments.exists():
                return commercial_appointments

        return ResidentialAppointment.objects.none()

    @staticmethod
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def appointment_view(request):
        property_id = request.GET.get('property', None)
        queryset = AppointmentViews.get_queryset(property_id)
        serializer = AppointmentSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @staticmethod
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def new_appointment_view(request):
        property_id = request.data.get('property_id')
        appointment_datetime = request.data.get('appointment_datetime')
        appointment_type = request.data.get('appointment_type')
        print(appointment_datetime)

        if not (property_id and appointment_datetime and appointment_type):
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        if appointment_type == 'residential':
            residential_property = ResidentialProperty.objects.filter(id=property_id).first()
            if residential_property:
                new_appointment = ResidentialAppointment(person=user, residential_property=residential_property, time=appointment_datetime)
                new_appointment.save()
                serializer = ResidentialAppointmentSerializer(new_appointment)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        elif appointment_type == 'commercial':
            commercial_property = CommercialProperty.objects.filter(id=property_id).first()
            if commercial_property:
                new_appointment = CommercialAppointment(person=user, commercial_property=commercial_property, time=appointment_datetime)
                new_appointment.save()
                serializer = CommercialAppointmentSerializer(new_appointment)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid appointment.'}, status=status.HTTP_400_BAD_REQUEST)
    

class NewsViews:
    @staticmethod
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def news_view(request):
        # Retrieve all news articles from the database
        news_articles = News.objects.all().order_by('-created')

        # Use the NewsSerializer to convert the news articles queryset to JSON
        serializer = NewsSerializer(news_articles, many=True)

        # Return the JSON data in a HTTP response
        return Response(serializer.data)

    @staticmethod
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def headlines_view(request):
        # Retrieve all news articles from the database
        news_articles = News.objects.all().order_by('-created')[:5]

        # Use the NewsSerializer to convert the news articles queryset to JSON
        serializer = NewsSerializer(news_articles, many=True)

        # Return the JSON data in a HTTP response
        return Response(serializer.data)