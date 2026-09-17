<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Stat {
  number: string
  label: string
  description: string
}

const stats: Stat[] = [
  {
    number: '500+',
    label: 'Smart products',
    description: 'Cameras, entry devices and sensors for every kind of space',
  },
  {
    number: '10K+',
    label: 'Ways to connect',
    description: 'See, hear and respond from home or wherever you are',
  },
  {
    number: '99.9%',
    label: 'Ready every day',
    description: 'Thoughtful technology made for the rhythm of real life',
  },
  {
    number: '250+',
    label: 'Local support',
    description: 'Friendly guidance from product selection through setup',
  },
]

const displayedStats = ref<Array<{ number: string; label: string; description: string }>>(
  stats.map((s) => ({ number: '0', label: s.label, description: s.description }))
)

const animateNumbers = () => {
  stats.forEach((stat, index) => {
    const numStr = stat.number.replace(/[^0-9.]/g, '')
    const num = parseFloat(numStr)
    const suffix = stat.number.replace(/[0-9.]/g, '')

    let current = 0
    const increment = num / 50
    const timer = setInterval(() => {
      const displayedStat = displayedStats.value[index]
      if (!displayedStat) return

      current += increment
      if (current >= num) {
        displayedStat.number = stat.number
        clearInterval(timer)
      } else {
        displayedStat.number = Math.floor(current) + suffix
      }
    }, 30)
  })
}

onMounted(() => {
  // Trigger animation after a short delay
  setTimeout(animateNumbers, 300)
})
</script>

<template>
  <section class="stats-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Smart by design</h2>
        <p class="section-subtitle">
          A connected security experience that feels clear, capable and easy to live with.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div v-for="(stat, index) in displayedStats" :key="index" class="stat-card">
          <!-- Number -->
          <div class="stat-number">{{ stat.number }}</div>

          <!-- Label -->
          <h3 class="stat-label">{{ stat.label }}</h3>

          <!-- Description -->
          <p class="stat-description">{{ stat.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
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
  font-family: 'Playfair Display', serif;
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

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  width: 100%;
  perspective: 1200px;
}

/* Stat Card */
.stat-card {
  text-align: center;
  padding: 40px;
  border-radius: 16px;
  background: white;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 8%),
    0 0 40px rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform-style: preserve-3d;
  transform: translateZ(10px);
}

.stat-card:hover {
  border-color: #3b82f6;
  box-shadow:
    0 60px 120px rgba(59, 130, 246, 0.15),
    0 0 50px rgba(59, 130, 246, 0.2);
  transform: translateZ(20px) translateY(-8px);
}

/* Stat Number */
.stat-number {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  color: #0f172a;
  font-family: 'Playfair Display', serif;
  letter-spacing: -1px;
}

/* Stat Label */
.stat-label {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  font-family: 'Playfair Display', serif;
}

/* Stat Description */
.stat-description {
  font-size: 0.9375rem;
  color: #475569;
  margin: 0;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-section {
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

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat-card {
    padding: 24px;
    gap: 8px;
  }

  .stat-number {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  .stat-label {
    font-size: 1rem;
  }

  .stat-description {
    font-size: 0.8125rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
