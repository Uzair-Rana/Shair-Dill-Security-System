<script setup lang="ts">
import { ref } from 'vue'
import heroVideo from '../assets/products/1.mp4'

const videoRef = ref<HTMLVideoElement | null>(null)
const isHovering = ref(false)
let restartTimer: ReturnType<typeof setTimeout> | null = null

const onEnded = () => {
  if (restartTimer) clearTimeout(restartTimer)
  restartTimer = setTimeout(() => {
    if (isHovering.value) return
    const video = videoRef.value
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
  }, 2000)
}

const onMouseEnter = () => {
  isHovering.value = true
  videoRef.value?.pause()
}

const onMouseLeave = () => {
  isHovering.value = false
  if (restartTimer) return
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
      playsinline
      @ended="onEnded"
    ></video>
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
</style>
