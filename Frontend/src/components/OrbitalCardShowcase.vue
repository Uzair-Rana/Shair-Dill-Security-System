<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Card {
  id: number
  image: string
  title: string
  label: string
}

interface Props {
  cards: Card[]
  radius?: number
  rotationSpeed?: number // degrees per second
}

const props = withDefaults(defineProps<Props>(), {
  radius: 250,
  rotationSpeed: 20,
})

const rotation = ref(0)
const isHovering = ref(false)
const selectedCardId = ref<number | null>(null)
let animationId: number | null = null
let lastTime = Date.now()

const prefersReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const cardPositions = computed(() => {
  const cards = props.cards
  const angleStep = 360 / cards.length

  return cards.map((card, index) => {
    const angle = (angleStep * index + rotation.value) % 360
    const rad = (angle * Math.PI) / 180

    const x = Math.cos(rad) * props.radius
    const y = Math.sin(rad) * props.radius

    // Calculate scale and opacity based on position (3D depth effect)
    // Cards at the bottom (closer to viewer) are larger and more opaque
    // Cards at the sides/top are smaller and faded
    const distanceFromBottom = Math.abs(y - props.radius) / (2 * props.radius)
    const scale = 0.75 + 0.25 * (1 - distanceFromBottom)
    const opacity = 0.6 + 0.4 * (1 - distanceFromBottom)

    return {
      id: card.id,
      angle,
      x,
      y,
      scale,
      opacity,
      zIndex: Math.floor(opacity * 100),
    }
  })
})

const getCardPosition = (index: number) => cardPositions.value[index] ?? {
  x: 0,
  y: 0,
  scale: 1,
  opacity: 0,
  zIndex: 0,
}

const animate = () => {
  const currentTime = Date.now()
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  // Apply easing when hovering for smooth pause/resume
  if (isHovering.value) {
    // Keep update but don't increment rotation
    animationId = requestAnimationFrame(animate)
    return
  }

  if (prefersReducedMotion.value) {
    animationId = requestAnimationFrame(animate)
    return
  }

  // Smooth rotation increment with clamped delta time for consistency
  const clampedDelta = Math.min(deltaTime, 0.016) // Cap at 60fps
  rotation.value = (rotation.value + props.rotationSpeed * clampedDelta) % 360

  animationId = requestAnimationFrame(animate)
}

const bringCardToFront = (cardId: number) => {
  selectedCardId.value = cardId
  const cardIndex = props.cards.findIndex((c) => c.id === cardId)
  if (cardIndex !== -1) {
    const angleStep = 360 / props.cards.length
    const targetAngle = angleStep * cardIndex
    rotation.value = (360 - targetAngle) % 360
  }
}

onMounted(() => {
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <section class="orbital-showcase">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Featured Solutions</h2>
        <p class="section-subtitle">
          Explore our security products and services
        </p>
      </div>

      <!-- Orbital Container -->
      <div
        class="orbital-container"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
      >
        <!-- Center Glow -->
        <div class="center-glow">
          <div class="glow-inner"></div>
        </div>

        <!-- Cards Orbit -->
        <div
          v-for="(card, index) in props.cards"
          :key="card.id"
          class="card-orbit-item"
          :style="{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${getCardPosition(index).x}px), calc(-50% + ${getCardPosition(index).y}px)) scale(${getCardPosition(index).scale})`,
            opacity: getCardPosition(index).opacity,
            zIndex: getCardPosition(index).zIndex,
          }"
          @click="bringCardToFront(card.id)"
        >
          <!-- Card -->
          <div class="card">
            <!-- Image -->
            <div class="card-image">
              <img :src="card.image" :alt="card.title" />
            </div>

            <!-- Content -->
            <div class="card-content">
              <span class="card-label">{{ card.label }}</span>
              <h3 class="card-title">{{ card.title }}</h3>
            </div>
          </div>
        </div>

        <!-- Center Info -->
        <div class="center-info">
          <p class="hover-hint" v-if="!isHovering">Hover to pause</p>
          <p class="hover-hint" v-else>Click any card to focus</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.orbital-showcase {
  width: 100%;
  background: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

/* Section Header */
.section-header {
  display: none;
}

/* Orbital Container */
.orbital-container {
  position: relative;
  width: 100%;
  height: 650px;
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  box-shadow: 0 0 60px rgba(59, 130, 246, 0.08);
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.3s ease;
}

.orbital-container:hover {
  box-shadow: 0 0 80px rgba(59, 130, 246, 0.12);
}

.orbital-container:active {
  cursor: grabbing;
}

/* Center Glow */
.center-glow {
  position: absolute;
  inset: 50%;
  width: 140px;
  height: 140px;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.glow-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.1), transparent);
  box-shadow:
    0 0 60px rgba(59, 130, 246, 0.4),
    0 0 100px rgba(99, 102, 241, 0.2),
    inset -20px -20px 40px rgba(59, 130, 246, 0.1);
  animation: glowPulse 3.5s ease-in-out infinite;
  filter: blur(0.5px);
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.15);
  }
}

/* Card Orbit Item */
.card-orbit-item {
  position: absolute;
  width: 280px;
  height: 340px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity, filter;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.08));
}

.card-orbit-item:hover {
  filter: drop-shadow(0 20px 50px rgba(59, 130, 246, 0.15));
  transform: scale(1.02) !important;
}

/* Card */
.card {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 0 1px rgba(59, 130, 246, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.card-orbit-item:hover .card {
  box-shadow:
    0 20px 60px rgba(59, 130, 246, 0.15),
    0 0 2px rgba(59, 130, 246, 0.8),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
  background: linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%);
  transform: translateY(-8px);
}

/* Card Image */
.card-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f4f8, #e2ecf5);
  position: relative;
}

.card-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent);
  z-index: 1;
  pointer-events: none;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-orbit-item:hover .card-image img {
  transform: scale(1.08);
}

/* Card Content */
.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  justify-content: flex-start;
}

.card-label {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  padding: 5px 10px;
  border-radius: 6px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.card-orbit-item:hover .card-label {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  font-family: var(--font-heading);
  line-height: 1.4;
  letter-spacing: -0.3px;
  transition: color 0.3s ease;
}

.card-orbit-item:hover .card-title {
  color: #3b82f6;
}

/* Center Info */
.center-info {
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  pointer-events: none;
}

.hover-hint {
  font-size: 0.9rem;
  color: #475569;
  margin: 0;
  font-weight: 600;
  animation: fadeInOut 2.5s ease-in-out infinite;
  pointer-events: none;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-family: var(--font-body);
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .orbital-showcase {
    padding: 60px 0;
  }

  .orbital-container {
    height: 580px;
    max-width: 750px;
  }

  .card-orbit-item {
    width: 260px;
    height: 310px;
  }

  .center-glow {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .orbital-showcase {
    padding: 50px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .orbital-container {
    height: 480px;
    max-width: 650px;
  }

  .card-orbit-item {
    width: 220px;
    height: 270px;
  }

  .card-image {
    height: 140px;
  }

  .card-content {
    padding: 18px;
    gap: 8px;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-label {
    font-size: 0.65rem;
    padding: 4px 8px;
  }

  .center-glow {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .orbital-showcase {
    padding: 40px 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .orbital-container {
    height: 380px;
    max-width: 100%;
    margin: 0 -24px;
    width: calc(100% + 48px);
    border-radius: 0;
    background: linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%);
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.05);
  }

  .card-orbit-item {
    width: 160px;
    height: 200px;
  }

  .card-image {
    height: 100px;
  }

  .card-content {
    padding: 14px;
    gap: 6px;
  }

  .card-label {
    font-size: 0.6rem;
    padding: 3px 6px;
  }

  .card-title {
    font-size: 0.9rem;
  }

  .center-glow {
    width: 80px;
    height: 80px;
  }

  .hover-hint {
    font-size: 0.7rem;
  }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .glow-inner {
    animation: none;
  }

  .hover-hint {
    animation: none;
    opacity: 1;
  }

  .card-orbit-item,
  .card,
  .card-image img {
    transition: none;
  }
}
</style>
