from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO

def generar_pdf_contrato(contrato):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)

    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, 800, "Contrato de Servicio - byfamco")

    p.setFont("Helvetica", 12)
    p.drawString(100, 760, f"Familia: {contrato.familia.nombre_contacto}")
    p.drawString(100, 740, f"Fecha de inicio: {contrato.fecha_inicio}")
    p.drawString(100, 720, f"Horas por semana: {contrato.horas_semana}")
    p.drawString(100, 700, f"Precio por hora: {contrato.precio_hora} EUR")
    p.drawString(100, 680, f"Estado: {contrato.get_estado_display()}")

    if contrato.observaciones:
        p.drawString(100, 650, "Observaciones:")
        p.drawString(100, 630, contrato.observaciones)

    p.save()
    buffer.seek(0)
    return buffer