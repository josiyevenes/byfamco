from rest_framework.routers import DefaultRouter
from .views import FamiliaViewSet, BebeViewSet, ContratoViewSet

router = DefaultRouter()
router.register(r'familias', FamiliaViewSet)
router.register(r'bebes', BebeViewSet)
router.register(r'contratos', ContratoViewSet)

urlpatterns = router.urls