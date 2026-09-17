from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import HeroSlide, Product, Feature, Stat, Testimonial
from .serializers import HeroSlideSerializer, ProductSerializer, FeatureSerializer, StatSerializer, TestimonialSerializer


class HeroSlideViewSet(viewsets.ModelViewSet):
    """ViewSet for HeroSlide model"""
    queryset = HeroSlide.objects.filter(is_active=True)
    serializer_class = HeroSlideSerializer
    ordering_fields = ['order', 'created_at']
    ordering = ['order']


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet for Product model"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    ordering_fields = ['order', 'created_at', 'category']
    ordering = ['order']


class FeatureViewSet(viewsets.ModelViewSet):
    """ViewSet for Feature model"""
    queryset = Feature.objects.filter(is_active=True)
    serializer_class = FeatureSerializer
    ordering_fields = ['order', 'created_at']
    ordering = ['order']


class StatViewSet(viewsets.ModelViewSet):
    """ViewSet for Stat model"""
    queryset = Stat.objects.filter(is_active=True)
    serializer_class = StatSerializer
    ordering_fields = ['order', 'created_at']
    ordering = ['order']


class TestimonialViewSet(viewsets.ModelViewSet):
    """ViewSet for Testimonial model"""
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    ordering_fields = ['order', 'created_at', 'rating']
    ordering = ['order']


@api_view(['GET'])
def health_check(request):
    """API health check endpoint"""
    return Response({
        'status': 'OK',
        'message': 'SDSSS Django Backend is running'
    })
