<script setup lang="ts">
import { ref } from 'vue'

interface OrbitImage {
  id: number
  image: string
  title: string
  angle: number
}

interface Props {
  images: OrbitImage[]
  orbitRadius?: number // in pixels
  rotationDuration?: number // in seconds
}

const props = withDefaults(defineProps<Props>(), {
  orbitRadius: 200,
  rotationDuration: 20,
})

const containerRef = ref<HTMLElement | null>(null)
</script>

<template>
  <section class="w-full bg-gradient-to-b from-white to-slate-50 py-20 md:py-28">
    <div class="max-w-[1400px] mx-auto px-5 sm:px-8">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4" style="font-family: var(--font-heading);">
          Our Integrated Solutions
        </h2>
        <p class="text-lg text-[#334155] max-w-2xl mx-auto">
          Cutting-edge security systems working in harmony
        </p>
      </div>

      <!-- Orbiting Container -->
      <div ref="containerRef" class="flex justify-center items-center min-h-[600px]">
        <div class="relative w-full max-w-[600px] aspect-square">
          <!-- Center Circle (Sun) -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 bg-gradient-to-br from-[#C5A059] to-[#A0845A] rounded-full shadow-2xl flex items-center justify-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-[#C5A059]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Orbiting Images -->
          <div
            v-for="(image, index) in images"
            :key="image.id"
            class="absolute w-full h-full"
            :style="{
              animation: `orbit ${props.rotationDuration}s linear infinite`,
              animationDelay: `${(index / images.length) * props.rotationDuration}s`,
            }"
          >
            <div
              class="absolute w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white hover:shadow-2xl transition-shadow duration-300"
              :style="{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translateY(-${props.orbitRadius}px)`,
              }"
            >
              <img
                :src="image.image"
                :alt="image.title"
                class="w-full h-full object-cover"
              />
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <p class="text-white text-xs font-semibold text-center px-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {{ image.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Text -->
      <div class="text-center mt-12">
        <p class="text-sm text-[#475569]">
          🔄 Hover over images to see details • Auto-rotating security solutions
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes orbit {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Pause animation on hover of container */
.relative:hover > div {
  animation-play-state: paused;
}

/* Smooth animation */
@media (prefers-reduced-motion: reduce) {
  @keyframes orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
}
</style>
