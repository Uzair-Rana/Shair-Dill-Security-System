<script setup lang="ts">
import { ref } from 'vue'
import { useChildReveal } from '../composables/useScrollReveal'

interface Feature { icon: string; title: string; description: string }
interface Props {
  /** 'blue' = sky-blue bg + white text | 'white' = white bg + dark text */
  variant?: 'blue' | 'white'
  eyebrow?: string
  headline: string
  features: Feature[]
  bgImage?: string
}
withDefaults(defineProps<Props>(), { variant: 'blue', eyebrow: '', bgImage: '' })

const gridRef = ref<HTMLElement | null>(null)
useChildReveal(gridRef, { threshold: 0.06 })
</script>

<template>
  <section :class="['relative overflow-hidden', variant === 'blue' ? 'bg-[#5FA8E0]' : 'bg-white']">

    <div v-if="bgImage" class="absolute inset-0 pointer-events-none">
      <img :src="bgImage" alt="" class="w-full h-full object-cover opacity-[0.15]" />
    </div>

    <div class="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-20 md:py-28">

      <div class="text-center mb-14 md:mb-16">
        <p v-if="eyebrow" :class="['text-[13px] font-semibold mb-3', variant === 'blue' ? 'text-white/80' : 'text-[#5FA8E0]']">{{ eyebrow }}</p>
        <h2 :class="['text-[clamp(2rem,5vw,2.75rem)] font-black leading-tight tracking-[-0.02em]', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">
          {{ headline }}
        </h2>
      </div>

      <div ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(f, i) in features" :key="i"
          :data-reveal="true"
          :class="[
            'reveal-up group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1',
            variant === 'blue'
              ? 'bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/25 shadow-[0_2px_12px_rgba(0,0,0,0.1)]'
              : 'bg-white border border-[#C5DEF5] shadow-[0_2px_12px_rgba(95,168,224,0.08)] hover:shadow-[0_8px_24px_rgba(95,168,224,0.16)]',
            `delay-${(i % 4) * 100}`,
          ]"
        >
          <div :class="['w-11 h-11 rounded-full flex items-center justify-center mb-5', variant === 'blue' ? 'bg-white/20 border border-white/30 text-white' : 'bg-[#E8F1FA] border border-[#C5DEF5] text-[#5FA8E0]']"
            v-html="f.icon"
          />
          <h3 :class="['text-[15px] font-semibold mb-1.5 leading-snug', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">{{ f.title }}</h3>
          <p :class="['text-[13px] leading-relaxed', variant === 'blue' ? 'text-white/70' : 'text-[#6E6E73]']">{{ f.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
