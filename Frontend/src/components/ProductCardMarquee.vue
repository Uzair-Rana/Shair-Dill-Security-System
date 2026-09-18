<script setup lang="ts">
import biometricImg from '../assets/products/Biometric_turnstile_gate_installed_202609052309.jpeg'
import cameraImg from '../assets/products/PTZ_speed_dome_camera_recording_202609052309.jpeg'
import doorImg from '../assets/products/Smart_Touchscreen_Door_Controller_202609052309.jpeg'
import videoDoorImg from '../assets/products/Video_doorbell_with_camera_mockup_202609052309.jpeg'
import anprImg from '../assets/products/ANPR_camera_mounted_on_arm_202609052309.jpeg'
import rfidImg from '../assets/products/RFID_card_reader_panel_mounted_202609052309.jpeg'

interface Product {
  id: number
  image: string
  title: string
}

const products: Product[] = [
  { id: 1, image: cameraImg, title: 'PTZ Security Camera' },
  { id: 2, image: biometricImg, title: 'Biometric Access' },
  { id: 3, image: doorImg, title: 'Smart Door Control' },
  { id: 4, image: videoDoorImg, title: 'Video Doorbell' },
  { id: 5, image: anprImg, title: 'ANPR Camera' },
  { id: 6, image: rfidImg, title: 'RFID Reader' },
]

// Duplicate for seamless loop
const duplicatedProducts = [...products, ...products]
</script>

<template>
  <div class="marquee-container">
    <div class="marquee-track">
      <div v-for="(product, index) in duplicatedProducts" :key="`${product.id}-${index}`" class="product-card">
        <div class="card-wrapper">
          <div class="card-image">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ product.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-container {
  width: 100%;
  height: 380px;
  background: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  perspective: 1200px;
  margin-top: -30px;
}

.marquee-track {
  display: flex;
  gap: 24px;
  padding: 20px;
  animation: marqueeScroll 60s linear infinite reverse;
  will-change: transform;
  width: max-content;
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(calc(-280px * 6 - 24px * 6));
  }
}

.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

.product-card {
  flex-shrink: 0;
  width: 280px;
  height: 340px;
}

.card-wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 15%),
    0 0 40px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transform-style: preserve-3d;
  transform: translateZ(30px) rotateX(5deg);
  transition: all 0.3s ease;
}

.card-wrapper:hover {
  box-shadow:
    0 60px 120px rgba(0, 0, 0, 20%),
    0 0 50px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateZ(40px) rotateX(3deg) translateY(-8px);
}

/* Card Image */
.card-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px 24px 0 0;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform-style: preserve-3d;
  transform: scale(1.08) translateZ(40px);
}

.card-wrapper:hover .card-image img {
  transform: scale(1.12) translateZ(50px);
}

/* Card Content */
.card-content {
  width: 100%;
  flex: 1;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 0 0 24px 24px;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  font-family: var(--font-heading);
  text-align: center;
  line-height: 1.3;
  transform-style: preserve-3d;
  transform: translateZ(25px);
}

.card-wrapper:hover .card-title {
  font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .marquee-container {
    height: 320px;
  }

  .product-card {
    width: 240px;
    height: 300px;
  }

  .card-image {
    height: 180px;
  }

  .card-content {
    padding: 16px;
  }

  .card-title {
    font-size: 1rem;
  }

  @keyframes marqueeScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
}

@media (max-width: 480px) {
  .marquee-container {
    height: 280px;
  }

  .product-card {
    width: 200px;
    height: 260px;
  }

  .card-image {
    height: 150px;
  }

  .card-content {
    padding: 12px;
  }

  .card-title {
    font-size: 0.9rem;
  }
}
</style>
