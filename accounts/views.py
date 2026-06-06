from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from familias.models import Familia


class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['rol'] = user.rol
        token['email'] = user.email
        return token


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    return Response({
        'familias_activas': Familia.objects.filter(activa=True).count(),
        'cobros_pendientes': 0,
        'pagos_pendientes': 0,
    })