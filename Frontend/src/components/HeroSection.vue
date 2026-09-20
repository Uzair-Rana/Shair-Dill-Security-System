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

// Click toggles playback; `isPaused` drives the overlay indicator.
const isPaused = ref(false)

const togglePlayback = () => {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    video.play().then(() => { isPaused.value = false }).catch(() => {})
  } else {
    video.pause()
    isPaused.value = true
  }
}
</script>

<template>
  <section
    class="hero-video-section"
    role="button"
    tabindex="0"
    :aria-label="isPaused ? 'Play background video' : 'Pause background video'"
    @click="togglePlayback"
    @keydown.enter.prevent="togglePlayback"
    @keydown.space.prevent="togglePlayback"
  >
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
    <Transition name="hero-badge">
      <div v-if="isPaused" class="hero-paused-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.hero-video-section {
  cursor: pointer;
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

/* Play glyph shown while the video is paused. */
.hero-paused-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: rgba(15, 23, 42, .55);
  backdrop-filter: blur(6px);
  color: #fff;
  pointer-events: none;
}
.hero-paused-badge svg { width: 38px; height: 38px; margin-left: 4px; }

.hero-badge-enter-active, .hero-badge-leave-active { transition: opacity 220ms ease, scale 220ms cubic-bezier(.22,1,.36,1); }
.hero-badge-enter-from, .hero-badge-leave-to { opacity: 0; scale: .8; }

.hero-video-section:focus-visible { outline: 3px solid #5FA8E0; outline-offset: -3px; }

@media (prefers-reduced-motion: reduce) {
  .hero-flash,
  .hero-sweep-clip {
    display: none;
  }
  .hero-badge-enter-active, .hero-badge-leave-active { transition: opacity 220ms ease; }
  .hero-badge-enter-from, .hero-badge-leave-to { scale: 1; }
}
</style>
