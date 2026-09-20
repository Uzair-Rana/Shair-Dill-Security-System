<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'

interface Slide {
  id: number
  image?: string
  video?: string
  heading: string
  description: string
  ctaText: string
  ctaLink: string
}

interface Props {
  slides: Slide[]
  duration?: number // seconds between auto-swaps (default 6000ms)
  transitionDuration?: number // fade transition duration in ms (default 800ms)
}

const props = withDefaults(defineProps<Props>(), {
  duration: 6000,
  transitionDuration: 800,
})

const currentSlide = ref(0)
const autoSwapTimer = ref<ReturnType<typeof setInterval> | null>(null)
const pauseResumeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const slideContainerRef = ref<HTMLElement | null>(null)

const activeSlide = computed<Slide>(() => props.slides[currentSlide.value] ?? {
  id: 0,
  image: '',
  video: undefined,
  heading: '',
  description: '',
  ctaText: '',
  ctaLink: '#',
})

const prefersReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const startAutoSwap = () => {
  if (autoSwapTimer.value) clearInterval(autoSwapTimer.value)
  autoSwapTimer.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length
  }, props.duration)
}

const pauseAutoSwap = () => {
  if (autoSwapTimer.value) clearInterval(autoSwapTimer.value)
  if (pauseResumeTimer.value) clearTimeout(pauseResumeTimer.value)
  pauseResumeTimer.value = setTimeout(startAutoSwap, 4000)
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  pauseAutoSwap()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length
  pauseAutoSwap()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
  pauseAutoSwap()
}

const playActiveVideo = async () => {
  await nextTick()
  const video = slideContainerRef.value?.querySelector('video')
  if (video) {
    video.muted = true
    video.play().catch(() => {})
  }
}

watch(currentSlide, playActiveVideo)

onMounted(() => {
  startAutoSwap()
  playActiveVideo()
})
</script>

<template>
  <section class="full-screen-slider">
    <!-- Slides Container -->
    <div ref="slideContainerRef" class="slide-container">
      <Transition
        name="fade"
        mode="out-in"
        :duration="prefersReducedMotion ? 0 : transitionDuration"
      >
        <div :key="currentSlide" class="slide">
          <!-- Background Media with Overlay -->
          <div class="slide-background">
            <video
              v-if="activeSlide.video"
              :src="activeSlide.video"
              class="slide-media"
              autoplay
              muted
              loop
              playsinline
            ></video>
            <img v-else :src="activeSlide.image" :alt="activeSlide.heading" class="slide-media slide-media--image" />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Prev/Next Arrows -->
    <button type="button" class="nav-arrow nav-arrow-left" @click="prevSlide" aria-label="Previous slide">‹</button>
    <button type="button" class="nav-arrow nav-arrow-right" @click="nextSlide" aria-label="Next slide">›</button>

    <!-- Slide Dots -->
    <div class="slide-dots">
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="dot"
        :class="{ active: index === currentSlide }"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
      />
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
}

.slide-container {
  position: absolute;
  inset: 0;
}

/* Slide */
.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
}

/* Slide Background */
.slide-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.slide-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Product/brand collage slides are full infographics (logo + arranged
   products) — cropping them with object-fit:cover cuts off text and
   product edges, so show the whole image instead, letterboxed on the
   image's own white background rather than a jarring bar. */
.slide-media--image {
  object-fit: contain;
  background: #fff;
}

/* Dark gradient overlay for text readability */
.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.15) 100%);
}

/* Slide Content */
.slide-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 clamp(1.5rem, 8vw, 7rem);
}

.content-inner {
  max-width: 620px;
  text-align: left;
  color: white;
}

/* Slide Heading */
.slide-heading {
  font-size: clamp(2.5rem, 6.5vw, 4.25rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;
  font-family: var(--font-heading);
  letter-spacing: -1px;
  /* Override the global shimmer-gradient heading effect (main.css) which
     renders illegible dark text on photo backgrounds — hero text needs a
     solid, high-contrast color instead. */
  color: #E9C874;
  background: none;
  background-clip: unset;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: currentColor;
  animation: none;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.55), 0 8px 24px rgba(0, 0, 0, 0.45);
}

/* Slide Description */
.slide-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-width: 520px;
}

/* CTA Button */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #D4AF37;
  color: #000;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  background: #C5A059;
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

/* Prev/Next Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  z-index: 20;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: #D4AF37;
  color: #000;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transform: translateY(-50%);
  transition: background 0.2s ease, transform 0.2s ease;
}

.nav-arrow:hover {
  background: #C5A059;
  transform: translateY(-50%) scale(1.08);
}

.nav-arrow-left { left: 24px; }
.nav-arrow-right { right: 24px; }

/* Slide Dots */
.slide-dots {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  border-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.dot.active {
  background-color: #fff;
  border-color: #fff;
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

  .nav-arrow {
    width: 36px;
    height: 36px;
    font-size: 1.25rem;
  }

  .nav-arrow-left { left: 10px; }
  .nav-arrow-right { right: 10px; }
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
