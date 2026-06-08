from django.http import FileResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from familias.models import Contrato
from .utils import generar_pdf_contrato

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pdf_contrato(request, contrato_id):
    try:
        contrato = Contrato.objects.get(id=contrato_id)
    except Contrato.DoesNotExist:
        from rest_framework.response import Response
        return Response({'error': 'Contrato no encontrado'}, status=404)

    buffer = generar_pdf_contrato(contrato)
    return FileResponse(buffer, as_attachment=True, filename=f'contrato_{contrato_id}.pdf')