from django.db import models

class Familia(models.Model):
    nombre_contacto = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    direccion = models.TextField(blank=True)
    activa = models.BooleanField(default=True)
    creada_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre_contacto

class Bebe(models.Model):
    familia = models.ForeignKey(Familia, on_delete=models.CASCADE, related_name='bebes')
    nombre = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    observaciones = models.TextField(blank=True)

    def __str__(self):
        return self.nombre
    
class Contrato(models.Model):
    ESTADOS = [
        ('borrador', 'Borrador'),
        ('activo', 'Activo'),
        ('finalizado', 'Finalizado'),
    ]
    familia = models.ForeignKey(Familia, on_delete=models.CASCADE, related_name='contratos')
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    horas_semana = models.DecimalField(max_digits=5, decimal_places=1)
    precio_hora = models.DecimalField(max_digits=8, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='borrador')
    observaciones = models.TextField(blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contrato {self.familia} - {self.estado}"