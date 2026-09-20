<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type CSSProperties } from 'vue'

/**
 * A horizontally curved carousel. The same geometry as the solutions ring,
 * but every part of the curve is a prop — so it can be a full 3D circle or,
 * with small values, just a gentle arc.
 */
const props = withDefaults(defineProps<{
  count: number
  /** px between neighbouring cards */
  spacing?: number
  /** px pushed back per step from the front */
  depth?: number
  /** deg each step rotates away */
  tilt?: number
  /** px each step drops, which is what reads as the curve */
  arc?: number
  /** scale lost per step */
  shrink?: number
  /** opacity lost per step */
  fade?: number
  /** how many cards each arrow press advances */
  stepBy?: number
  index?: number
  /** Show the ‹ › buttons under the track. */
  arrows?: boolean
}>(), {
  spacing: 260,
  depth: 60,
  tilt: 10,
  arc: 14,
  shrink: 0.07,
  fade: 0.22,
  stepBy: 1,
  index: 0,
  arrows: true,
})

const emit = defineEmits<{ select: [index: number]; 'update:index': [index: number] }>()

const position = ref(props.index)
const target = ref(props.index)
const dragging = ref(false)

/** Shortest signed distance from the front, wrapping around the loop. */
const delta = (index: number) => {
  const n = props.count
  if (!n) return 0
  let d = index - position.value
  d = ((d % n) + n) % n
  if (d > n / 2) d -= n
  return d
}

const activeIndex = computed(() => {
  const n = props.count
  return n ? ((Math.round(position.value) % n) + n) % n : 0
})

watch(activeIndex, (value) => emit('update:index', value))

// Let the parent drive the front card (e.g. when a tab is clicked).
watch(() => props.index, (value) => {
  if (value !== activeIndex.value) target.value = position.value + delta(value)
})

const cardStyle = (index: number): CSSProperties => {
  const d = delta(index)
  const abs = Math.abs(d)
  return {
    transform: [
      `translateX(${d * props.spacing}px)`,
      `translateY(${abs * abs * props.arc}px)`,
      `translateZ(${-abs * props.depth}px)`,
      `rotateY(${-d * props.tilt}deg)`,
      `scale(${Math.max(0.4, 1 - abs * props.shrink)})`,
    ].join(' '),
    opacity: String(Math.max(0, 1 - abs * props.fade)),
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
  // Horizontal intent only — claiming vertical wheel would trap page scroll.
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
  target.value = dragStartTarget - dx / props.spacing
}

const onPointerUp = () => {
  if (!dragging.value) return
  dragging.value = false
  target.value = Math.round(target.value)
}

const step = (direction: number) => {
  target.value = Math.round(target.value) + direction * props.stepBy
}

const onCardClick = (index: number) => {
  if (dragDistance > 6) return
  if (index === activeIndex.value) emit('select', index)
  else target.value = position.value + delta(index)
}

defineExpose({ step })

onMounted(() => { raf = requestAnimationFrame(loop) })
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (snapTimer) clearTimeout(snapTimer)
})
</script>

<template>
  <div class="cc">
    <div
      class="cc-stage"
      :class="{ dragging }"
      role="group"
      tabindex="0"
      @wheel="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown.left.prevent="step(-1)"
      @keydown.right.prevent="step(1)"
    >
      <div
        v-for="i in count"
        :key="i - 1"
        class="cc-slot"
        :style="cardStyle(i - 1)"
        @click="onCardClick(i - 1)"
      >
        <slot name="card" :index="i - 1" :active="i - 1 === activeIndex" />
      </div>
    </div>

    <div v-if="arrows || $slots.controls" class="cc-controls">
      <button v-if="arrows" type="button" aria-label="Previous" @click="step(-1)">‹</button>
      <slot name="controls" :active="activeIndex" />
      <button v-if="arrows" type="button" aria-label="Next" @click="step(1)">›</button>
    </div>
  </div>
</template>

<style scoped>
.cc-stage {
  position: relative;
  height: var(--cc-height, 400px);
  perspective: var(--cc-perspective, 1800px);
  perspective-origin: 50% 42%;
  transform-style: preserve-3d;
  touch-action: pan-y;
  cursor: grab;
  outline: none;
  overflow: hidden;
}
.cc-stage.dragging { cursor: grabbing; }
.cc-stage:focus-visible { outline: 3px solid #5FA8E0; outline-offset: 4px; border-radius: 18px; }

.cc-slot {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--cc-card-w, 260px);
  margin-left: calc(var(--cc-card-w, 260px) / -2);
  transform-style: preserve-3d;
  will-change: transform, opacity;
  user-select: none;
}

.cc-controls { display: flex; align-items: center; justify-content: center; gap: 1.25rem; margin-top: 1.25rem; }
.cc-controls > button { width: 42px; height: 42px; border: 1px solid #dee2e6; border-radius: 50%; background: #fff; color: #475569; font-size: 1.35rem; line-height: 1; cursor: pointer; transition: border-color 180ms ease, color 180ms ease, transform 220ms cubic-bezier(.22,1,.36,1); flex-shrink: 0; }
.cc-controls > button:hover { border-color: #1676d2; color: #1676d2; transform: translateY(-2px); }

@media (prefers-reduced-motion: reduce) {
  .cc-controls > button:hover { transform: none; }
}
</style>
