<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, type CSSProperties } from 'vue'
import { priceLabel, type Product } from '../data/products'

const props = defineProps<{ items: Product[] }>()
const emit = defineEmits<{ select: [id: string] }>()

/* ── Ring geometry ────────────────────────────────────────────
   Cards sit on a horizontal circle. `position` is a continuous index:
   2.5 means halfway between card 2 and card 3. Distance from the front
   drives X offset, depth, rotation, scale and fade, so the card at the
   front reads largest and the ones furthest round the ring the smallest. */
const SPACING = 210      // px between neighbouring cards
const DEPTH = 190        // px pushed back per step away from front
const TILT = 34          // deg each step rotates away from the viewer
const SHRINK = 0.16      // scale lost per step
const FADE = 0.26        // opacity lost per step

const position = ref(0)
const target = ref(0)
const dragging = ref(false)

const count = computed(() => props.items.length)

/** Shortest signed distance from the front, wrapping around the ring. */
const ringDelta = (index: number) => {
  const n = count.value
  if (!n) return 0
  let d = index - position.value
  d = ((d % n) + n) % n
  if (d > n / 2) d -= n
  return d
}

const activeIndex = computed(() => {
  const n = count.value
  return n ? ((Math.round(position.value) % n) + n) % n : 0
})

const cardStyle = (index: number): CSSProperties => {
  const d = ringDelta(index)
  const abs = Math.abs(d)
  return {
    transform: `translateX(${d * SPACING}px) translateZ(${-abs * DEPTH}px) rotateY(${-d * TILT}deg) scale(${Math.max(0.35, 1 - abs * SHRINK)})`,
    opacity: String(Math.max(0, 1 - abs * FADE)),
    zIndex: String(1000 - Math.round(abs * 100)),
    pointerEvents: abs < 0.5 ? 'auto' : 'none',
  }
}

/* ── Motion ───────────────────────────────────────────────── */
let raf = 0
let snapTimer: ReturnType<typeof setTimeout> | null = null

const loop = () => {
  position.value += (target.value - position.value) * 0.12
  if (Math.abs(target.value - position.value) < 0.0005) position.value = target.value
  raf = requestAnimationFrame(loop)
}

const scheduleSnap = () => {
  if (snapTimer) clearTimeout(snapTimer)
  snapTimer = setTimeout(() => { target.value = Math.round(target.value) }, 140)
}

const onWheel = (event: WheelEvent) => {
  // Only horizontal intent turns the ring. Claiming vertical wheel too would
  // trap the page: you could never scroll past the carousel with a mouse.
  if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
  event.preventDefault()
  target.value += event.deltaX / 260
  scheduleSnap()
}

let dragStartX = 0
let dragStartTarget = 0
let dragDistance = 0

const onPointerDown = (event: PointerEvent) => {
  dragging.value = true
  dragStartX = event.clientX
  dragStartTarget = target.value
  dragDistance = 0
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

const onPointerMove = (event: PointerEvent) => {
  if (!dragging.value) return
  const dx = event.clientX - dragStartX
  dragDistance = Math.max(dragDistance, Math.abs(dx))
  target.value = dragStartTarget - dx / SPACING
}

const onPointerUp = () => {
  if (!dragging.value) return
  dragging.value = false
  target.value = Math.round(target.value)
}

const step = (direction: number) => { target.value = Math.round(target.value) + direction }

/** Clicking a side card brings it to the front; the front card opens. */
const onCardClick = (index: number) => {
  if (dragDistance > 6) return
  if (index === activeIndex.value) emit('select', props.items[index]!.id)
  else target.value = position.value + ringDelta(index)
}

onMounted(() => { raf = requestAnimationFrame(loop) })
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (snapTimer) clearTimeout(snapTimer)
})
</script>

<template>
  <div class="cf">
    <div
      class="cf-stage"
      :class="{ dragging }"
      role="group"
      aria-label="Security solutions carousel"
      tabindex="0"
      @wheel="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown.left.prevent="step(-1)"
      @keydown.right.prevent="step(1)"
    >
      <article
        v-for="(item, i) in items"
        :key="item.id"
        class="cf-card"
        :class="{ active: i === activeIndex }"
        :style="cardStyle(i)"
        :aria-hidden="i !== activeIndex"
        @click="onCardClick(i)"
      >
        <div class="cf-media">
          <img :src="item.image" :alt="item.title" draggable="false" loading="lazy" />
        </div>
        <div class="cf-body">
          <p class="cf-category">{{ item.category }}</p>
          <h3>{{ item.title }}</h3>
          <p class="cf-price">{{ priceLabel(item) }}</p>
          <span class="cf-more">View details →</span>
        </div>
      </article>
    </div>

    <div class="cf-controls">
      <button type="button" aria-label="Previous solution" @click="step(-1)">‹</button>
      <div class="cf-dots">
        <button
          v-for="(item, i) in items"
          :key="item.id"
          type="button"
          class="cf-dot"
          :class="{ on: i === activeIndex }"
          :aria-label="`Show ${item.title}`"
          @click="target = position + ringDelta(i)"
        />
      </div>
      <button type="button" aria-label="Next solution" @click="step(1)">›</button>
    </div>

    <p class="cf-hint">Scroll, drag or use the arrows to turn the carousel</p>
  </div>
</template>

<style scoped>
.cf { --card-w: 300px; }

.cf-stage {
  position: relative;
  height: 430px;
  perspective: 1500px;
  perspective-origin: 50% 45%;
  transform-style: preserve-3d;
  touch-action: pan-y;
  cursor: grab;
  outline: none;
  overflow: hidden;
}
.cf-stage.dragging { cursor: grabbing; }
.cf-stage:focus-visible { outline: 3px solid #5FA8E0; outline-offset: 4px; border-radius: 18px; }

.cf-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--card-w);
  margin-left: calc(var(--card-w) / -2);
  background: #fff;
  border: 1px solid #e8ecf1;
  border-radius: 18px;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  user-select: none;
  box-shadow: 0 10px 30px rgba(15, 23, 42, .07);
}
.cf-card.active { cursor: pointer; border-color: #d6e4f2; box-shadow: 0 26px 56px rgba(15, 23, 42, .16); }

.cf-media { display: flex; align-items: center; justify-content: center; aspect-ratio: 4/3; padding: 1.5rem; background: #fff; border-bottom: 1px solid #f1f5f9; }
.cf-media img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; -webkit-user-drag: none; }

.cf-body { padding: 1.1rem 1.35rem 1.4rem; text-align: left; }
.cf-category { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #1676d2; margin-bottom: .45rem; }
.cf-body h3 { font-size: 1.0625rem; font-weight: 700; letter-spacing: -.01em; color: #0f172a; line-height: 1.3; margin-bottom: .5rem; }
.cf-price { font-size: .9375rem; font-weight: 700; color: #475569; margin-bottom: .6rem; }
.cf-more { font-size: .8125rem; font-weight: 700; color: #1676d2; opacity: 0; transition: opacity 260ms ease; }
.cf-card.active .cf-more { opacity: 1; }

.cf-controls { display: flex; align-items: center; justify-content: center; gap: 1.25rem; margin-top: 1.5rem; }
.cf-controls > button { width: 42px; height: 42px; border: 1px solid #dee2e6; border-radius: 50%; background: #fff; color: #475569; font-size: 1.35rem; line-height: 1; cursor: pointer; transition: border-color 180ms ease, color 180ms ease, transform 220ms cubic-bezier(.22,1,.36,1); }
.cf-controls > button:hover { border-color: #1676d2; color: #1676d2; transform: translateY(-2px); }

.cf-dots { display: flex; align-items: center; gap: .5rem; }
.cf-dot { width: 8px; height: 8px; padding: 0; border: none; border-radius: 50%; background: #cbd5e1; cursor: pointer; transition: background 220ms ease, width 220ms ease; }
.cf-dot.on { width: 22px; border-radius: 999px; background: #1676d2; }

.cf-hint { margin-top: 1rem; text-align: center; font-size: .8125rem; color: #94a3b8; }

@media (max-width: 720px) {
  .cf { --card-w: 240px; }
  .cf-stage { height: 390px; }
}

@media (prefers-reduced-motion: reduce) {
  .cf-controls > button:hover { transform: none; }
}
</style>
