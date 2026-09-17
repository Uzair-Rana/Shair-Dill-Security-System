from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HeroSlideViewSet,
    ProductViewSet,
    FeatureViewSet,
    StatViewSet,
    TestimonialViewSet,
    health_check,
)

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'hero-slides', HeroSlideViewSet, basename='heroslide')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'features', FeatureViewSet, basename='feature')
router.register(r'stats', StatViewSet, basename='stat')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')

urlpatterns = [
    path('', include(router.urls)),
    path('health/', health_check, name='health-check'),
]
