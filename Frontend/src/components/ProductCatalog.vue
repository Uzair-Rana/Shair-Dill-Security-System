<script setup lang="ts">
import { ref } from 'vue'
import { useChildReveal } from '../composables/useScrollReveal'

interface Product {
  name: string; price: string; tag?: string; image?: string; spec?: string
}
interface Props {
  /** 'blue' = sky-blue bg + white text | 'white' = white bg + dark text */
  variant?: 'blue' | 'white'
  eyebrow?: string
  headline: string
  products: Product[]
  bgImage?: string
}
withDefaults(defineProps<Props>(), { variant: 'white', eyebrow: '', bgImage: '' })
defineEmits<{ addToCart: [product: Product]; viewAll: [] }>()

const gridRef = ref<HTMLElement | null>(null)
useChildReveal(gridRef, { threshold: 0.04 })
</script>

<template>
  <section :class="['relative overflow-hidden', variant === 'blue' ? 'bg-[#5FA8E0]' : 'bg-white']">

    <div v-if="bgImage" class="absolute inset-0 pointer-events-none">
      <img :src="bgImage" alt="" class="w-full h-full object-cover opacity-[0.12]" />
    </div>

    <div class="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-16 md:py-24">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
        <div>
          <p v-if="eyebrow" :class="['text-[13px] font-semibold mb-2', variant === 'blue' ? 'text-white/80' : 'text-[#5FA8E0]']">{{ eyebrow }}</p>
          <h2 :class="['text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight tracking-[-0.02em]', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">
            {{ headline }}
          </h2>
        </div>
        <button
          @click="$emit('viewAll')"
          :class="[
            'inline-flex items-center gap-1.5 text-[14px] font-semibold rounded-full px-5 py-2.5 transition-all active:scale-[0.97] flex-shrink-0 self-start sm:self-end',
            variant === 'blue'
              ? 'bg-white text-[#5FA8E0] hover:bg-[#E8F1FA] shadow-sm'
              : 'border border-[#5FA8E0] text-[#5FA8E0] hover:bg-[#E8F1FA]',
          ]"
        >
          Shop all products
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </button>
      </div>

      <!-- Product grid — cards are always white regardless of section variant -->
      <div ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          v-for="(p, i) in products" :key="i"
          :data-reveal="true"
          :class="[
            'reveal-up product-lift group flex flex-col rounded-2xl overflow-hidden bg-white',
            variant === 'blue' ? 'border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.12)]' : 'border border-[#C5DEF5] shadow-[0_2px_12px_rgba(95,168,224,0.08)]',
            `delay-${Math.min(i % 4, 3) * 100}`,
          ]"
        >
          <!-- Image -->
          <div class="relative overflow-hidden flex items-center justify-center p-5 bg-[#E8F1FA]" style="aspect-ratio:1/1;">
            <span v-if="p.tag" :class="[
              'absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full z-10 text-white',
              p.tag === 'Sale'                         ? 'bg-red-500'
              : p.tag === 'Best Seller'                ? 'bg-[#5FA8E0]'
              : p.tag === 'New'                        ? 'bg-[#2E86D8]'
              : p.tag === 'Premium' || p.tag === 'Pro' ? 'bg-[#1D1D1F]'
              :                                          'bg-[#E8F1FA] !text-[#1D1D1F]',
            ]">{{ p.tag }}</span>
            <img v-if="p.image" :src="p.image" :alt="p.name" loading="lazy"
              class="w-full h-full object-contain group-hover:scale-[1.05] transition-transform duration-500 ease-out" />
            <div v-else class="w-16 h-16 rounded-2xl bg-white border border-[#C5DEF5] flex items-center justify-center text-[#5FA8E0]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
              </svg>
            </div>
          </div>
          <!-- Body -->
          <div class="flex flex-col flex-1 p-5">
            <h4 class="text-[14px] font-semibold leading-snug mb-1 text-[#1D1D1F]">{{ p.name }}</h4>
            <p v-if="p.spec" class="text-[12px] leading-snug mb-2 text-[#6E6E73]">{{ p.spec }}</p>
            <p class="text-[14px] font-semibold mt-auto mb-4 text-[#1D1D1F]">{{ p.price }}</p>
            <div class="flex items-center gap-2">
              <button @click.stop="$emit('addToCart', p)"
                class="flex-1 bg-[#5FA8E0] text-white text-[13px] font-semibold rounded-full py-2 hover:bg-[#2E86D8] active:scale-[0.97] transition-all duration-150 shadow-sm">
                Buy
              </button>
              <button class="flex-1 border border-[#5FA8E0] text-[#5FA8E0] text-[13px] font-semibold rounded-full py-2 hover:bg-[#E8F1FA] active:scale-[0.97] transition-all duration-150">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
