<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

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
  duration?: number // seconds between auto-swaps (default 4500ms)
  transitionDuration?: number // fade transition duration in ms (default 800ms)
}

const props = withDefaults(defineProps<Props>(), {
  duration: 4500,
  transitionDuration: 800,
})

const currentSlide = ref(0)
const autoSwapTimer = ref<ReturnType<typeof setInterval> | null>(null)
const isAutoLooping = ref(true)
const pauseResumeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const timeRemaining = ref(props.duration)
const progressInterval = ref<ReturnType<typeof setInterval> | null>(null)

const activeSlide = computed<Slide>(() => props.slides[currentSlide.value] ?? {
  id: 0,
  image: '',
  heading: '',
  description: '',
  ctaText: '',
  ctaLink: '#',
})

const prefersReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const progressPercent = computed(() => {
  return (timeRemaining.value / props.duration) * 100
})

const startAutoSwap = () => {
  if (autoSwapTimer.value) clearInterval(autoSwapTimer.value)
  if (progressInterval.value) clearInterval(progressInterval.value)

  isAutoLooping.value = true
  timeRemaining.value = props.duration

  // Progress bar animation
  progressInterval.value = setInterval(() => {
    timeRemaining.value = Math.max(0, timeRemaining.value - 50)
  }, 50)

  // Auto-swap animation
  autoSwapTimer.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length
    timeRemaining.value = props.duration
  }, props.duration)
}

const pauseAutoSwap = () => {
  if (autoSwapTimer.value) clearInterval(autoSwapTimer.value)
  if (progressInterval.value) clearInterval(progressInterval.value)
  isAutoLooping.value = false

  // Resume after 3 seconds of no hover
  if (pauseResumeTimer.value) clearTimeout(pauseResumeTimer.value)
  pauseResumeTimer.value = setTimeout(() => {
    startAutoSwap()
  }, 3000)
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  pauseAutoSwap()
}

onMounted(() => {
  startAutoSwap()
})
</script>

<template>
  <section class="full-screen-slider">
    <!-- Slides Container -->
    <Transition
      name="fade"
      mode="out-in"
      :duration="prefersReducedMotion ? 0 : transitionDuration"
    >
      <div :key="currentSlide" class="slide">
        <!-- Background Image with Overlay -->
        <div class="slide-background">
          <img
            :src="activeSlide.image"
            :alt="activeSlide.heading"
            class="slide-image"
          />
          <div class="slide-overlay"></div>
        </div>

        <!-- Slide Content -->
        <div class="slide-content">
          <div class="content-inner">
            <h1 class="slide-heading">{{ activeSlide.heading }}</h1>
            <p class="slide-description">{{ activeSlide.description }}</p>
            <a :href="activeSlide.ctaLink" class="cta-button">
              {{ activeSlide.ctaText }}
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Navigation Controls -->
    <div class="nav-controls">
      <!-- Auto-Loop Indicator -->
      <div class="loop-indicator">
        <div class="indicator-dot" :class="{ active: isAutoLooping }"></div>
        <span class="indicator-text">{{ isAutoLooping ? 'Auto Loop' : 'Paused' }}</span>
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <!-- Slide Dots -->
      <div class="slide-dots">
        <button
          v-for="(_, index) in slides"
          :key="index"
          class="dot"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
          @mouseenter="pauseAutoSwap"
          @mouseleave="startAutoSwap"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Full Screen Slider Container */
.full-screen-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  margin-top: 44px;
}

/* Slide */
.slide {
  position: absolute;
  inset: 0;
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 100%);
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

.content-inner {
  max-width: 700px;
  text-align: center;
  color: white;
}

/* Slide Heading */
.slide-heading {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  letter-spacing: -1px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  border: none;
  cursor: pointer;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.cta-button:active {
  transform: translateY(0);
}

.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow {
  transform: translateX(4px);
}

/* Navigation Controls */
.nav-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
}

/* Loop Indicator */
.loop-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background-color: #3b82f6;
  box-shadow: 0 0 8px #3b82f6;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Progress Bar */
.progress-bar {
  width: 60px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  backdrop-filter: blur(4px);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 2px;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

/* Slide Dots */
.slide-dots {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.dot.active {
  background-color: #3b82f6;
  border-color: #3b82f6;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind(transitionDuration + 'ms') ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Responsive Design */
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

  .nav-controls {
    gap: 12px;
    padding: 16px;
  }

  .progress-bar {
    width: 50px;
  }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .slide,
  .slide-heading,
  .cta-button,
  .dot {
    animation: none !important;
    transition: none !important;
  }
}
</style>
