from rest_framework import serializers
from .models import Familia, Bebe, Contrato
from django.utils import timezone

class BebeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bebe
        fields = '__all__'

    def validate_fecha_nacimiento(self, value):
        if value and value > timezone.now().date():
            raise serializers.ValidationError("La fecha de nacimiento no puede ser futura.")
        return value

class FamiliaSerializer(serializers.ModelSerializer):
    bebes = BebeSerializer(many=True, read_only=True)
    class Meta:
        model = Familia
        fields = '__all__'

class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = '__all__'