<script setup lang="ts">
import HeroCardSlider from '../components/HeroCardSlider.vue'
import { computed, ref, watch } from 'vue'
import cctvImage from '../assets/products/CCTV_live_view_grid_mockup_202609052309.jpeg'
import ptzImage from '../assets/products/PTZ_speed_dome_camera_recording_202609052309.jpeg'
import biometricImage from '../assets/products/Biometric_scanner_terminal_photo…_202609052309.jpeg'
import doorbellImage from '../assets/products/Video_doorbell_with_camera_mockup_202609052309.jpeg'
import doorControllerImage from '../assets/products/Smart_Touchscreen_Door_Controller_202609052309.jpeg'
import smartHomeImage from '../assets/products/Security_system_product_array_la…_202609052309.jpeg'
import indoorCameraImage from '../assets/products/Smart_indoor_security_camera_202609052309.jpeg'
import turretCameraImage from '../assets/products/Turret_camera_macro_studio_photo…_202609052309.jpeg'
import outdoorCameraImage from '../assets/products/Wireless_security_beam_detector_…_202609052309.jpeg'
import batteryCameraImage from '../assets/products/ANPR_camera_mounted_on_arm_202609052309.jpeg'
import smartCleaningImage from '../assets/products/Motion_sensor_product_photo_202609052309.jpeg'
import smartControlImage from '../assets/products/Smart_security_hub_panel_armed_202609052309.jpeg'
import alarmImage from '../assets/products/Alarm_strobe_and_siren_combo_202609052309.jpeg'
import lockImage from '../assets/products/Magnetic_door_lock_access_system_202609052309.jpeg'
import rfidImage from '../assets/products/RFID_card_reader_panel_mounted_202609052309.jpeg'
import biometricTurnstileImage from '../assets/products/Biometric_turnstile_gate_installed_202609052309.jpeg'
import anprImage from '../assets/products/ANPR_camera_mounted_on_arm_202609052309.jpeg'
const emit = defineEmits<{ goToShop: [] }>()

const familyMap = [
  { title: 'Indoor Security Cameras', image: cctvImage, className: 'family-map-indoor' },
  { title: 'Outdoor Security Cameras', image: outdoorCameraImage, className: 'family-map-outdoor' },
  { title: 'Battery Cameras', image: batteryCameraImage, className: 'family-map-battery' },
  { title: 'Smart Entry', image: doorControllerImage, className: 'family-map-entry' },
  { title: 'Smart Cleaning', image: smartCleaningImage, className: 'family-map-cleaning' },
  { title: 'Smart Control', image: smartControlImage, className: 'family-map-control' },
]

interface PickProduct {
  name: string
  note: string
  image: string
  tag?: string
}

const pickTabs = ['Bestsellers', '4G Cameras', 'Smart locks', 'Smart Entry Products']
const activePickTab = ref('Bestsellers')
const pickOffset = ref(0)

const pickProducts: Record<string, PickProduct[]> = {
  Bestsellers: [
    { name: 'C1C', note: 'Sharp eyesight like an owl.', image: indoorCameraImage, tag: 'New' },
    { name: 'H1C', note: 'Safety and peace of mind guaranteed in a glance.', image: cctvImage },
    { name: 'C6N', note: 'You are protected day and night.', image: turretCameraImage },
    { name: 'H6C', note: 'See more broadly, protect better, care more.', image: ptzImage },
    { name: 'Smart Doorbell', note: 'See and speak to visitors from anywhere.', image: doorbellImage },
    { name: 'Home Alarm Kit', note: 'Fast alerts for the moments that matter.', image: alarmImage },
    { name: 'Smart Hub', note: 'Bring every security device together.', image: smartControlImage },
    { name: 'Indoor 2K Camera', note: 'Clear detail for every room.', image: indoorCameraImage },
  ],
  '4G Cameras': [
    { name: '4G PTZ Camera', note: 'Watch wide areas without fixed internet.', image: ptzImage, tag: '4G' },
    { name: '4G ANPR Camera', note: 'Capture vehicle plates from a distance.', image: anprImage },
    { name: '4G Outdoor Camera', note: 'Reliable coverage for remote places.', image: outdoorCameraImage },
    { name: '4G Battery Camera', note: 'Flexible security where power is limited.', image: batteryCameraImage },
    { name: '4G Turret Camera', note: 'Night-ready protection with a clear view.', image: turretCameraImage },
    { name: '4G Live Monitor', note: 'Check your site live from your phone.', image: cctvImage },
    { name: '4G Smart Camera', note: 'Intelligent alerts wherever you need them.', image: smartControlImage },
    { name: '4G Dome Camera', note: 'Discreet, weather-ready coverage.', image: cctvImage },
  ],
  'Smart locks': [
    { name: 'Smart Door Lock', note: 'Keyless entry for a more secure home.', image: lockImage, tag: 'Popular' },
    { name: 'Magnetic Door Lock', note: 'Strong, dependable access control.', image: lockImage },
    { name: 'RFID Card Reader', note: 'Simple access for teams and visitors.', image: rfidImage },
    { name: 'Biometric Lock', note: 'Fast entry with verified identity.', image: biometricImage },
    { name: 'Touchscreen Controller', note: 'Manage your door from one place.', image: doorControllerImage },
    { name: 'Key Fob Access Kit', note: 'Convenient credentials for everyday use.', image: smartControlImage },
    { name: 'Smart Entry Panel', note: 'Modern access for homes and offices.', image: doorControllerImage },
    { name: 'Video Door Lock', note: 'Know who is at the door before opening.', image: doorbellImage },
  ],
  'Smart Entry Products': [
    { name: 'Video Doorbell', note: 'See, speak and answer from anywhere.', image: doorbellImage, tag: 'New' },
    { name: 'Smart Doorphone', note: 'A clearer welcome at every entrance.', image: doorControllerImage },
    { name: 'Biometric Terminal', note: 'Secure entry with fast recognition.', image: biometricImage },
    { name: 'Turnstile Access', note: 'Organised entry for busy workplaces.', image: biometricTurnstileImage },
    { name: 'RFID Reader', note: 'Quick, trackable access for every door.', image: rfidImage },
    { name: 'ANPR Entry Camera', note: 'Let approved vehicles pass smoothly.', image: anprImage },
    { name: 'Magnetic Lock', note: 'Protect doors with tested holding power.', image: lockImage },
    { name: 'Smart Entry Hub', note: 'Control your complete entrance system.', image: smartControlImage },
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
  { title: 'Battery cameras', icon: '↯' },
  { title: 'Smart entry', icon: '⇥' },
  { title: 'Smart home', icon: '⌁' },
]

const homeSceneTabs = ['Home', 'Living room', 'Kitchen', 'Home office', 'Room', 'Yard']
const activeHomeScene = ref('Home')

</script>

<template>
  <div class="overflow-x-hidden">

    <HeroCardSlider @go-to-shop="emit('goToShop')" />

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
        <img :src="smartHomeImage" alt="The SDSSS smart home" loading="lazy" />
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
        <div class="top-picks-grid">
          <article v-for="product in visibleTopPicks" :key="product.name" class="top-pick-card" @click="emit('goToShop')">
            <span v-if="product.tag" class="top-pick-tag">{{ product.tag }}</span>
            <div class="top-pick-image"><img :src="product.image" :alt="product.name" loading="lazy" /></div>
            <div class="top-pick-copy"><h3>{{ product.name }}</h3><p>{{ product.note }}</p></div>
          </article>
        </div>
        <div class="picks-bottom"><div class="picks-line"><i :style="{ width: `${((pickOffset + 4) / activePickProducts.length) * 100}%` }"></i></div><div class="picks-arrows"><button type="button" aria-label="Previous products" @click="movePicks(-1)">←</button><button type="button" aria-label="Next products" @click="movePicks(1)">→</button></div></div>
      </div>
    </section>

    <section class="action-section">
      <div class="section-shell action-shell">
        <div class="action-heading">
          <div>
            <p class="eyebrow">Behind every safer space</p>
            <h2>Our products and our team in action.</h2>
          </div>
          <button class="action-explore" type="button" @click="emit('goToShop')">Explore everything <span>›</span></button>
        </div>
        <div class="action-gallery">
          <button class="action-feature" type="button" @click="emit('goToShop')">
            <img :src="cctvImage" alt="Security team monitoring live camera views" loading="lazy" />
            <span class="action-shade"></span>
            <span class="action-label"><strong>See every detail.</strong><small>Live monitoring that keeps teams one step ahead.</small><b>›</b></span>
          </button>
          <button class="action-media action-media-entry" type="button" @click="emit('goToShop')">
            <img :src="doorControllerImage" alt="Team setting up a smart entry system" loading="lazy" />
            <span class="action-media-label">Smarter entry, installed with care <b>›</b></span>
          </button>
          <article class="action-story">
            <p>Our smart entry systems connect people, products and places with simple control and dependable support.</p>
            <strong>SDSSS in action</strong>
          </article>
          <article class="action-story">
            <p>From live monitoring to intelligent tracking, every product is designed to keep your most important spaces in view.</p>
            <strong>Built around you</strong>
          </article>
          <button class="action-media action-media-access" type="button" @click="emit('goToShop')">
            <img :src="biometricImage" alt="Biometric access system in use" loading="lazy" />
            <span class="action-media-label">People-first protection <b>›</b></span>
          </button>
        </div>
      </div>
    </section>

    <section class="scene-section">
      <div class="scene-heading">
        <div><p class="eyebrow">The SDSSS smart home</p><h2>All in one home,<br />for every family.</h2></div>
        <p>Explore a connected way to look after the moments, people and places you care about.</p>
      </div>
      <div class="scene-grid">
        <button class="scene scene-living" type="button" @click="emit('goToShop')"><span>Living room</span><b>Explore →</b></button>
        <button class="scene scene-entry" type="button" @click="emit('goToShop')"><span>Front door</span><b>Explore →</b></button>
        <button class="scene scene-business" type="button" @click="emit('goToShop')"><span>Business</span><b>Explore →</b></button>
      </div>
    </section>

  </div>
</template>

<style scoped>
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
.family-map-shell h2 { color: #1a1a1a; font-family: "Roboto", sans-serif; font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 500; line-height: 1.2; margin: 0 0 1rem; }
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
.picks-heading h2 { margin: 0 0 1.5rem; color: #182a34; font-family: Roboto, sans-serif; font-size: clamp(1.8rem, 3vw, 2.45rem); font-weight: 500; }
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
.action-heading h2 { max-width: none; margin: 0; color: #182a34; font-family: Roboto, sans-serif; font-size: clamp(.85rem, 2.55vw, 2.35rem); font-weight: 500; line-height: 1.04; white-space: nowrap; }
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

.category-strip {
  display: flex;
  justify-content: center;
  gap: clamp(1.5rem, 5vw, 5rem);
  padding: 1.3rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e7e7e3;
}
.category-strip button {
  display: inline-flex;
  align-items: center;
  gap: .55rem;
  border: 0;
  padding: .25rem 0;
  background: transparent;
  color: #333;
  cursor: pointer;
  font-size: .8rem;
  white-space: nowrap;
  transition: color 180ms ease, transform 180ms ease;
}
.category-strip button:hover { color: #1676d2; transform: translateY(-2px); }
.category-icon { display: inline-grid; place-items: center; width: 1.9rem; height: 1.9rem; border: 1px solid #b9c4ca; border-radius: 50%; color: #1676d2; font-size: 1rem; }

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
.home-scene-heading h2 { margin: 0 0 .3rem; color: #222; font-family: Roboto, sans-serif; font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.2; }
.home-scene-heading p { margin: 0; color: #52636a; font-size: .82rem; }
.home-scene-visual { width: min(1400px, calc(100% - 1rem)); height: clamp(500px, 52vw, 730px); position: relative; overflow: hidden; margin: auto; border-radius: 12px; background: #d5e5fb; }
.home-scene-visual img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center bottom; }
.home-scene-tabs { position: absolute; z-index: 2; left: 50%; bottom: 1.4rem; display: flex; justify-content: center; gap: .8rem; width: min(900px, calc(100% - 2rem)); transform: translateX(-50%); }
.home-scene-tabs button { flex: 1 1 0; min-width: 0; border: 1px solid rgba(255,255,255,.6); border-radius: 999px; padding: .75rem 1rem; color: #25323a; background: rgba(255,255,255,.48); backdrop-filter: blur(8px); cursor: pointer; font-size: .78rem; white-space: nowrap; transition: background .2s ease, transform .2s ease; }
.home-scene-tabs button:hover, .home-scene-tabs button.active { background: rgba(255,255,255,.82); transform: translateY(-2px); }

.scene-section { padding: 6.5rem 0; background: #fff; }
.scene-heading { width: min(1200px, calc(100% - 3rem)); margin: 0 auto 2.5rem; display: flex; justify-content: space-between; gap: 2rem; align-items: end; }
.scene-heading h2 { color: #111; font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1; margin: 0; }
.scene-heading > p { max-width: 330px; color: #666; line-height: 1.6; margin: 0; }
.scene-grid { display: grid; grid-template-columns: 1.15fr .85fr .85fr; gap: 1rem; width: min(1200px, calc(100% - 3rem)); margin: auto; }
.scene { min-height: 390px; display: flex; flex-direction: column; justify-content: end; align-items: flex-start; gap: .5rem; padding: 1.5rem; border: 0; color: #fff; text-align: left; background-size: cover; background-position: center; cursor: pointer; position: relative; overflow: hidden; }
.scene::after { content: ''; position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, rgba(0,0,0,.78)); }
.scene span, .scene b { z-index: 1; }
.scene span { font-size: 1.5rem; font-weight: 700; }
.scene b { font-size: .8rem; }
.scene-living { background-image: url('../assets/products/CCTV_live_view_grid_mockup_202609052309.jpeg'); }
.scene-entry { background-image: url('../assets/products/Video_doorbell_with_camera_mockup_202609052309.jpeg'); }
.scene-business { background-image: url('../assets/products/Biometric_turnstile_gate_installed_202609052309.jpeg'); }
.scene:hover { filter: saturate(1.08); }

.reference-hero {
  min-height: min(680px, calc(100vh - 64px));
  display: grid;
  grid-template-columns: minmax(320px, 0.9fr) minmax(420px, 1.1fr);
  align-items: center;
  gap: 4rem;
  padding: 4.5rem clamp(1.5rem, 7vw, 7rem);
  overflow: hidden;
  color: #fff;
  background: #10161b;
  position: relative;
}

.reference-hero::before {
  content: '';
  position: absolute;
  width: 58%;
  height: 150%;
  left: -15%;
  top: -25%;
  border-radius: 50%;
  background: #1b2b31;
}

.hero-copy,
.hero-visual {
  position: relative;
  z-index: 1;
}

.hero-copy {
  max-width: 520px;
}

.hero-kicker {
  color: #d7b15b;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  margin: 0 0 1.4rem;
}

.hero-copy h1 {
  color: #fff;
  font-size: clamp(2.8rem, 5vw, 5.4rem);
  line-height: 0.98;
  margin: 0;
  max-width: 650px;
}

.hero-description {
  color: #d0d8da;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 430px;
  margin: 1.7rem 0 2rem;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  border: 0;
  border-radius: 999px;
  padding: 0.85rem 1.25rem 0.85rem 1.5rem;
  color: #172025;
  background: #d7b15b;
  font-weight: 800;
  cursor: pointer;
  transition: transform 180ms ease, background 180ms ease;
}

.hero-cta span {
  font-size: 1.25rem;
  line-height: 1;
}

.hero-cta:hover {
  background: #f0cf7b;
  transform: translateY(-2px);
}

.hero-visual {
  min-height: 390px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image-frame {
  width: min(100%, 680px);
  aspect-ratio: 1.25;
  overflow: hidden;
  border-radius: 2rem 2rem 2rem 9rem;
  box-shadow: 1.5rem 1.5rem 0 rgba(215, 177, 91, 0.16);
  transform: rotate(2deg);
}

.hero-image-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-badge {
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1rem;
  color: #172025;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
}

.hero-badge strong {
  color: #b18429;
  font-size: 1.4rem;
}

.hero-badge span {
  font-size: 0.7rem;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 768px) {
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
  .category-strip { justify-content: flex-start; overflow-x: auto; gap: 1.4rem; scrollbar-width: none; }
  .category-strip::-webkit-scrollbar { display: none; }
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
}
</style>
