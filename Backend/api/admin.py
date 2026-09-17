from django.contrib import admin
from .models import HeroSlide, Product, Feature, Stat, Testimonial


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'heading', 'description']
    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'heading')
        }),
        ('Content', {
            'fields': ('description', 'image')
        }),
        ('Call to Action', {
            'fields': ('cta_text', 'cta_link')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'category')
        }),
        ('Content', {
            'fields': ('description', 'image')
        }),
        ('Details', {
            'fields': ('price', 'features')
        }),
        ('Call to Action', {
            'fields': ('cta_text', 'cta_link')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description']
    fieldsets = (
        ('Basic Info', {
            'fields': ('icon', 'title')
        }),
        ('Content', {
            'fields': ('description',)
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['label', 'number', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['label', 'description']
    fieldsets = (
        ('Basic Info', {
            'fields': ('number', 'label')
        }),
        ('Content', {
            'fields': ('description',)
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'rating', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    list_filter = ['rating', 'is_active', 'created_at']
    search_fields = ['name', 'company', 'content']
    fieldsets = (
        ('Author Info', {
            'fields': ('name', 'role', 'company')
        }),
        ('Content', {
            'fields': ('content', 'rating')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    readonly_fields = ['created_at', 'updated_at']
