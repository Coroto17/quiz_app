from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r"", UserViewSet, basename="users")
urlpatterns = router.urls