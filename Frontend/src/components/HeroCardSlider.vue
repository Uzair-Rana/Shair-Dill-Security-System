<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import ptz from '../assets/products/PTZ_speed_dome_camera_recording_202609052309.jpeg'
import biometric from '../assets/products/Biometric_turnstile_gate_installed_202609052309.jpeg'
import doorController from '../assets/products/Smart_Touchscreen_Door_Controller_202609052309.jpeg'

interface Slide {
  id: number
  image?: string
  video?: string
  title: string
  subtitle: string
  categories: string[]
}

const slides: Slide[] = [
  { id: 1, image: biometric, title: 'Advanced Security Solutions', subtitle: 'Cutting-edge biometric turnstile systems and access control technology delivering unmatched facility protection.', categories: ['Biometric access', 'Turnstile systems', 'Smart entry'] },
  { id: 2, image: ptz, title: 'Protection that follows you.', subtitle: 'Pan, tilt and zoom coverage with intelligent tracking, day or night.', categories: ['PTZ cameras', '4K clarity', 'Night vision'] },
  { id: 3, image: doorController, title: 'One app. Your whole space.', subtitle: 'Manage cameras, doors and alerts from wherever life takes you.', categories: ['SDSSS app', 'Cloud storage', 'Instant alerts'] },
]

const emit = defineEmits<{ goToShop: [] }>()
const activeIndex = ref(0)
const isPaused = ref(false)
const carouselRef = ref<HTMLElement | null>(null)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const activeSlide = computed(() => slides[activeIndex.value] ?? slides[0]!)

const tryPlayVideo = () => {
  setTimeout(() => {
    const v = carouselRef.value?.querySelector('video') as HTMLVideoElement | null
    if (v) { v.muted = true; v.play().catch(() => {}) }
  }, 100)
}

const startAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = setInterval(() => {
    if (!isPaused.value) activeIndex.value = (activeIndex.value + 1) % slides.length
  }, 5000)
}

watch(activeIndex, () => {
  if (activeSlide.value.video) tryPlayVideo()
})

onMounted(() => {
  startAutoplay()
  if (activeSlide.value.video) tryPlayVideo()
})

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
})
</script>

<template>
  <section class="reference-carousel" ref="carouselRef" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
    <Transition name="hero-slide">
      <div :key="activeSlide.id" class="reference-slide">
        <video
          v-if="activeSlide.video"
          :src="activeSlide.video"
          class="reference-slide-image"
          autoplay
          muted
          loop
          playsinline
        ></video>
        <img v-else class="reference-slide-image" :src="activeSlide.image" :alt="activeSlide.title" />
        <div class="reference-overlay"></div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.reference-carousel { position: relative; margin-top: 84px; height: clamp(520px, calc(100vh - 84px), 700px); overflow: hidden; background: #fff; color: #12232c; }
.reference-slide, .reference-slide-image, .reference-overlay, .reference-curve { position: absolute; inset: 0; }
.reference-slide { overflow: hidden; }
.reference-slide-image { inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.reference-overlay { background: transparent; }
.reference-content { position: absolute; z-index: 2; left: clamp(1.5rem, 8vw, 8rem); top: 50%; width: min(430px, 45vw); transform: translateY(-50%); }
.reference-kicker { color: #1676d2; font-size: .72rem; font-weight: 800; letter-spacing: .18em; margin: 0 0 1.25rem; }
.reference-content h1 { color: #12232c; text-shadow: none; font-size: clamp(2.5rem, 5vw, 5rem); line-height: .98; margin: 0; }
.reference-subtitle { color: #52636a; font-size: clamp(.95rem, 1.5vw, 1.15rem); line-height: 1.6; max-width: 350px; margin: 1.4rem 0 1.7rem; }
.reference-more { display: inline-flex; align-items: center; gap: 1.2rem; border: 0; border-radius: 999px; padding: .75rem 1.2rem; color: #fff; background: #1676d2; font-weight: 700; cursor: pointer; transition: background 180ms ease, transform 180ms ease; }
.reference-more:hover { background: #0d5ea8; transform: translateY(-2px); }
.reference-categories { display: flex; flex-direction: column; gap: .4rem; margin-top: 3.6rem; }
.reference-categories button { width: fit-content; border: 0; padding: 0; color: #68777d; background: transparent; font-size: .78rem; text-align: left; cursor: pointer; transition: color 180ms ease, transform 180ms ease; }
.reference-categories button:first-child, .reference-categories button:hover { color: #1676d2; transform: translateX(4px); }
.reference-status { position: absolute; z-index: 3; right: clamp(1.5rem, 7vw, 7rem); bottom: 2.5rem; display: flex; align-items: center; gap: .8rem; color: #fff; font-size: .72rem; letter-spacing: .08em; text-shadow: 0 1px 4px rgba(0, 0, 0, .6); }
.reference-progress { width: 120px; height: 2px; background: rgba(255, 255, 255, .55); }
.reference-progress i { display: block; height: 100%; background: #1676d2; transition: width 400ms ease; }
.reference-controls { position: absolute; z-index: 4; right: clamp(1.5rem, 7vw, 7rem); bottom: 5.8rem; display: flex; align-items: center; gap: .8rem; }
.reference-controls > button { width: 2.3rem; height: 2.3rem; border: 1px solid #b9c8ce; border-radius: 50%; color: #12232c; background: #fff; cursor: pointer; }
.reference-dots { display: flex; gap: .4rem; }
.reference-dots button { width: 7px; height: 7px; padding: 0; border: 0; border-radius: 50%; background: #b9c8ce; cursor: pointer; }
.reference-dots button.active { width: 24px; border-radius: 5px; background: #1676d2; }
.hero-slide-enter-active, .hero-slide-leave-active { transition: transform 650ms ease; }
.hero-slide-enter-from { transform: translateX(100%); }
.hero-slide-leave-to { transform: translateX(-100%); }
@media (max-width: 768px) {
  .reference-carousel { margin-top: 84px; height: 660px; }
  .reference-slide-image { inset: 0; width: 100%; height: 100%; object-position: center; }
  .reference-overlay { background: transparent; }
  .reference-content { left: 1.5rem; right: 1.5rem; top: auto; bottom: 5rem; width: auto; transform: none; }
  .reference-content h1 { font-size: clamp(2.4rem, 12vw, 4rem); }
  .reference-categories { margin-top: 2rem; }
  .reference-controls { right: 1.5rem; bottom: 2.5rem; }
  .reference-status { left: 1.5rem; right: auto; bottom: 2.8rem; }
}
</style>
