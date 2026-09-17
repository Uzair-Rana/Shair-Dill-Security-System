from django.db import models


class HeroSlide(models.Model):
    """Hero section slides"""
    title = models.CharField(max_length=255)
    heading = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField()
    cta_text = models.CharField(max_length=100, default='Learn More')
    cta_link = models.CharField(max_length=255, default='#')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'Hero Slide'
        verbose_name_plural = 'Hero Slides'

    def __str__(self):
        return self.title


class Product(models.Model):
    """Product/service cards"""
    CATEGORY_CHOICES = [
        ('cameras', 'Cameras'),
        ('access-control', 'Access Control'),
        ('alarms', 'Alarms'),
        ('sensors', 'Sensors'),
        ('monitoring', 'Monitoring'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='other')
    cta_text = models.CharField(max_length=100, default='Learn More')
    cta_link = models.CharField(max_length=255, default='#')
    price = models.CharField(max_length=100, blank=True, null=True)
    features = models.TextField(blank=True, help_text='JSON array or comma-separated list')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return self.title


class Feature(models.Model):
    """Feature boxes"""
    icon = models.CharField(max_length=10)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return self.title


class Stat(models.Model):
    """Statistics cards"""
    number = models.CharField(max_length=50)
    label = models.CharField(max_length=255)
    description = models.TextField()
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return self.label


class Testimonial(models.Model):
    """Client testimonials"""
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    content = models.TextField()
    rating = models.IntegerField(default=5, choices=[(i, str(i)) for i in range(1, 6)])
    image = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.name} - {self.company}"
