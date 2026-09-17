<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '◉',
    title: 'Sharp in every detail',
    description: 'High-resolution video helps you see what matters, from the front door to the far edge of your yard.',
  },
  {
    icon: '⌁',
    title: 'Smart AI detection',
    description: 'Get useful alerts for people, vehicles and unusual activity without constant false alarms.',
  },
  {
    icon: '⌂',
    title: 'Indoor to outdoor',
    description: 'Build a complete view of your space with cameras designed for every room, entrance and weather.',
  },
  {
    icon: '↗',
    title: 'Stay connected anywhere',
    description: 'Check in live, receive instant notifications and respond from the SDSSS mobile experience.',
  },
  {
    icon: '♧',
    title: 'Privacy by design',
    description: 'Thoughtful controls, secure storage options and clear choices for how your footage is handled.',
  },
  {
    icon: '＋',
    title: 'Easy to add on',
    description: 'Start with one camera and expand into a full smart security setup as your needs grow.',
  },
  {
    icon: '○',
    title: 'Cloud-ready storage',
    description: 'Keep important moments accessible with flexible local and cloud recording options.',
  },
  {
    icon: '♡',
    title: 'Made for real life',
    description: 'Simple setup, thoughtful design and local support for homes, shops and growing businesses.',
  },
]
</script>

<template>
  <section class="features-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Everything your space needs</h2>
        <p class="section-subtitle">
          From first alert to daily peace of mind, SDSSS makes smart security feel simple.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <!-- Icon -->
          <div class="feature-icon">{{ feature.icon }}</div>

          <!-- Title -->
          <h3 class="feature-title">{{ feature.title }}</h3>

          <!-- Description -->
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  width: 100%;
  background: linear-gradient(to bottom, white, #f8fafc);
  padding: 60px 0;
  perspective: 1200px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 16px 0;
  font-family: 'Playfair Display', serif;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #475569;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  width: 100%;
}

/* Feature Card */
.feature-card {
  padding: 32px;
  border-radius: 12px;
  background: white;
  border: 2px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  transform-style: preserve-3d;
  transform: rotateX(5deg) rotateY(-5deg) translateZ(20px);
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 15%),
    0 0 40px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  animation: cardEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }
.feature-card:nth-child(6) { animation-delay: 0.6s; }
.feature-card:nth-child(7) { animation-delay: 0.7s; }
.feature-card:nth-child(8) { animation-delay: 0.8s; }

@keyframes cardEntrance {
  0% {
    opacity: 0;
    transform: rotateX(15deg) rotateY(-15deg) translateZ(-50px) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: rotateX(5deg) rotateY(-5deg) translateZ(20px) translateY(0px);
  }
}

.feature-card:hover {
  border-color: #3b82f6;
  transform: rotateX(2deg) rotateY(-2deg) translateZ(50px) translateY(-10px) rotateZ(2deg);
  box-shadow:
    0 80px 160px rgba(59, 130, 246, 0.25),
    0 0 60px rgba(59, 130, 246, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* Feature Icon */
.feature-icon {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
  border-radius: 12px;
  transform-style: preserve-3d;
  transform: translateZ(30px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateZ(30px) translateY(0px);
  }
  50% {
    transform: translateZ(30px) translateY(-8px);
  }
}

.feature-card:hover .feature-icon {
  transform: translateZ(60px) scale(1.15) rotateX(10deg) rotateY(-10deg);
  animation: iconBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes iconBounce {
  0%, 100% {
    transform: translateZ(60px) scale(1.15) rotateX(10deg) rotateY(-10deg);
  }
  50% {
    transform: translateZ(60px) scale(1.2) rotateX(0deg) rotateY(0deg);
  }
}

/* Feature Title */
.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  font-family: 'Playfair Display', serif;
  transform-style: preserve-3d;
  transform: translateZ(15px);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-title {
  color: #3b82f6;
  transform: translateZ(25px) scale(1.05);
}

/* Feature Description */
.feature-description {
  font-size: 0.9375rem;
  color: #475569;
  margin: 0;
  line-height: 1.6;
  transform-style: preserve-3d;
  transform: translateZ(12px);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-description {
  color: #334155;
  transform: translateZ(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .features-section {
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

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-card {
    padding: 24px;
  }

  .feature-icon {
    width: 64px;
    height: 64px;
    font-size: 2.5rem;
  }

  .feature-title {
    font-size: 1.125rem;
  }
}
</style>
