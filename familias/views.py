from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Familia, Bebe, Contrato
from .serializers import FamiliaSerializer, BebeSerializer, ContratoSerializer

class FamiliaViewSet(viewsets.ModelViewSet):
    queryset = Familia.objects.all()
    serializer_class = FamiliaSerializer
    permission_classes = [IsAuthenticated]

class BebeViewSet(viewsets.ModelViewSet):
    queryset = Bebe.objects.all()
    serializer_class = BebeSerializer
    permission_classes = [IsAuthenticated]

class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer
    permission_classes = [IsAuthenticated]