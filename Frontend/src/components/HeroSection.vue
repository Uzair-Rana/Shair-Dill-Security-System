<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import heroVideo from '../assets/products/1.mp4'

const videoRef = ref<HTMLVideoElement | null>(null)
const flashRef = ref<HTMLElement | null>(null)
const sweepRef = ref<HTMLElement | null>(null)

// The transition starts LEAD_SECONDS before the video ends and peaks exactly on
// the loop boundary, so the decoder's keyframe re-seek happens behind the glare.
const LEAD_SECONDS = 0.28
const FLASH_MS = 820
const BLOOM_OPACITY = 0.58
const ZOOM_PUNCH = 1.035

// Where the loop boundary falls on the animation timeline (0..1).
const peak = (LEAD_SECONDS * 1000) / FLASH_MS

let rafId = 0
let armed = true

const fireFlash = () => {
  // Soft bloom: lifts the whole frame so the streak has something to sit on.
  flashRef.value?.animate(
    [{ opacity: 0 }, { opacity: BLOOM_OPACITY, offset: peak }, { opacity: 0 }],
    { duration: FLASH_MS, easing: 'ease-out' },
  )

  // Glare streak: rakes diagonally across, centred on the boundary.
  sweepRef.value?.animate(
    [
      { transform: 'translateX(-165%) skewX(-12deg)', opacity: 0 },
      { transform: 'translateX(0%) skewX(-12deg)', opacity: 1, offset: peak },
      { transform: 'translateX(165%) skewX(-12deg)', opacity: 0 },
    ],
    { duration: FLASH_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  )

  // Tiny push-in so the cut has weight rather than just brightness.
  videoRef.value?.animate(
    [
      { transform: 'scale(1)' },
      { transform: `scale(${ZOOM_PUNCH})`, offset: peak },
      { transform: 'scale(1)' },
    ],
    { duration: FLASH_MS, easing: 'ease-in-out' },
  )
}

const tick = () => {
  const video = videoRef.value
  if (video && Number.isFinite(video.duration) && video.duration > 0) {
    const remaining = video.duration - video.currentTime
    if (armed && remaining <= LEAD_SECONDS) {
      armed = false
      fireFlash()
    } else if (!armed && video.currentTime < LEAD_SECONDS) {
      // playhead wrapped back to the start — ready for the next loop
      armed = true
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
})

const onMouseEnter = () => {
  videoRef.value?.pause()
}

const onMouseLeave = () => {
  videoRef.value?.play().catch(() => {})
}
</script>

<template>
  <section class="hero-video-section" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <video
      ref="videoRef"
      :src="heroVideo"
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
    ></video>
    <div ref="flashRef" class="hero-flash" aria-hidden="true"></div>
    <div class="hero-sweep-clip" aria-hidden="true">
      <div ref="sweepRef" class="hero-sweep"></div>
    </div>
  </section>
</template>

<style scoped>
.hero-video-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-flash {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, #fff 0%, rgba(255, 255, 255, 0.72) 55%, rgba(255, 255, 255, 0.45) 100%);
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
}

.hero-sweep-clip {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Oversized vertically so the skewed edges never clip into frame. */
.hero-sweep {
  position: absolute;
  top: -30%;
  bottom: -30%;
  left: 0;
  right: 0;
  opacity: 0;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 36%,
    rgba(255, 255, 255, 0.35) 44%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(255, 255, 255, 0.35) 56%,
    rgba(255, 255, 255, 0) 64%
  );
  filter: blur(18px);
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .hero-flash,
  .hero-sweep-clip {
    display: none;
  }
}
</style>
