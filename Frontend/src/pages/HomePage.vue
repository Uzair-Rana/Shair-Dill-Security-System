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
    { name: 'Video Door Lock', note: 'See who's at the door before opening.', image: lockImage },
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

<<<<<<< HEAD
=======
const quickCategories = [
  { title: 'Indoor cameras', icon: '⌂' },
  { title: 'Outdoor cameras', icon: '◉' },
  { title: 'PTZ cameras', icon: '↻' },
  { title: 'Smart entry', icon: '⇥' },
  { title: 'Alarm systems', icon: '⚠' },
]

>>>>>>> 9f070a7 (feat: Updated hero section with video background and refreshed product images)
const homeSceneTabs = ['Home', 'Living room', 'Kitchen', 'Home office', 'Room', 'Yard']
const activeHomeScene = ref('Home')

</script>

<template>
  <div class="overflow-x-hidden">

    <HeroSection />

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
<<<<<<< HEAD
.section-shell { width: min(1200px, calc(100% - 3rem)); margin: 0 auto; }
.family-section, .picks-section, .editorial-section { background: #fff; padding: 6.5rem 0; }
.picks-section { background: #fff; border-top: 1px solid #edf1f3; border-bottom: 1px solid #edf1f3; }
.section-heading-row { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.5rem; }
.eyebrow, .article-type { color: #686868; font-size: .7rem; font-weight: 800; letter-spacing: .16em; margin: 0 0 .8rem; text-transform: uppercase; }
.section-heading-row h2, .editorial-grid h2 { color: #111; font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1; margin: 0; }
.text-link, .family-card-copy button, .pick-copy button { border: 0; background: transparent; color: #2666ff; cursor: pointer; font-weight: 500; padding: 0; }
.text-link span, .family-card-copy button span, .pick-copy button span, .black-button span { margin-left: .5rem; }
.family-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.family-card { min-height: 430px; background: #fff; border: 1px solid #ededed; overflow: hidden; position: relative; }
.family-card img { width: 100%; height: 270px; display: block; object-fit: cover; transition: transform 500ms ease; }
.family-card:hover img { transform: scale(1.06); }
.family-card-copy { padding: 1.5rem; }
.family-card-copy h3, .pick-copy h3 { color: #111; font-size: 1.2rem; margin: 0 0 .5rem; }
.family-card-copy p, .pick-copy p { color: #666; font-size: .9rem; line-height: 1.5; margin: 0 0 1.4rem; }
.family-map-section { background: #fff; padding: 1.1rem 0 4.5rem; }
.family-map-shell { width: min(1400px, calc(100% - 2rem)); margin: 0 auto; padding: .35rem; border: 1px solid #e4e8eb; border-radius: 10px; background: #fff; }
.family-map-shell h2 { color: #1a1a1a; font-family: var(--font-heading); font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 500; line-height: 1.2; margin: 0 0 1rem; }
.family-map-grid { display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: clamp(195px, 28vw, 390px) clamp(155px, 22vw, 305px) clamp(155px, 22vw, 305px); gap: 5px; }
.family-map-card { min-width: 0; min-height: 0; position: relative; overflow: hidden; border: 0; border-radius: 8px; padding: 0; background: #dceaf5; cursor: pointer; text-align: left; }
.family-map-card img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform 450ms ease; }
.family-map-card:hover img { transform: scale(1.06); }
.family-map-indoor { grid-column: span 3; grid-row: 1; }
.family-map-outdoor { grid-column: span 3; grid-row: 1; }
.family-map-battery { grid-column: span 4; grid-row: 2; }
.family-map-entry { grid-column: span 2; grid-row: 2 / span 2; }
.family-map-cleaning { grid-column: span 2; grid-row: 3; }
.family-map-control { grid-column: span 2; grid-row: 3; }
.family-map-label { position: absolute; top: 10px; right: 10px; max-width: calc(100% - 20px); padding: .55rem .75rem; border-radius: 12px; background: rgba(255,255,255,.78); color: #333; font-size: .72rem; font-weight: 700; line-height: 1.15; backdrop-filter: blur(6px); }
.family-map-arrow { position: absolute; right: 10px; bottom: 10px; display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,.72); color: #475b66; font-size: .8rem; }
.picks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.pick-card { background: #fff; border: 1px solid #ededed; }
.pick-image { aspect-ratio: 1.15; overflow: hidden; }
.pick-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms ease; }
.pick-card:hover .pick-image img { transform: scale(1.05); }
.pick-copy { padding: 1.5rem; }
.picks-heading { margin-bottom: 1rem; }
.picks-heading h2 { margin: 0 0 1.5rem; color: #182a34; font-family: var(--font-heading); font-size: clamp(1.8rem, 3vw, 2.45rem); font-weight: 500; }
.pick-tabs { display: flex; gap: .8rem; flex-wrap: wrap; }
.pick-tabs button { border: 0; border-radius: 999px; padding: .5rem 1.05rem; color: #31404a; background: #f4f6fb; cursor: pointer; font-size: .7rem; transition: background .2s ease, color .2s ease, transform .2s ease; }
.pick-tabs button:hover, .pick-tabs button.active { color: #fff; background: linear-gradient(180deg, #8faffd, #2666ff); transform: translateY(-1px); }
.top-picks-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .65rem; overflow: hidden; }
.top-pick-card { min-height: 340px; position: relative; overflow: hidden; border-radius: 14px; background: linear-gradient(150deg, #eaf6ff 0%, #c7e3fb 58%, #edf7ff 100%); cursor: pointer; transition: transform .3s ease, box-shadow .3s ease; }
.top-pick-card:hover { transform: translateY(-7px); box-shadow: 0 15px 30px rgba(66, 132, 194, .2); }
.top-pick-tag { position: absolute; z-index: 2; top: .8rem; left: .8rem; padding: .25rem .7rem; border-radius: 999px; color: #fff; background: #2666ff; font-size: .65rem; font-weight: 700; }
.top-pick-image { height: 255px; display: flex; align-items: center; justify-content: center; padding: 1.6rem 1.2rem 0; }
.top-pick-image img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 15px 12px rgba(48, 100, 144, .18)); transition: transform .35s ease; }
.top-pick-card:hover .top-pick-image img { transform: scale(1.08) translateY(-5px); }
.top-pick-copy { position: absolute; right: .75rem; bottom: .75rem; left: .75rem; min-height: 70px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: .65rem 1rem; border: 1px solid rgba(255,255,255,.7); border-radius: 14px; background: rgba(255,255,255,.32); backdrop-filter: blur(8px); text-align: center; }
.top-pick-copy h3 { margin: 0 0 .25rem; color: #20313a; font-size: 1rem; font-weight: 500; }
.top-pick-copy p { display: -webkit-box; overflow: hidden; margin: 0; color: #33444c; font-size: .68rem; line-height: 1.35; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
.picks-bottom { display: flex; align-items: center; gap: 2rem; margin-top: 2.4rem; }
.picks-line { height: 2px; flex: 1; background: #dce4ee; }
.picks-line i { display: block; width: 35%; height: 100%; background: #2666ff; }
.picks-arrows { display: flex; gap: .8rem; }
.picks-arrows button { width: 2.3rem; height: 2.3rem; border: 0; border-radius: 50%; color: #2666ff; background: #f4f7fc; cursor: pointer; font-size: 1.05rem; }
.action-section { padding: 6.5rem 0; color: #182a34; background: #f4f7f8; border-bottom: 1px solid #e3e9eb; }
.action-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.2rem; }
.action-heading h2 { max-width: none; margin: 0; color: #182a34; font-family: var(--font-heading); font-size: clamp(.85rem, 2.55vw, 2.35rem); font-weight: 500; line-height: 1.04; white-space: nowrap; }
.action-explore { flex-shrink: 0; border: 0; padding: 0 0 .2rem; color: #446578; background: transparent; cursor: pointer; font-size: .75rem; white-space: nowrap; }
.action-explore span { margin-left: .25rem; font-size: 1.1rem; }
.action-gallery { display: grid; grid-template-columns: 1.65fr .82fr .82fr; grid-template-rows: 210px 210px; gap: .75rem; }
.action-gallery button { position: relative; min-width: 0; overflow: hidden; border: 0; border-radius: 12px; padding: 0; background: #c9dce7; cursor: pointer; text-align: left; }
.action-gallery img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform 500ms ease; }
.action-gallery button:hover img { transform: scale(1.06); }
.action-feature { grid-row: 1 / span 2; }
.action-feature .action-shade, .action-tile::after { position: absolute; inset: 35% 0 0; background: linear-gradient(transparent, rgba(12, 29, 39, .2)); content: ''; }
.action-label, .action-media-label { position: absolute; z-index: 1; right: .45rem; bottom: .45rem; left: .45rem; color: #fff; }
.action-label { display: flex; flex-direction: column; gap: .12rem; padding: .35rem .55rem; border: 1px solid rgba(255,255,255,.38); border-radius: 9px; background: rgba(255,255,255,.16); color: #000; box-shadow: 0 3px 12px rgba(14, 35, 48, .04); }
.action-label strong { font-size: clamp(.72rem, 1.1vw, 1rem); font-weight: 600; }
.action-label small { max-width: 300px; color: #000; font-size: .52rem; line-height: 1.2; }
.action-feature .action-label { right: 3.5rem; bottom: .8rem; left: 3.5rem; padding: .1rem .2rem; border-radius: 6px; }
.action-feature .action-label strong { color: #000; font-size: clamp(.82rem, 1.15vw, 1.05rem); }
.action-feature .action-label small { color: #000; font-size: .42rem; }
.action-feature .action-label b { color: #000; font-size: .8rem; }
.action-label b, .action-media-label b { position: absolute; top: 50%; right: .55rem; transform: translateY(-50%); font-size: 1.15rem; font-weight: 400; }
.action-media-entry { grid-column: 2; grid-row: 1; }
.action-media-access { grid-column: 3; grid-row: 2; }
.action-media::after { position: absolute; inset: 38% 0 0; background: linear-gradient(transparent, rgba(12, 29, 39, .2)); content: ''; }
.action-media-label { padding: .35rem .55rem; border: 1px solid rgba(255,255,255,.38); border-radius: 9px; background: rgba(255,255,255,.16); color: #000; box-shadow: 0 3px 12px rgba(14, 35, 48, .04); font-size: .56rem; line-height: 1.1; }
.action-story { display: flex; flex-direction: column; justify-content: space-between; padding: 1.4rem 1.35rem 1.25rem; border-radius: 12px; background: #e5edf9; color: #203340; }
.action-story:nth-of-type(1) { grid-column: 3; grid-row: 1; }
.action-story:nth-of-type(2) { grid-column: 2; grid-row: 2; }
.action-story p { margin: 0; font-size: .78rem; line-height: 1.45; }
.action-story strong { color: #000; font-size: .9rem; }
.editorial-section { border-top: 1px solid #e6e6e3; }
.editorial-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 6rem; }
.editorial-intro { color: #666; line-height: 1.6; max-width: 300px; margin: 1.5rem 0 2rem; }
.black-button { background: #2666ff; color: #fff; border: 0; border-radius: 999px; cursor: pointer; font-weight: 500; padding: .9rem 1.35rem; }
.article-list { border-top: 1px solid #111; }
.article-list article { display: grid; grid-template-columns: 2.5rem 1fr 1rem; gap: 1rem; padding: 1.5rem 0; border-bottom: 1px solid #d7d7d2; }
.article-list article > span:first-child { color: #888; font-size: .8rem; }
.article-list h3 { color: #111; font-size: 1.1rem; margin: 0 0 .5rem; }
.article-list article p:last-child { color: #666; font-size: .85rem; line-height: 1.5; margin: 0; }
.article-type { color: #888; margin-bottom: .45rem; }
.article-arrow { color: #111; }


.spotlight-section {
  display: grid;
  grid-template-columns: .82fr 1.18fr;
  min-height: 510px;
  background: #fff;
  overflow: hidden;
}
.spotlight-copy { display: flex; flex-direction: column; justify-content: center; padding: 4rem clamp(2rem, 8vw, 8rem); }
.spotlight-copy h2 { color: #11222b; font-size: clamp(2.5rem, 5vw, 5rem); line-height: .98; margin: 0; }
.spotlight-copy > p:not(.eyebrow) { max-width: 360px; margin: 1.4rem 0 2rem; color: #52636a; line-height: 1.6; }
.spotlight-section > img { width: 100%; height: 100%; min-height: 510px; object-fit: cover; }
.dark-link { align-self: flex-start; border: 0; padding: .9rem 0; background: transparent; color: #11222b; font-weight: 800; cursor: pointer; }
.dark-link span { margin-left: .7rem; }
.home-scene-section { padding: 1rem 0 5rem; background: #fff; }
.home-scene-heading { width: min(1400px, calc(100% - 1rem)); margin: 0 auto .9rem; }
.home-scene-heading h2 { margin: 0 0 .3rem; color: #222; font-family: var(--font-heading); font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.2; }
.home-scene-heading p { margin: 0; color: #52636a; font-size: .82rem; }
.home-scene-visual { width: min(1400px, calc(100% - 1rem)); height: clamp(500px, 52vw, 730px); position: relative; overflow: hidden; margin: auto; border-radius: 12px; background: #d5e5fb; }
.home-scene-visual img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center bottom; }
.home-scene-tabs { position: absolute; z-index: 2; left: 50%; bottom: 1.4rem; display: flex; justify-content: center; gap: .8rem; width: min(900px, calc(100% - 2rem)); transform: translateX(-50%); }
.home-scene-tabs button { flex: 1 1 0; min-width: 0; border: 1px solid rgba(255,255,255,.6); border-radius: 999px; padding: .75rem 1rem; color: #25323a; background: rgba(255,255,255,.48); backdrop-filter: blur(8px); cursor: pointer; font-size: .78rem; white-space: nowrap; transition: background .2s ease, transform .2s ease; }
.home-scene-tabs button:hover, .home-scene-tabs button.active { background: rgba(255,255,255,.82); transform: translateY(-2px); }
=======
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
>>>>>>> 9f070a7 (feat: Updated hero section with video background and refreshed product images)

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
<<<<<<< HEAD
  .section-shell { width: min(100% - 2.2rem, 600px); }
  .family-section, .picks-section, .editorial-section { padding: 4.5rem 0; }
  .section-heading-row { align-items: start; flex-direction: column; gap: 1.25rem; }
  .family-grid, .picks-grid, .editorial-grid { grid-template-columns: 1fr; }
  .family-card { min-height: 0; }
  .family-card img { height: 230px; }
  .editorial-grid { gap: 3rem; }
  .action-section { padding: 4.5rem 0; }
  .action-heading { align-items: center; flex-direction: row; gap: .7rem; }
  .action-heading h2 { font-size: clamp(.68rem, 3.35vw, 1.5rem); }
  .action-gallery { grid-template-columns: 1fr 1fr; grid-template-rows: 280px 180px 180px; }
  .action-feature { grid-column: 1 / span 2; grid-row: 1; }
  .action-media-entry { grid-column: 1; grid-row: 2; }
  .action-story:nth-of-type(1) { grid-column: 2; grid-row: 2; }
  .action-story:nth-of-type(2) { grid-column: 1; grid-row: 3; }
  .action-media-access { grid-column: 2; grid-row: 3; }
  .family-map-section { padding: 1rem 0 3.5rem; }
  .family-map-shell { width: calc(100% - 1rem); }
  .family-map-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(4, 150px); gap: 4px; }
  .family-map-indoor, .family-map-outdoor, .family-map-battery, .family-map-entry, .family-map-cleaning, .family-map-control { grid-column: span 1; grid-row: auto; }
  .family-map-indoor, .family-map-outdoor { grid-column: span 1; }
  .family-map-battery { grid-column: span 2; }
  .family-map-entry { grid-column: span 1; grid-row: span 2; }
  .family-map-cleaning, .family-map-control { grid-column: span 1; }
  .spotlight-section { grid-template-columns: 1fr; }
  .spotlight-copy { padding: 4rem 1.5rem 2.5rem; }
  .spotlight-section > img { min-height: 300px; max-height: 360px; }
  .home-scene-section { padding: 1rem 0 3.5rem; }
  .home-scene-heading { width: calc(100% - 1rem); }
  .home-scene-visual { width: calc(100% - 1rem); height: 520px; border-radius: 10px; }
  .home-scene-visual img { object-fit: cover; }
  .home-scene-tabs { bottom: .8rem; gap: .35rem; overflow-x: auto; justify-content: flex-start; padding: 0 .3rem; }
  .home-scene-tabs button { flex: 0 0 auto; padding: .6rem .9rem; font-size: .7rem; }
  .scene-section { padding: 4.5rem 0; }
  .scene-heading { width: min(100% - 2.2rem, 600px); align-items: start; flex-direction: column; }
  .scene-grid { width: min(100% - 2.2rem, 600px); grid-template-columns: 1fr; }
  .scene { min-height: 280px; }
  .top-pick-card { min-height: 300px; }
  .top-pick-image { height: 220px; }

  .reference-hero {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 4rem 1.5rem 5rem;
  }

  .reference-hero::before {
    width: 130%;
    height: 80%;
    left: -25%;
    top: -15%;
  }

  .hero-copy h1 {
    font-size: clamp(2.8rem, 13vw, 4.4rem);
  }

  .hero-visual {
    min-height: 280px;
  }

  .hero-image-frame {
    border-radius: 1.25rem 1.25rem 1.25rem 5rem;
  }
}

@media (max-width: 480px) {
  .reference-hero {
    padding-inline: 1.1rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .hero-badge {
    right: -0.4rem;
  }
}

@media (max-width: 1024px) {
  .banner-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 1.75rem;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .title-banner {
    padding: 20px 0;
  }

  .banner-title {
    font-size: 1.4rem;
    padding: 0 15px;
  }
=======
  .scene-heading { flex-direction: column; align-items: flex-start; }
  .family-map-grid, .picks-grid, .action-grid, .scene-grid { grid-template-columns: 1fr; }
>>>>>>> 9f070a7 (feat: Updated hero section with video background and refreshed product images)
}
</style>
