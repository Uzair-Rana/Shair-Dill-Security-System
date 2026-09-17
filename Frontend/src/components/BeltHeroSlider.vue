<script setup lang="ts">
import { computed } from 'vue'

interface Slide {
  id: number
  image: string
  heading: string
  description: string
  ctaText: string
  ctaLink: string
}

interface Props {
  slides: Slide[]
  duration?: number // animation duration in seconds (default 60)
}

const props = withDefaults(defineProps<Props>(), {
  duration: 60,
})

// Duplicate slides for seamless loop
const duplicatedSlides = computed(() => [...props.slides, ...props.slides])

// Calculate animation duration
const animationDuration = computed(() => `${props.duration}s`)

// Respect prefers-reduced-motion
const prefersReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <section class="belt-hero-slider" :class="{ 'motion-disabled': prefersReducedMotion }">
    <!-- Belt Track - All slides in continuous horizontal strip -->
    <div class="belt-track" :style="{ '--animation-duration': animationDuration } as any">
      <!-- Slides -->
      <div v-for="(slide, index) in duplicatedSlides" :key="`${slide.id}-${index}`" class="belt-slide">
        <!-- Slide Background Image -->
        <div class="slide-background">
          <img :src="slide.image" :alt="slide.heading" class="slide-image" />
          <div class="slide-overlay"></div>
        </div>

        <!-- Slide Content -->
        <div class="slide-content">
          <div class="content-wrapper">
            <h2 class="slide-heading">{{ slide.heading }}</h2>
            <p class="slide-description">{{ slide.description }}</p>
            <a :href="slide.ctaLink" class="cta-button">
              {{ slide.ctaText }}
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Optional: Scroll Hint -->
    <div class="scroll-hint">
      <p>Hover to pause • Continuous motion</p>
    </div>
  </section>
</template>

<style scoped>
/* Belt Hero Slider Container */
.belt-hero-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  margin-top: 44px;
}

/* Belt Track - Continuous horizontal strip */
.belt-track {
  display: flex;
  width: fit-content;
  height: 100%;
  animation: beltScroll var(--animation-duration) linear infinite;
}

.belt-track:hover {
  animation-play-state: paused;
}

/* Belt Scroll Animation */
@keyframes beltScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 0px));
  }
}

/* Individual Belt Slide */
.belt-slide {
  position: relative;
  width: 100vw;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Slide Background */
.slide-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Dark gradient overlay for text readability */
.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.5) 100%);
}

/* Slide Content */
.slide-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.content-wrapper {
  max-width: 700px;
  text-align: center;
  color: white;
  user-select: none;
  pointer-events: auto;
}

/* Slide Heading */
.slide-heading {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
  font-family: 'Playfair Display', serif;
  letter-spacing: -1px;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

/* Slide Description */
.slide-description {
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  line-height: 1.6;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* CTA Button */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 16px 40px;
  border-radius: 8px;
  font-size: 1.0625rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  border: none;
  cursor: pointer;
  pointer-events: auto;
}

.cta-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.cta-button:active {
  transform: translateY(0) scale(1);
}

.arrow {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-button:hover .arrow {
  transform: translateX(4px);
}

/* Scroll Hint */
.scroll-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  text-align: center;
  pointer-events: none;
}

.scroll-hint p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  margin: 0;
  animation: fadeInOut 4s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

/* Motion Disabled (prefers-reduced-motion) */
.motion-disabled .belt-track {
  animation: none;
  transform: translateX(0);
}

.motion-disabled .belt-track:hover {
  animation: none;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slide-heading {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
  }

  .slide-description {
    font-size: clamp(0.875rem, 2vw, 1rem);
  }

  .cta-button {
    padding: 12px 28px;
    font-size: 0.9375rem;
  }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .belt-track,
  .cta-button,
  .scroll-hint p {
    animation: none !important;
    transition: none !important;
  }

  .belt-track {
    transform: translateX(0) !important;
  }
}
</style>
