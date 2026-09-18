<script setup lang="ts">
import cctvCameraImg from '../assets/products/CCTV_live_view_grid_mockup_202609052309.jpeg'
</script>

<template>
  <section class="hero-card-section">
    <div class="hero-card-wrapper">
      <div class="hero-card">
        <!-- Image -->
        <div class="card-image">
          <img :src="cctvCameraImg" alt="Security CCTV Camera" />
        </div>

        <!-- Title -->
        <h1 class="card-title">Advanced Security Solutions</h1>

        <!-- Description -->
        <p class="card-description">
          Comprehensive surveillance and access control systems designed to protect your facility with 24/7 monitoring, real-time alerts, and professional security management.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-card-section {
  width: 100%;
  height: auto;
  background: white;
  padding: 0;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

/* Card Wrapper with Borders */
.hero-card-wrapper {
  width: 90%;
  max-width: 1200px;
  padding: 0;
  margin: 20px;
  border: 1px solid #e2e8f0;
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 15%),
    0 0 40px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 24px;
  transform-style: preserve-3d;
  transform: translateY(-30px) translateZ(30px) rotateX(5deg);
  border-color: #cbd5e1;
}

.hero-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  background: white;
  border-radius: 20px;
  transform-style: preserve-3d;
  position: relative;
}

/* Card Image */
.card-image {
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 20px 0 0;
  position: relative;
  transform-style: preserve-3d;
}


.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform-style: preserve-3d;
  transform: scale(1.08) translateZ(40px);
}

/* Card Title */
.card-title {
  font-size: 2.6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #0f172a 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-family: var(--font-heading);
  line-height: 1.2;
  letter-spacing: -1px;
  padding: 40px 40px 0 40px;
  text-align: center;
  transform-style: preserve-3d;
  transform: translateZ(25px) rotateZ(0deg);
  position: relative;
  z-index: 2;
}

/* Card Description */
.card-description {
  font-size: 1rem;
  color: #475569;
  margin: 0;
  line-height: 1.8;
  padding: 20px 40px 40px 40px;
  text-align: center;
  transform-style: preserve-3d;
  transform: translateZ(20px);
  position: relative;
  z-index: 2;
}


/* Responsive Design */
@media (max-width: 1024px) {
  .hero-card-wrapper {
    width: 95%;
    margin: 20px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
  }

  .card-image {
    height: 260px;
    border-radius: 18px 18px 0 0;
  }

  .card-title {
    font-size: 2rem;
    padding: 30px 30px 0 30px;
  }

  .card-description {
    font-size: 0.95rem;
    padding: 15px 30px 30px 30px;
  }
}

@media (max-width: 768px) {
  .hero-card-section {
    margin-top: 80px;
  }

  .hero-card-wrapper {
    width: 95%;
    margin: 20px;
    border-radius: 18px;
    border: 1px solid #e2e8f0;
  }

  .card-image {
    height: 240px;
    border-radius: 16px 16px 0 0;
  }

  .card-title {
    font-size: 1.5rem;
    padding: 25px 25px 0 25px;
  }

  .card-description {
    font-size: 0.9rem;
    padding: 12px 25px 25px 25px;
  }
}

@media (max-width: 480px) {
  .hero-card-section {
    margin-top: 60px;
  }

  .hero-card-wrapper {
    width: 98%;
    padding: 0;
    margin: 15px;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
  }

  .card-image {
    height: 200px;
    border-radius: 14px 14px 0 0;
  }

  .card-title {
    font-size: 1.25rem;
    padding: 20px 20px 0 20px;
  }

  .card-description {
    font-size: 0.85rem;
    padding: 10px 20px 20px 20px;
  }
}
</style>
