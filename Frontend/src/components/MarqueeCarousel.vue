<script setup lang="ts">
import { computed } from 'vue'

interface CarouselCard {
  id: number
  image: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

interface Props {
  cards: CarouselCard[]
  duration?: number // seconds (default 40)
  cardWidth?: string // CSS width value (default 300px)
}

const props = withDefaults(defineProps<Props>(), {
  duration: 40,
  cardWidth: '300px',
})

// Duplicate cards for seamless loop
const duplicatedCards = computed(() => [...props.cards, ...props.cards])

// Calculate animation duration
const animationDuration = computed(() => `${props.duration}s`)

// Respect prefers-reduced-motion
const prefersReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <section class="w-full bg-gradient-to-b from-white to-slate-50 py-16 mt-16">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header (Optional) -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-slate-900 mb-2" style="font-family: 'Playfair Display', serif;">
          Our Solutions
        </h2>
        <p class="text-lg text-slate-600">
          Scroll to explore our complete range of security services
        </p>
      </div>

      <!-- Marquee Container -->
      <div class="relative overflow-hidden">
        <!-- Gradient overlays for fade effect -->
        <div class="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div class="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <!-- Marquee Track -->
        <div
          class="marquee-track"
          :style="{
            '--card-width': props.cardWidth,
            '--animation-duration': animationDuration,
          } as any"
          :class="{ 'marquee-paused': prefersReducedMotion }"
        >
          <!-- Cards -->
          <div v-for="(card, index) in duplicatedCards" :key="`${card.id}-${index}`" class="card">
            <!-- Card Container -->
            <div class="card-inner">
              <!-- Image Section -->
              <div class="card-image">
                <img :src="card.image" :alt="card.title" class="w-full h-full object-cover" />
              </div>

              <!-- Content Section -->
              <div class="card-content">
                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-description">{{ card.description }}</p>
                <a :href="card.ctaLink" class="card-cta">
                  {{ card.ctaText }} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Hint -->
      <p class="text-center text-sm text-slate-500 mt-8 hover-show">
        Hover to pause • Continuous carousel
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Marquee Animation */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 12px)); /* 12px = gap size */
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(0);
    }
  }
}

/* Marquee Track */
.marquee-track {
  display: flex;
  gap: 12px;
  width: fit-content;
  animation: marquee var(--animation-duration) linear infinite;
  padding: 12px 0;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-paused {
  animation: none;
  transform: translateX(0);
}

/* Card Styling */
.card {
  flex-shrink: 0;
  width: var(--card-width);
  height: auto;
}

.card-inner {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}

.card-inner:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

/* Card Image */
.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(to br, #f1f5f9, #e2e8f0);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-inner:hover .card-image img {
  transform: scale(1.05);
}

/* Card Content */
.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
  font-family: 'Playfair Display', serif;
}

.card-description {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
  flex-grow: 1;
}

.card-cta {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s ease, gap 0.3s ease;
}

.card-cta:hover {
  color: #1e40af;
}

/* Scroll Hint */
.hover-show {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

/* Smooth scrolling behavior */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
