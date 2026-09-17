<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface CarouselCard {
  image: string
  imageAlt?: string
  label: string
  heading: string
  description: string
  ctaText: string
}

interface Props {
  variant?: 'blue' | 'white'
  cards: CarouselCard[]
}
const props = withDefaults(defineProps<Props>(), { variant: 'white' })
const emit  = defineEmits<{ cta: [index: number] }>()

const trackRef    = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

// ── Scroll to a specific card index ──────────────────────────────────────────
const scrollToCard = (index: number) => {
  const track = trackRef.value
  if (!track) return
  const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'))
  const card  = cards[index]
  if (!card) return
  // Centre the card inside the scrollable track
  const offset = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
  track.scrollTo({ left: offset, behavior: 'smooth' })
  activeIndex.value = index
}

const prev = () => scrollToCard(Math.max(0, activeIndex.value - 1))
const next = () => scrollToCard(Math.min(props.cards.length - 1, activeIndex.value + 1))

// ── Sync active dot after native / touch scroll ───────────────────────────────
let scrollTimer: ReturnType<typeof setTimeout>
const onScroll = () => {
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    const track = trackRef.value
    if (!track) return
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'))
    const centre = track.scrollLeft + track.clientWidth / 2
    let closest = 0, minDist = Infinity
    cards.forEach((c, i) => {
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centre)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    activeIndex.value = closest
  }, 50)
}

// ── Mouse drag ────────────────────────────────────────────────────────────────
let dragging = false, startX = 0, scrollStart = 0

const onMouseDown = (e: MouseEvent) => {
  const t = trackRef.value; if (!t) return
  dragging = true; startX = e.pageX; scrollStart = t.scrollLeft
  t.style.cursor    = 'grabbing'
  t.style.userSelect = 'none'
}
const onMouseMove = (e: MouseEvent) => {
  if (!dragging || !trackRef.value) return
  e.preventDefault()
  trackRef.value.scrollLeft = scrollStart - (e.pageX - startX)
}
const stopDrag = () => {
  dragging = false
  if (!trackRef.value) return
  trackRef.value.style.cursor     = ''
  trackRef.value.style.userSelect = ''
}

onMounted(() => {
  window.addEventListener('mouseup',    stopDrag)
  window.addEventListener('mousemove',  onMouseMove as EventListener)
  // Start centred on first card after paint
  requestAnimationFrame(() => scrollToCard(0))
})
onUnmounted(() => {
  window.removeEventListener('mouseup',   stopDrag)
  window.removeEventListener('mousemove', onMouseMove as EventListener)
})
</script>

<template>
  <!--
    Apple.com hero promo rail:
    ─ section bg: #F5F5F7 (Apple grey) so peeking card edges show clearly
    ─ cards: ~85 vw wide, landscape 16/9, fully clipped left & right
    ─ all content overlaid on the image (gradient scrim at bottom)
    ─ CTA: solid white pill button bottom-left, bold category+description inline
    ─ arrows: float at vertical mid-point of image, outside the card
    ─ dots: tiny pills below, centred
  -->
  <section class="relative bg-[#F5F5F7] py-8 md:py-10 overflow-hidden select-none">

    <!-- ── Scrollable track — fills full width, clips overflow ── -->
    <div
      ref="trackRef"
      class="apple-track overflow-x-scroll flex items-stretch"
      style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;"
      @scroll="onScroll"
      @mousedown="onMouseDown"
    >
      <!-- Padding item left so first card appears centred -->
      <div class="flex-shrink-0" style="width: clamp(20px, 7.5vw, 120px);" aria-hidden="true" />

      <!-- Cards -->
      <div
        v-for="(card, i) in cards"
        :key="i"
        data-card
        class="flex-shrink-0 relative overflow-hidden"
        style="
          scroll-snap-align: center;
          width: min(85vw, 1000px);
          border-radius: 18px;
          margin-right: clamp(12px, 2vw, 20px);
          aspect-ratio: 16 / 9;
          cursor: grab;
        "
      >
        <!-- Full-bleed image -->
        <img
          :src="card.image"
          :alt="card.imageAlt || card.label"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable="false"
        />

        <!-- Gradient scrim — strong at bottom for text legibility -->
        <div class="absolute inset-0 pointer-events-none"
          style="background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 40%, transparent 70%);"
        />

        <!-- Content overlay — sits at bottom of card -->
        <div class="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-8 md:pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div class="max-w-[560px]">
            <!-- Category · description row — identical to Apple's bold-label format -->
            <p class="text-white text-[14px] md:text-[16px] leading-snug mb-3">
              <strong class="font-bold">{{ card.label }}</strong>
              <span class="opacity-80"> · {{ card.description }}</span>
            </p>
          </div>
          <!-- CTA pill — solid white exactly like "Stream now" -->
          <button
            @click.stop="emit('cta', i)"
            class="flex-shrink-0 inline-flex items-center justify-center bg-white text-[#1D1D1F] font-semibold text-[14px] md:text-[15px] rounded-full px-6 py-2.5 hover:bg-white/90 active:scale-[0.97] transition-all duration-150 shadow-sm whitespace-nowrap"
          >
            {{ card.ctaText }}
          </button>
        </div>
      </div>

      <!-- Padding item right -->
      <div class="flex-shrink-0" style="width: clamp(20px, 7.5vw, 120px);" aria-hidden="true" />
    </div>

    <!-- ── Arrow buttons — float over the side padding, vertically centred ── -->
    <button
      @click="prev"
      :disabled="activeIndex === 0"
      class="apple-arrow left-[max(8px,calc(7.5vw/2-22px))] hidden md:flex"
      aria-label="Previous"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
      </svg>
    </button>
    <button
      @click="next"
      :disabled="activeIndex === cards.length - 1"
      class="apple-arrow right-[max(8px,calc(7.5vw/2-22px))] hidden md:flex"
      aria-label="Next"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
      </svg>
    </button>

    <!-- ── Dot indicators ── -->
    <div class="flex items-center justify-center gap-[6px] mt-5">
      <button
        v-for="(_, i) in cards"
        :key="i"
        @click="scrollToCard(i)"
        :aria-label="`Go to slide ${i + 1}`"
        class="rounded-full transition-all duration-300 focus:outline-none"
        :class="[
          i === activeIndex
            ? 'w-[18px] h-[5px] bg-[#1D1D1F]'
            : 'w-[5px]   h-[5px] bg-[#C7C7CC] hover:bg-[#6E6E73]',
        ]"
      />
    </div>

  </section>
</template>

<style scoped>
/* Hide scrollbar on all browsers */
.apple-track                      { scrollbar-width: none; }
.apple-track::-webkit-scrollbar   { display: none; }

/* Floating arrow buttons */
.apple-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* subtract dot-row height so it's centred on the image area */
  margin-top: -20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: none;
  color: #1D1D1F;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.14);
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, opacity 0.2s;
  z-index: 10;
}
.apple-arrow:hover   { background: rgba(255, 255, 255, 1); }
.apple-arrow:active  { transform: translateY(-50%) scale(0.94); }
.apple-arrow:disabled{ opacity: 0.25; cursor: default; }
</style>
