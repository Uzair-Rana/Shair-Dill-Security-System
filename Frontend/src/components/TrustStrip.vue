<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  /** 'blue' = sky-blue bg + white text | 'white' = white bg + dark text */
  variant?: 'blue' | 'white'
  image: string
}
withDefaults(defineProps<Props>(), { variant: 'blue' })

const contentRef = ref<HTMLElement | null>(null)
useScrollReveal(contentRef, { threshold: 0.15 })
</script>

<template>
  <section :class="['relative overflow-hidden min-h-[460px] md:min-h-[540px] flex items-center', variant === 'blue' ? 'bg-[#5FA8E0]' : 'bg-white']">

    <div class="absolute inset-0 pointer-events-none">
      <img :src="image" alt="" class="w-full h-full object-cover object-center opacity-20" loading="lazy" />
    </div>
    <div :class="['absolute inset-0 pointer-events-none', variant === 'blue' ? 'bg-gradient-to-r from-[#2E86D8]/40 via-transparent to-[#2E86D8]/40' : 'bg-gradient-to-r from-white/80 via-white/40 to-white/80']" />

    <div class="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-20 text-center">
      <div ref="contentRef" class="reveal-up">

        <p :class="['text-[12px] font-semibold uppercase tracking-[0.18em] mb-5', variant === 'blue' ? 'text-white/80' : 'text-[#5FA8E0]']">
          Trusted Since 2009
        </p>

        <h2 :class="['text-[clamp(2.25rem,6vw,3.75rem)] font-black leading-[1.04] tracking-[-0.02em] mb-6', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">
          500+ satisfied clients.<br />
          <span :class="variant === 'blue' ? 'text-[#E8F1FA]' : 'text-[#5FA8E0]'">One constant.</span>
        </h2>

        <p :class="['text-[17px] max-w-[500px] mx-auto mb-12 font-light leading-relaxed', variant === 'blue' ? 'text-white/75' : 'text-[#6E6E73]']">
          From a single camera to a full guarding deployment — the same uncompromising standard.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          <div v-for="s in [
            { n: '10+',  l: 'Years in operation' },
            { n: '250+', l: 'Guards deployed' },
            { n: '500+', l: 'Projects completed' },
          ]" :key="s.n" class="text-center">
            <div :class="['text-[2rem] md:text-[2.5rem] font-black leading-none', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">{{ s.n }}</div>
            <div :class="['text-[11px] mt-2 font-medium tracking-wide uppercase', variant === 'blue' ? 'text-white/65' : 'text-[#6E6E73]']">{{ s.l }}</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
