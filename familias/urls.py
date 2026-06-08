from rest_framework.routers import DefaultRouter
from .views import FamiliaViewSet, BebeViewSet

router = DefaultRouter()
router.register(r'familias', FamiliaViewSet)
router.register(r'bebes', BebeViewSet)

urlpatterns = router.urls