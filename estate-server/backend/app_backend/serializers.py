from rest_framework import serializers
from .models import CustomUser, CommercialProperty, ResidentialProperty, News, ResidentialAppointment, CommercialAppointment


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'preference', 'is_staff', 'is_active', 'is_superuser')
        read_only_fields = ('id', 'is_staff', 'is_active', 'is_superuser')


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'preference')
        read_only_fields = ('username',)
    
    def validate_first_name(self, value):
        if self.initial_data.get('first_name') is not None and value.strip() == "":
            raise serializers.ValidationError("First name cannot be blank.")
        return value

    def validate_last_name(self, value):
        if self.initial_data.get('last_name') is not None and value.strip() == "":
            raise serializers.ValidationError("Last name cannot be blank.")
        return value

    def validate_email(self, value):
        user = self.instance
        if self.initial_data.get('email') is not None:
            if value.strip() == "":
                raise serializers.ValidationError("Email cannot be blank.")
            if CustomUser.objects.exclude(pk=user.pk).filter(email=value).exists():
                raise serializers.ValidationError("Email already in use.")
        return value

    def validate_preference(self, value):
        if self.initial_data.get('preference') is not None and value.strip() == "":
            raise serializers.ValidationError("Preference cannot be blank.")
        return value


class UserPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, allow_null=False)
    new_password = serializers.CharField(required=True, allow_null=False)


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'password')


class CommercialPropertySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CommercialProperty
        fields = '__all__'

    def get_image(self, obj):
        return obj.image.url


class ResidentialPropertySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ResidentialProperty
        fields = '__all__'

    def get_image(self, obj):
        return obj.image.url


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('id', 'title', 'body', 'created')


class ResidentialAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResidentialAppointment
        fields = ('id', 'residential_property', 'time')


class CommercialAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialAppointment
        fields = ('id', 'commercial_property', 'time')


class AppointmentSerializer(serializers.Serializer):
    def to_representation(self, instance):
        if isinstance(instance, ResidentialAppointment):
            return ResidentialAppointmentSerializer(instance).data
        elif isinstance(instance, CommercialAppointment):
            return CommercialAppointmentSerializer(instance).data
