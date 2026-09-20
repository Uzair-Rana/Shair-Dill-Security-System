<script setup lang="ts">
import ProductCard from './ProductCard.vue'

import anprCameraImg from '../assets/products/images (10).jpg'
import biometricTurnstileImg from '../assets/products/ChatGPT Image Sep 20, 2026, 03_21_04 AM.png'
import alarmSirenImg from '../assets/products/BOS-NBE-3703-AL.webp'
import motionSensorImg from '../assets/products/images (17).jpg'
import ptzCameraImg from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import rfidReaderImg from '../assets/products/images (19).jpg'
import doorControllerImg from '../assets/products/ChatGPT Image Sep 20, 2026, 03_08_46 AM.png'
import videDoorbellImg from '../assets/products/61XkDOqfaOL.jpg'
import doorLockImg from '../assets/products/images (15).jpg'
import beamDetectorImg from '../assets/products/images (18).jpg'
import turretCameraImg from '../assets/products/DS-2CE16D0T-EXIPF-3.6mm-price-in-pakistan-hikvisionstore.pk_.png'
import underVehicleImg from '../assets/products/images (14).jpg'

interface Product {
  id: number
  image: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

const products: Product[] = [
  {
    id: 1,
    image: anprCameraImg,
    title: 'Smart Outdoor Cameras',
    description: 'Clear outdoor coverage with intelligent alerts and dependable night vision.',
    ctaText: 'Explore',
    ctaLink: '#anpr',
  },
  {
    id: 2,
    image: biometricTurnstileImg,
    title: 'Smart Entry Systems',
    description: 'Connected doorbells, doorphones and access devices for confident arrivals.',
    ctaText: 'Learn More',
    ctaLink: '#turnstile',
  },
  {
    id: 3,
    image: alarmSirenImg,
    title: 'Security Alarms',
    description: 'Simple, responsive protection that helps you react quickly when something changes.',
    ctaText: 'View',
    ctaLink: '#alarm',
  },
  {
    id: 4,
    image: motionSensorImg,
    title: 'Smart Sensors',
    description: 'Add helpful context to your camera system with motion and environment sensors.',
    ctaText: 'Discover',
    ctaLink: '#motion',
  },
  {
    id: 5,
    image: ptzCameraImg,
    title: 'Pan & Tilt Cameras',
    description: 'Flexible views, automatic tracking and wide-area coverage in one camera.',
    ctaText: 'Explore',
    ctaLink: '#ptz',
  },
  {
    id: 6,
    image: rfidReaderImg,
    title: 'Access Readers',
    description: 'Convenient, accountable access for teams, visitors and shared spaces.',
    ctaText: 'Learn More',
    ctaLink: '#rfid',
  },
  {
    id: 7,
    image: doorControllerImg,
    title: 'Video Doorphones',
    description: 'See, speak to and manage visitors from the doorway or your phone.',
    ctaText: 'View',
    ctaLink: '#controller',
  },
  {
    id: 8,
    image: videDoorbellImg,
    title: 'Video Doorbells',
    description: 'Know who is at the door with two-way talk and instant notifications.',
    ctaText: 'Discover',
    ctaLink: '#doorbell',
  },
  {
    id: 9,
    image: doorLockImg,
    title: 'Smart Door Locks',
    description: 'A more convenient way to secure your home, office or rental property.',
    ctaText: 'Explore',
    ctaLink: '#doorlock',
  },
  {
    id: 10,
    image: beamDetectorImg,
    title: 'Wireless Protection',
    description: 'Flexible devices that extend your security beyond the camera frame.',
    ctaText: 'Learn More',
    ctaLink: '#beam',
  },
  {
    id: 11,
    image: turretCameraImg,
    title: 'Indoor Security Cameras',
    description: 'Compact, thoughtful cameras for rooms, pets, children and everyday peace of mind.',
    ctaText: 'View',
    ctaLink: '#turret',
  },
  {
    id: 12,
    image: underVehicleImg,
    title: 'Business Security',
    description: 'Scalable camera and access solutions for shops, offices and growing teams.',
    ctaText: 'Discover',
    ctaLink: '#uvis',
  },
]
</script>

<template>
  <section class="products-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Explore the SDSSS range</h2>
        <p class="section-subtitle">
          Cameras, smart entry and connected devices designed to work together beautifully.
        </p>
      </div>

      <!-- Products Grid -->
      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :image="product.image"
          :title="product.title"
          :description="product.description"
          :cta-text="product.ctaText"
          :cta-link="product.ctaLink"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section {
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 50%, #ffffff 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 16px 0;
  font-family: var(--font-heading);
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #475569;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 500;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  width: 100%;
  perspective: 1200px;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .products-section {
    padding: 40px 0;
  }

  .container {
    padding: 0 16px;
  }

  .section-header {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}

</style>
