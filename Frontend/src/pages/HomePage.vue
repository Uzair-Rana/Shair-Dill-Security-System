<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import { computed, ref, watch } from 'vue'

// Import new images
import cctvPackage from '../assets/products/CCTV-camera-price-in-lahore-4-FHD-CCTV-Cameras-Package-hikvisionstore.pk_-1200x1108.jpg'
import ptzCamera from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import biometricScanner from '../assets/products/ChatGPT Image Sep 20, 2026, 02_36_23 AM.png'
import doorbell from '../assets/products/61XkDOqfaOL.jpg'
import doorController from '../assets/products/ChatGPT Image Sep 20, 2026, 03_08_46 AM.png'
import smartHome from '../assets/products/ChatGPT Image Sep 20, 2026, 02_58_15 AM.png'
import indoorCamera from '../assets/products/sony-snc-ch160-ip-camera.jpg'
import turretCamera from '../assets/products/DS-2CE16D0T-EXIPF-3.6mm-price-in-pakistan-hikvisionstore.pk_.png'
import outdoorCamera from '../assets/products/remote-control-2mp-samsung-cctv-camera-for-household-surveillance-269.jpg'
import batteryCamera from '../assets/products/images (4).jpg'
import alarm from '../assets/products/BOS-NBE-3703-AL.webp'
import smartControl from '../assets/products/ChatGPT Image Sep 20, 2026, 02_47_35 AM.png'
import lockImage from '../assets/products/images (15).jpg'
import rfidReader from '../assets/products/images (19).jpg'
import turnstile from '../assets/products/ChatGPT Image Sep 20, 2026, 03_21_04 AM.png'
import anprCamera from '../assets/products/images (10).jpg'
import guardService from '../assets/products/ChatGPT Image Sep 20, 2026, 02_39_32 AM.png'
import motionSensor from '../assets/products/images (17).jpg'

const emit = defineEmits<{ goToShop: [] }>()

const familyMap = [
  { title: 'Indoor Security Cameras', image: indoorCamera, className: 'family-map-indoor' },
  { title: 'Outdoor Security Cameras', image: outdoorCamera, className: 'family-map-outdoor' },
  { title: 'PTZ Cameras', image: ptzCamera, className: 'family-map-battery' },
  { title: 'Smart Entry & Access Control', image: doorController, className: 'family-map-entry' },
  { title: 'Alarm Systems', image: alarm, className: 'family-map-cleaning' },
  { title: 'Smart Monitoring', image: smartControl, className: 'family-map-control' },
]

interface PickProduct {
  name: string
  note: string
  image: string
  tag?: string
}

const pickTabs = ['Bestsellers', 'PTZ Cameras', 'Smart locks', 'Access Control']
const activePickTab = ref('Bestsellers')
const pickOffset = ref(0)

const pickProducts: Record<string, PickProduct[]> = {
  Bestsellers: [
    { name: 'CCTV Package 4Ch', note: 'Complete 4-camera surveillance system.', image: cctvPackage, tag: 'Best Value' },
    { name: 'PTZ Speed Dome', note: 'Pan-tilt-zoom camera with night vision.', image: ptzCamera, tag: 'New' },
    { name: 'Indoor HD Camera', note: 'Crystal clear indoor monitoring.', image: indoorCamera },
    { name: 'Turret Camera', note: 'Weather-resistant outdoor protection.', image: turretCamera },
    { name: 'Biometric Scanner', note: 'Fast and secure fingerprint access.', image: biometricScanner, tag: 'Popular' },
    { name: 'Smart Control Hub', note: 'Centralized security management.', image: smartControl },
    { name: 'Motion Detector', note: 'Reliable intrusion detection.', image: motionSensor },
    { name: 'Alarm System', note: 'Instant alerts when you need them.', image: alarm },
  ],
  'PTZ Cameras': [
    { name: 'Hikvision PTZ Dome', note: 'Professional pan-tilt-zoom camera.', image: ptzCamera, tag: '4MP' },
    { name: 'Outdoor PTZ', note: 'All-weather PTZ surveillance.', image: outdoorCamera },
    { name: 'Indoor PTZ', note: 'Smart tracking for indoor spaces.', image: indoorCamera },
    { name: 'ANPR PTZ Camera', note: 'License plate recognition camera.', image: anprCamera, tag: 'AI' },
    { name: 'Samsung PTZ', note: 'Remote control surveillance camera.', image: outdoorCamera },
    { name: 'Battery PTZ Camera', note: 'Wire-free PTZ monitoring.', image: batteryCamera },
  ],
  'Smart locks': [
    { name: 'Smart Door Lock', note: 'Keyless entry with mobile control.', image: lockImage, tag: 'Popular' },
    { name: 'Biometric Lock', note: 'Fingerprint-based secure entry.', image: biometricScanner },
    { name: 'RFID Card Reader', note: 'Simple card-based access control.', image: rfidReader },
    { name: 'Digital Keypad Lock', note: 'PIN code entry system.', image: lockImage },
    { name: 'Smart Deadbolt', note: 'Heavy-duty electronic lock.', image: lockImage },
    { name: 'Video Door Lock', note: 'See who's at the door before opening.', image: doorbell },
  ],
  'Access Control': [
    { name: 'Biometric Terminal', note: 'Professional access control system.', image: biometricScanner, tag: 'Enterprise' },
    { name: 'Turnstile Gate', note: 'Controlled entry for high-traffic areas.', image: turnstile },
    { name: 'RFID Access System', note: 'Card-based entry management.', image: rfidReader },
    { name: 'Smart Door Controller', note: 'Centralized door access control.', image: doorController },
    { name: 'ANPR Entry System', note: 'Vehicle identification entry system.', image: anprCamera, tag: 'AI' },
    { name: 'Video Doorbell', note: 'See and speak to visitors remotely.', image: doorbell },
  ],
}

const bestsellers = pickProducts.Bestsellers!
const activePickProducts = computed(() => pickProducts[activePickTab.value] ?? bestsellers)
const visibleTopPicks = computed(() => {
  const products = activePickProducts.value
  return Array.from({ length: 4 }, (_, index) => products[(pickOffset.value + index) % products.length]!)
})

const movePicks = (direction: number) => {
  const total = activePickProducts.value.length
  pickOffset.value = (pickOffset.value + direction + total) % total
}

watch(activePickTab, () => {
  pickOffset.value = 0
})

const quickCategories = [
  { title: 'Indoor cameras', icon: '⌂' },
  { title: 'Outdoor cameras', icon: '◉' },
  { title: 'PTZ cameras', icon: '↻' },
  { title: 'Smart entry', icon: '⇥' },
  { title: 'Alarm systems', icon: '⚠' },
]

const homeSceneTabs = ['Home', 'Living room', 'Kitchen', 'Home office', 'Room', 'Yard']
const activeHomeScene = ref('Home')

</script>

<template>
  <div class="overflow-x-hidden">

    <HeroSection />

    <section class="category-strip" aria-label="Shop by category">
      <button v-for="category in quickCategories" :key="category.title" type="button" @click="emit('goToShop')">
        <span class="category-icon">{{ category.icon }}</span>
        <span>{{ category.title }}</span>
      </button>
    </section>

    <section class="family-map-section">
      <div class="family-map-shell">
        <h2>SDSSS Product Family Map</h2>
        <div class="family-map-grid">
          <button v-for="family in familyMap" :key="family.title" type="button" :class="['family-map-card', family.className]" @click="emit('goToShop')">
            <img :src="family.image" :alt="family.title" loading="lazy" />
            <span class="family-map-label">{{ family.title }}</span>
            <span class="family-map-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>

    <section class="home-scene-section">
      <div class="home-scene-heading">
        <h2>The SDSSS Smart Home</h2>
        <p>Everything in one place, for all families.</p>
      </div>
      <div class="home-scene-visual">
        <img :src="smartHome" alt="The SDSSS smart home" loading="lazy" />
        <nav class="home-scene-tabs" aria-label="Smart home spaces">
          <button v-for="tab in homeSceneTabs" :key="tab" type="button" :class="{ active: activeHomeScene === tab }" @click="activeHomeScene = tab">{{ tab }}</button>
        </nav>
      </div>
    </section>

    <section class="picks-section">
      <div class="section-shell">
        <div class="picks-heading">
          <h2>Our top picks</h2>
          <nav class="pick-tabs" aria-label="Top pick categories">
            <button v-for="tab in pickTabs" :key="tab" type="button" :class="{ active: activePickTab === tab }" @click="activePickTab = tab">{{ tab }}</button>
          </nav>
        </div>

        <div class="picks-grid">
          <div v-for="product in visibleTopPicks" :key="product.name" class="pick-card">
            <img :src="product.image" :alt="product.name" loading="lazy" />
            <span v-if="product.tag" class="pick-tag">{{ product.tag }}</span>
            <div class="pick-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.note }}</p>
            </div>
          </div>
        </div>

        <div class="picks-controls">
          <button type="button" @click="movePicks(-1)" aria-label="Previous products">‹</button>
          <button type="button" @click="movePicks(1)" aria-label="Next products">›</button>
        </div>
      </div>
    </section>

    <section class="action-section">
      <div class="section-shell action-shell">
        <div class="action-heading">
          <h2>Security solutions for every need</h2>
          <p>From residential to commercial, we've got you covered with professional-grade equipment and expert installation.</p>
        </div>
        <div class="action-grid">
          <div class="action-card">
            <img :src="guardService" alt="Security guard services" loading="lazy" />
            <h3>Guard Services</h3>
            <p>Professional security personnel for your premises</p>
            <button type="button" @click="emit('goToShop')">Learn more →</button>
          </div>
          <div class="action-card">
            <img :src="cctvPackage" alt="CCTV installation" loading="lazy" />
            <h3>CCTV Installation</h3>
            <p>Complete surveillance solutions with expert setup</p>
            <button type="button" @click="emit('goToShop')">Get started →</button>
          </div>
          <div class="action-card">
            <img :src="biometricScanner" alt="Access control systems" loading="lazy" />
            <h3>Access Control</h3>
            <p>Advanced entry management and monitoring</p>
            <button type="button" @click="emit('goToShop')">Explore →</button>
          </div>
        </div>
      </div>
    </section>

    <section class="scene-section">
      <div class="scene-heading">
        <div><p class="eyebrow">The SDSSS smart home</p><h2>All in one home,<br />for every family.</h2></div>
        <button type="button" class="scene-explore" @click="emit('goToShop')">Explore smart home →</button>
      </div>
      <div class="scene-grid">
        <button type="button" class="scene scene-living" @click="emit('goToShop')">
          <span>Living room<b>Indoor cameras & sensors</b></span>
        </button>
        <button type="button" class="scene scene-entry" @click="emit('goToShop')">
          <span>Entrance<b>Smart locks & doorbells</b></span>
        </button>
        <button type="button" class="scene scene-business" @click="emit('goToShop')">
          <span>Business<b>Access control & turnstiles</b></span>
        </button>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Base styles preserved from original */
.category-strip { display: flex; gap: .75rem; justify-content: center; padding: 2.5rem 1.5rem; background: #f8f9fa; flex-wrap: wrap; }
.category-strip button { display: flex; align-items: center; gap: .5rem; padding: .625rem 1.125rem; border: 1px solid #dee2e6; border-radius: 999px; background: white; font-size: .875rem; font-weight: 600; cursor: pointer; transition: all 180ms ease; }
.category-strip button:hover { border-color: #1676d2; color: #1676d2; transform: translateY(-2px); }
.category-icon { font-size: 1.125rem; }

.family-map-section { padding: 4rem 1.5rem; background: white; }
.family-map-shell { max-width: 1280px; margin: 0 auto; }
.family-map-shell h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; text-align: center; margin-bottom: 3rem; }
.family-map-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.family-map-card { position: relative; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; border: none; cursor: pointer; transition: transform 250ms ease; }
.family-map-card:hover { transform: scale(1.02); }
.family-map-card img { width: 100%; height: 100%; object-fit: cover; }
.family-map-label { position: absolute; bottom: 1.5rem; left: 1.5rem; font-size: 1.25rem; font-weight: 700; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
.family-map-arrow { position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; color: white; opacity: 0; transition: opacity 200ms ease; }
.family-map-card:hover .family-map-arrow { opacity: 1; }

.home-scene-section { padding: 4rem 1.5rem; background: #f8f9fa; }
.home-scene-heading { text-align: center; margin-bottom: 2rem; }
.home-scene-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: .5rem; }
.home-scene-heading p { font-size: 1.125rem; color: #6c757d; }
.home-scene-visual { max-width: 1200px; margin: 0 auto; position: relative; }
.home-scene-visual img { width: 100%; border-radius: 16px; }
.home-scene-tabs { display: flex; gap: .5rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap; }
.home-scene-tabs button { padding: .5rem 1rem; border: 1px solid #dee2e6; border-radius: 999px; background: white; font-size: .875rem; font-weight: 600; cursor: pointer; transition: all 180ms ease; }
.home-scene-tabs button.active { border-color: #1676d2; color: #1676d2; background: #e7f3ff; }

.picks-section { padding: 4rem 1.5rem; background: white; }
.section-shell { max-width: 1280px; margin: 0 auto; }
.picks-heading { margin-bottom: 2.5rem; }
.picks-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 1.5rem; text-align: center; }
.pick-tabs { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; }
.pick-tabs button { padding: .625rem 1.25rem; border: 1px solid #dee2e6; border-radius: 999px; background: white; font-size: .875rem; font-weight: 600; cursor: pointer; transition: all 180ms ease; }
.pick-tabs button.active { border-color: #1676d2; color: #1676d2; background: #e7f3ff; }
.picks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.pick-card { position: relative; border-radius: 12px; overflow: hidden; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 250ms ease; }
.pick-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.pick-card img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.pick-tag { position: absolute; top: .75rem; right: .75rem; padding: .375rem .75rem; background: #1676d2; color: white; font-size: .75rem; font-weight: 700; border-radius: 999px; }
.pick-info { padding: 1.25rem; }
.pick-info h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: .5rem; }
.pick-info p { font-size: .875rem; color: #6c757d; }
.picks-controls { display: flex; gap: 1rem; justify-content: center; }
.picks-controls button { width: 3rem; height: 3rem; border: 1px solid #dee2e6; border-radius: 50%; background: white; font-size: 1.5rem; cursor: pointer; transition: all 180ms ease; }
.picks-controls button:hover { border-color: #1676d2; color: #1676d2; }

.action-section { padding: 4rem 1.5rem; background: #f8f9fa; }
.action-heading { text-align: center; margin-bottom: 3rem; }
.action-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 1rem; }
.action-heading p { font-size: 1.125rem; color: #6c757d; max-width: 600px; margin: 0 auto; }
.action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.action-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 250ms ease; }
.action-card:hover { transform: translateY(-4px); }
.action-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.action-card h3 { font-size: 1.5rem; font-weight: 700; margin: 1.5rem 1.5rem 1rem; }
.action-card p { font-size: 1rem; color: #6c757d; margin: 0 1.5rem 1.5rem; }
.action-card button { margin: 0 1.5rem 1.5rem; padding: .75rem 1.5rem; border: none; background: #1676d2; color: white; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 180ms ease; }
.action-card button:hover { background: #0d5ea8; }

.scene-section { padding: 4rem 1.5rem; background: white; }
.scene-heading { display: flex; justify-content: space-between; align-items: center; max-width: 1280px; margin: 0 auto 3rem; flex-wrap: wrap; gap: 2rem; }
.eyebrow { font-size: .875rem; color: #1676d2; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
.scene-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; }
.scene-explore { padding: .875rem 1.75rem; border: 1px solid #1676d2; background: white; color: #1676d2; border-radius: 999px; font-weight: 700; cursor: pointer; transition: all 180ms ease; }
.scene-explore:hover { background: #1676d2; color: white; }
.scene-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; max-width: 1280px; margin: 0 auto; }
.scene { position: relative; aspect-ratio: 16/9; border-radius: 16px; overflow: hidden; border: none; cursor: pointer; background-size: cover; background-position: center; transition: transform 250ms ease; }
.scene:hover { transform: scale(1.02); }
.scene span { position: absolute; bottom: 2rem; left: 2rem; color: white; text-align: left; font-size: 1.5rem; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
.scene b { display: block; font-size: .875rem; font-weight: 400; margin-top: .5rem; opacity: 0.9; }
.scene-living { background-image: url('../assets/products/ChatGPT Image Sep 20, 2026, 02_58_15 AM.png'); }
.scene-entry { background-image: url('../assets/products/61XkDOqfaOL.jpg'); }
.scene-business { background-image: url('../assets/products/ChatGPT Image Sep 20, 2026, 03_21_04 AM.png'); }

@media (max-width: 768px) {
  .scene-heading { flex-direction: column; align-items: flex-start; }
  .family-map-grid, .picks-grid, .action-grid, .scene-grid { grid-template-columns: 1fr; }
}
</style>
