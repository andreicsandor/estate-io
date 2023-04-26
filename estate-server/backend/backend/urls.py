"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app_backend.views import AccountViews, ResidentialPropertyViews, CommercialPropertyViews, NewsViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/check_authentication/', AccountViews.check_authentication),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/login/', AccountViews.login_view),
    path('api/signup/', AccountViews.signup_view),
    path('api/logout/', AccountViews.logout_view),
    path('api/account/', AccountViews.account_view),
    path('api/account-password/', AccountViews.password_view),
    path('api/news/', NewsViews.news_view),
    path('api/headlines/', NewsViews.headlines_view),
    path('api/residential-properties-sale/', ResidentialPropertyViews.sale_view),
    path('api/residential-properties-rent/', ResidentialPropertyViews.rent_view),
    path('api/residential-spotlight/', ResidentialPropertyViews.spotlight_view),
    path('api/commercial-properties-sale/', CommercialPropertyViews.sale_view),
    path('api/commercial-properties-rent/', CommercialPropertyViews.rent_view),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
