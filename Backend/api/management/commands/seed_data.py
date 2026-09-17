from django.core.management.base import BaseCommand
from api.models import HeroSlide, Product, Feature, Stat, Testimonial


class Command(BaseCommand):
    help = 'Seed initial data into the database'

    def handle(self, *args, **options):
        self.stdout.write('Starting data seeding...')

        # Clear existing data
        HeroSlide.objects.all().delete()
        Product.objects.all().delete()
        Feature.objects.all().delete()
        Stat.objects.all().delete()
        Testimonial.objects.all().delete()
        self.stdout.write('[OK] Cleared existing data')

        # Seed Hero Slides
        hero_slides = [
            HeroSlide(
                title='Dome CCTV Systems',
                heading='Dome CCTV Systems',
                description='High-definition surveillance cameras equipped with smart night vision and 360-degree coverage for complete facility protection.',
                image='https://via.placeholder.com/1200x600?text=Dome+CCTV',
                cta_text='Explore CCTV Solutions',
                cta_link='#cctv',
                order=0,
                is_active=True,
            ),
            HeroSlide(
                title='Biometric Access Control',
                heading='Biometric Access Control',
                description='Advanced facial recognition and fingerprint technology for secure access management with real-time alerts and comprehensive audit logs.',
                image='https://via.placeholder.com/1200x600?text=Biometric+Access',
                cta_text='Learn About Access Control',
                cta_link='#biometric',
                order=1,
                is_active=True,
            ),
            HeroSlide(
                title='Command Center Interface',
                heading='Command Center Interface',
                description='Centralized monitoring dashboard with real-time telemetry, threat detection, and remote system management in one intuitive platform.',
                image='https://via.placeholder.com/1200x600?text=Command+Center',
                cta_text='View Dashboard',
                cta_link='#dashboard',
                order=2,
                is_active=True,
            ),
            HeroSlide(
                title='On-Site Security Officers',
                heading='On-Site Security Officers',
                description='Trained static guards and patrol officers dedicated to immediate threat response and facility protection with professional expertise.',
                image='https://via.placeholder.com/1200x600?text=Security+Officers',
                cta_text='Hire Security Staff',
                cta_link='#security-staff',
                order=3,
                is_active=True,
            ),
        ]
        HeroSlide.objects.bulk_create(hero_slides)
        self.stdout.write(f'[OK] Seeded {len(hero_slides)} hero slides')

        # Seed Products
        products = [
            Product(
                title='ANPR Camera Systems',
                description='Automatic Number Plate Recognition for vehicle tracking and access control.',
                image='https://via.placeholder.com/300x240?text=ANPR+Camera',
                category='cameras',
                cta_text='Explore',
                cta_link='#anpr',
                order=0,
                is_active=True,
            ),
            Product(
                title='Biometric Turnstile Gates',
                description='High-security access gates with integrated biometric verification.',
                image='https://via.placeholder.com/300x240?text=Turnstile+Gate',
                category='access-control',
                cta_text='Learn More',
                cta_link='#turnstile',
                order=1,
                is_active=True,
            ),
            Product(
                title='Alarm & Siren Systems',
                description='Strobe lights and sirens for emergency alerts and perimeter protection.',
                image='https://via.placeholder.com/300x240?text=Alarm+System',
                category='alarms',
                cta_text='View',
                cta_link='#alarm',
                order=2,
                is_active=True,
            ),
            Product(
                title='Motion Sensors',
                description='Advanced motion detection with minimal false alarms and smart triggers.',
                image='https://via.placeholder.com/300x240?text=Motion+Sensor',
                category='sensors',
                cta_text='Discover',
                cta_link='#motion',
                order=3,
                is_active=True,
            ),
            Product(
                title='PTZ Speed Dome Cameras',
                description='Pan-Tilt-Zoom cameras with motorized control and automated tracking.',
                image='https://via.placeholder.com/300x240?text=PTZ+Camera',
                category='cameras',
                cta_text='Explore',
                cta_link='#ptz',
                order=4,
                is_active=True,
            ),
            Product(
                title='RFID Card Readers',
                description='Contactless access control using RFID technology for seamless entry.',
                image='https://via.placeholder.com/300x240?text=RFID+Reader',
                category='access-control',
                cta_text='Learn More',
                cta_link='#rfid',
                order=5,
                is_active=True,
            ),
            Product(
                title='Smart Door Controllers',
                description='Touchscreen-based access control with real-time monitoring.',
                image='https://via.placeholder.com/300x240?text=Door+Controller',
                category='access-control',
                cta_text='View',
                cta_link='#controller',
                order=6,
                is_active=True,
            ),
            Product(
                title='Video Doorbells',
                description='Smart video doorbells with 24/7 monitoring and two-way audio.',
                image='https://via.placeholder.com/300x240?text=Video+Doorbell',
                category='monitoring',
                cta_text='Discover',
                cta_link='#doorbell',
                order=7,
                is_active=True,
            ),
            Product(
                title='Smart Door Locks',
                description='Electronic magnetic locks with secure access management.',
                image='https://via.placeholder.com/300x240?text=Door+Lock',
                category='access-control',
                cta_text='Explore',
                cta_link='#doorlock',
                order=8,
                is_active=True,
            ),
            Product(
                title='Wireless Beam Detectors',
                description='Perimeter protection with wireless infrared beam technology.',
                image='https://via.placeholder.com/300x240?text=Beam+Detector',
                category='sensors',
                cta_text='Learn More',
                cta_link='#beam',
                order=9,
                is_active=True,
            ),
            Product(
                title='Turret Cameras',
                description='Compact dome cameras with exceptional image quality and durability.',
                image='https://via.placeholder.com/300x240?text=Turret+Camera',
                category='cameras',
                cta_text='View',
                cta_link='#turret',
                order=10,
                is_active=True,
            ),
            Product(
                title='Under-Vehicle Inspection',
                description='Automated vehicle scanning for security checkpoints.',
                image='https://via.placeholder.com/300x240?text=UVIS+System',
                category='monitoring',
                cta_text='Discover',
                cta_link='#uvis',
                order=11,
                is_active=True,
            ),
        ]
        Product.objects.bulk_create(products)
        self.stdout.write(f'[OK] Seeded {len(products)} products')

        # Seed Features
        features = [
            Feature(
                icon='🎥',
                title='4K Video Surveillance',
                description='Crystal-clear high-definition monitoring with advanced compression and storage.',
                order=0,
                is_active=True,
            ),
            Feature(
                icon='🔒',
                title='Biometric Security',
                description='Multi-factor authentication with facial recognition and fingerprint scanning.',
                order=1,
                is_active=True,
            ),
            Feature(
                icon='📡',
                title='Real-time Monitoring',
                description='Live 24/7 dashboard access with instant alerts and remote management.',
                order=2,
                is_active=True,
            ),
            Feature(
                icon='🚨',
                title='Smart Threat Detection',
                description='AI-powered analytics to identify suspicious activities automatically.',
                order=3,
                is_active=True,
            ),
            Feature(
                icon='📱',
                title='Mobile Integration',
                description='Access your security system from anywhere with iOS and Android apps.',
                order=4,
                is_active=True,
            ),
            Feature(
                icon='🔐',
                title='Bank-Grade Encryption',
                description='Military-grade security protocols protect all your sensitive data.',
                order=5,
                is_active=True,
            ),
        ]
        Feature.objects.bulk_create(features)
        self.stdout.write(f'[OK] Seeded {len(features)} features')

        # Seed Stats
        stats = [
            Stat(
                number='500+',
                label='Active Clients',
                description='Across corporate, residential, and institutional sectors',
                order=0,
                is_active=True,
            ),
            Stat(
                number='10K+',
                label='Devices Deployed',
                description='CCTV cameras, sensors, and access control systems',
                order=1,
                is_active=True,
            ),
            Stat(
                number='99.9%',
                label='System Uptime',
                description='Reliable 24/7 monitoring with redundant infrastructure',
                order=2,
                is_active=True,
            ),
            Stat(
                number='250+',
                label='Security Officers',
                description='PSQCA-licensed trained professionals nationwide',
                order=3,
                is_active=True,
            ),
        ]
        Stat.objects.bulk_create(stats)
        self.stdout.write(f'[OK] Seeded {len(stats)} stats')

        # Seed Testimonials
        testimonials = [
            Testimonial(
                name='Ahmed Hassan',
                role='Facility Manager',
                company='Lahore Corporate Tower',
                content='SDSSS transformed our security operations. Their 24/7 monitoring and rapid response team have significantly reduced security incidents across our facility.',
                rating=5,
                order=0,
                is_active=True,
            ),
            Testimonial(
                name='Fatima Khan',
                role='Operations Director',
                company='Karachi Shopping Mall',
                content='The biometric access control system is seamless and reliable. We\'ve seen a 40% improvement in access management efficiency since implementation.',
                rating=5,
                order=1,
                is_active=True,
            ),
            Testimonial(
                name='Khalid Ahmed',
                role='Security Head',
                company='Islamabad Tech Park',
                content='Professional team, cutting-edge technology, and exceptional service. SDSSS is our trusted security partner for all our facilities.',
                rating=5,
                order=2,
                is_active=True,
            ),
            Testimonial(
                name='Samina Iqbal',
                role='Building Administrator',
                company='Multan Medical Center',
                content='The CCTV system quality is outstanding. Crystal clear footage and intuitive dashboard make monitoring effortless. Highly recommended!',
                rating=5,
                order=3,
                is_active=True,
            ),
        ]
        Testimonial.objects.bulk_create(testimonials)
        self.stdout.write(f'[OK] Seeded {len(testimonials)} testimonials')

        self.stdout.write(self.style.SUCCESS('Database seeding complete!'))
