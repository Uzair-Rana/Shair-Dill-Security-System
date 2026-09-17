<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  /** 'blue' = sky-blue bg + white text | 'white' = white bg + dark text */
  variant?: 'blue' | 'white'
  imagePosition?: 'left' | 'right'
  eyebrow?: string
  headline: string
  description: string
  learnMoreLabel?: string
  image: string
  imageAlt?: string
  bgImage?: string
}
withDefaults(defineProps<Props>(), {
  variant: 'white',
  imagePosition: 'right',
  eyebrow: '',
  learnMoreLabel: 'Learn more',
  imageAlt: '',
  bgImage: '',
})

defineEmits<{ cta: [] }>()

const textRef = ref<HTMLElement | null>(null)
const imgRef  = ref<HTMLElement | null>(null)
useScrollReveal(textRef, { threshold: 0.15 })
useScrollReveal(imgRef,  { threshold: 0.12 })
</script>

<template>
  <section :class="['relative overflow-hidden', variant === 'blue' ? 'bg-[#5FA8E0]' : 'bg-white']">

    <!-- Optional low-opacity background texture -->
    <div v-if="bgImage" class="absolute inset-0 pointer-events-none">
      <img :src="bgImage" alt="" class="w-full h-full object-cover opacity-[0.15]" />
    </div>

    <div class="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-20 md:py-28 lg:py-32">
      <div :class="['grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center', imagePosition === 'left' ? 'lg:grid-flow-dense' : '']">

        <!-- Image -->
        <div ref="imgRef" :class="['reveal-scale', imagePosition === 'left' ? 'lg:col-start-1' : '']">
          <div :class="['relative rounded-3xl overflow-hidden aspect-[4/3]', variant === 'blue' ? 'border border-white/25 shadow-[0_20px_56px_-12px_rgba(0,0,0,0.2)]' : 'border border-[#C5DEF5] shadow-[0_20px_56px_-12px_rgba(95,168,224,0.18)]']">
            <img :src="image" :alt="imageAlt" loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
          </div>
        </div>

        <!-- Text -->
        <div ref="textRef" :class="[imagePosition === 'left' ? 'lg:col-start-2 reveal-right' : 'reveal-left']">
          <p v-if="eyebrow" :class="['text-[13px] font-semibold mb-4 tracking-normal', variant === 'blue' ? 'text-white/80' : 'text-[#5FA8E0]']">
            {{ eyebrow }}
          </p>
          <h2 :class="['text-[clamp(2.25rem,5.5vw,3.5rem)] font-black leading-[1.06] tracking-[-0.025em] mb-6 whitespace-pre-line', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">
            {{ headline }}
          </h2>
          <p :class="['text-[17px] leading-relaxed mb-8 max-w-[440px]', variant === 'blue' ? 'text-white/75' : 'text-[#6E6E73]']">
            {{ description }}
          </p>
          <button
            @click="$emit('cta')"
            :class="[
              'inline-flex items-center gap-2 text-[17px] font-semibold rounded-full px-6 py-2.5 transition-all duration-200 active:scale-[0.97]',
              variant === 'blue'
                ? 'bg-white text-[#5FA8E0] hover:bg-[#E8F1FA]'
                : 'border border-[#5FA8E0] text-[#5FA8E0] hover:bg-[#E8F1FA]',
            ]"
          >
            {{ learnMoreLabel }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>
