from rest_framework import serializers
from .models import Familia, Bebe

class BebeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bebe
        fields = '__all__'

class FamiliaSerializer(serializers.ModelSerializer):
    bebes = BebeSerializer(many=True, read_only=True)
    class Meta:
        model = Familia
        fields = '__all__'