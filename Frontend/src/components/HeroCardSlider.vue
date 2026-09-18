<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import cctv from '../assets/products/CCTV_live_view_grid_mockup_202609052309.jpeg'
import ptz from '../assets/products/PTZ_speed_dome_camera_recording_202609052309.jpeg'
import biometric from '../assets/products/Biometric_turnstile_gate_installed_202609052309.jpeg'
import doorController from '../assets/products/Smart_Touchscreen_Door_Controller_202609052309.jpeg'

import batteryCam from '../assets/Card products/Security_CCTV_camera_floating_2K_20260911101923.jpeg'

interface Slide {
  id: number
  image: string
  label: string
  icon: string
  title: string
}

const slides: Slide[] = [
  { id: 1, image: cctv, label: 'Indoor cameras', icon: '⌂', title: 'See smarter. Live safer.' },
  { id: 2, image: ptz, label: 'Outdoor cameras', icon: '◉', title: 'Protection that follows you.' },
  { id: 3, image: batteryCam, label: 'Battery cameras', icon: '↯', title: 'Wire-free security, anywhere.' },
  { id: 4, image: biometric, label: 'Smart entry', icon: '⇥', title: 'A smarter way to enter.' },
  { id: 5, image: doorController, label: 'Smart home', icon: '⌁', title: 'One app. Your whole space.' },
]

const emit = defineEmits<{ goToShop: [] }>()
const activeIndex = ref(0)
const isPaused = ref(false)

const activeSlide = computed(() => slides[activeIndex.value] ?? slides[0]!)

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

let autoplayTimer: ReturnType<typeof setTimeout> | null = null

const stopAutoplay = () => {
  if (autoplayTimer) clearTimeout(autoplayTimer)
  autoplayTimer = null
}

const startAutoplay = () => {
  stopAutoplay()
  if (!isPaused.value) autoplayTimer = setTimeout(next, 5000)
}

watch([activeIndex, isPaused], startAutoplay)
onMounted(startAutoplay)
onUnmounted(stopAutoplay)

const select = (index: number) => {
  if (index === activeIndex.value) emit('goToShop')
  else activeIndex.value = index
}
</script>

<template>
  <section class="reference-carousel" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
    <Transition name="hero-slide">
      <div :key="activeSlide.id" class="reference-slide">
        <img class="reference-slide-image" :src="activeSlide.image" :alt="activeSlide.title" />
        <div class="reference-overlay"></div>
      </div>
    </Transition>

    <nav class="hero-categories" aria-label="Shop by category">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        type="button"
        :class="['hero-category', { active: index === activeIndex }]"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="select(index)"
      >
        <span class="hero-category-icon" aria-hidden="true">{{ slide.icon }}</span>
        <span class="hero-category-label">{{ slide.label }}</span>
      </button>
    </nav>
  </section>
</template>

<style scoped>
.reference-carousel { position: relative; margin-top: 0; height: clamp(560px, 100vh, 760px); overflow: hidden; background: #fff; color: #12232c; }
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
.hero-categories { position: absolute; z-index: 5; left: clamp(1rem, 4vw, 3rem); bottom: clamp(1rem, 4vh, 2.5rem); display: flex; flex-direction: column; gap: .15rem; }
.hero-category { position: relative; display: flex; align-items: center; gap: .55rem; padding: .25rem 0; border: 0; background: transparent; color: #fff; opacity: .55; font-size: .8rem; font-weight: 500; letter-spacing: .01em; text-align: left; white-space: nowrap; cursor: pointer; text-shadow: 0 1px 2px rgba(0, 0, 0, .55), 0 0 12px rgba(0, 0, 0, .4); transition: opacity 250ms ease, transform 250ms ease; }
.hero-category:hover { opacity: .85; }
.hero-category.active { opacity: 1; font-weight: 600; transform: translateX(3px); }
.hero-category-icon { display: inline-grid; place-items: center; width: 1rem; font-size: .8rem; opacity: .75; }
.hero-category.active .hero-category-icon { color: #F6E7B0; opacity: 1; }
.hero-slide-enter-active, .hero-slide-leave-active { transition: transform 650ms ease; }
.hero-slide-enter-from { transform: translateX(100%); }
.hero-slide-leave-to { transform: translateX(-100%); }
@media (max-width: 768px) {
  .reference-carousel { margin-top: 0; height: 700px; }
  .reference-slide-image { inset: 0; width: 100%; height: 100%; object-position: center; }
  .reference-overlay { background: transparent; }
  .reference-content { left: 1.5rem; right: 1.5rem; top: auto; bottom: 5rem; width: auto; transform: none; }
  .reference-content h1 { font-size: clamp(2.4rem, 12vw, 4rem); }
  .reference-categories { margin-top: 2rem; }
  .reference-controls { right: 1.5rem; bottom: 2.5rem; }
  .reference-status { left: 1.5rem; right: auto; bottom: 2.8rem; }
  .hero-category { font-size: .74rem; }
}
</style>
