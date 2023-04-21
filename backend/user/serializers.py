from rest_framework import serializers
from user.models import User
from user.models import LastUpdated

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'teams', 'id')

class LastUpdatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = LastUpdated
        fields = '__all__'