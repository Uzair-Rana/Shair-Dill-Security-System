<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import { computed, ref, watch } from 'vue'
import { useScrollReveal, useChildReveal } from '../composables/useScrollReveal'

import logoImg from '../assets/logo of SDSSS.png'

// Product photography — each import name reflects what the photo actually
// shows (brand + device), since several were previously mislabeled.
import hikvisionCctvKit from '../assets/products/CCTV-camera-price-in-lahore-4-FHD-CCTV-Cameras-Package-hikvisionstore.pk_-1200x1108.jpg'
import hikvisionPtzCamera from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import ezvizSmartLockCollection from '../assets/products/ChatGPT Image Sep 20, 2026, 02_36_23 AM.png'
import domeCctvCamera from '../assets/products/61XkDOqfaOL.jpg'
import guardsPhoto from '../assets/products/ChatGPT Image Sep 20, 2026, 03_11_33 AM.png'
import sonyBulletCamera from '../assets/products/sony-snc-ch160-ip-camera.jpg'
import hikvisionTurretCamera from '../assets/products/DS-2CE16D0T-EXIPF-3.6mm-price-in-pakistan-hikvisionstore.pk_.png'
import samsungDomeCamera from '../assets/products/remote-control-2mp-samsung-cctv-camera-for-household-surveillance-269.jpg'
import hikvisionMiniDome from '../assets/products/images (4).jpg'
import boschBulletCamera from '../assets/products/BOS-NBE-3703-AL.webp'
import sonyIndoorCameraShowcase from '../assets/products/ChatGPT Image Sep 20, 2026, 02_47_35 AM.png'
import ezvizIndoorPanTiltCamera from '../assets/products/images (15).jpg'
import ezvizSmartDoorLock from '../assets/products/images (19).jpg'
import hikvisionAccessTerminals from '../assets/products/ChatGPT Image Sep 20, 2026, 03_21_04 AM.png'
import ezvizOutdoorPanTiltCamera from '../assets/products/images (10).jpg'
import ezvizPtzCameraRange from '../assets/products/ChatGPT Image Sep 20, 2026, 02_39_32 AM.png'
import ezvizWallMountCamera from '../assets/products/images (17).jpg'

const emit = defineEmits<{ goToShop: []; goToAbout: [] }>()

/* ── Scroll-reveal wiring ─────────────────────────────────── */
const familyHeadingRef = ref<HTMLElement | null>(null)
const lifestyleHeadingRef = ref<HTMLElement | null>(null)
const picksHeadingRef = ref<HTMLElement | null>(null)
const actionGridRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)

useScrollReveal(familyHeadingRef)
useScrollReveal(lifestyleHeadingRef)
useScrollReveal(picksHeadingRef)
useChildReveal(actionGridRef)
useScrollReveal(aboutRef)

/* ── Category grid (tabbed) ───────────────────────────────── */
interface FamilyItem {
  title: string
  image: string
}

const categoryTabs = ['Security Cameras', 'Smart Home & Access']
const activeCategoryTab = ref('Security Cameras')

const familyMapTabs: Record<string, FamilyItem[]> = {
  'Security Cameras': [
    { title: 'Hikvision PTZ Speed Dome', image: hikvisionPtzCamera },
    { title: 'Samsung Dome Camera', image: samsungDomeCamera },
    { title: 'Sony IP Bullet Camera', image: sonyBulletCamera },
    { title: 'Hikvision Turret Camera', image: hikvisionTurretCamera },
    { title: 'EZVIZ Pan & Tilt Camera', image: ezvizOutdoorPanTiltCamera },
    { title: 'Hikvision Mini Dome Camera', image: hikvisionMiniDome },
  ],
  'Smart Home & Access': [
    { title: 'EZVIZ Smart Door Lock', image: ezvizSmartDoorLock },
    { title: 'EZVIZ Smart Lock Collection', image: ezvizSmartLockCollection },
    { title: 'Hikvision Access Control Terminals', image: hikvisionAccessTerminals },
  ],
}

const activeFamilyMap = computed(() => familyMapTabs[activeCategoryTab.value] ?? familyMapTabs['Security Cameras']!)

/* ── Top picks (tabbed carousel) ──────────────────────────── */
interface PickProduct {
  name: string
  note: string
  image: string
  tag?: string
}

const pickTabs = ['Bestsellers', 'Cameras', 'Locks & Access']
const activePickTab = ref('Bestsellers')
const pickOffset = ref(0)

const pickProducts: Record<string, PickProduct[]> = {
  Bestsellers: [
    { name: 'Hikvision 4-Channel CCTV Package', note: 'Complete 4-camera surveillance kit with DVR and hard drive.', image: hikvisionCctvKit, tag: 'Best Value' },
    { name: 'Hikvision PTZ Speed Dome', note: 'Pan-tilt-zoom camera with night vision.', image: hikvisionPtzCamera, tag: 'New' },
    { name: 'Sony IP Bullet Camera', note: 'Crystal clear indoor/outdoor monitoring.', image: sonyBulletCamera },
    { name: 'Hikvision Turret Camera', note: 'Weather-resistant outdoor protection.', image: hikvisionTurretCamera },
    { name: 'EZVIZ Smart Lock Collection', note: 'A full range of keyless smart lock styles.', image: ezvizSmartLockCollection, tag: 'Popular' },
    { name: 'Samsung Dome Camera', note: 'Reliable fixed-dome surveillance.', image: samsungDomeCamera },
    { name: 'EZVIZ Outdoor Camera', note: 'Wireless coverage for entrances and yards.', image: ezvizWallMountCamera },
    { name: 'Bosch Bullet Camera', note: 'Professional-grade outdoor monitoring.', image: boschBulletCamera },
  ],
  Cameras: [
    { name: 'Hikvision PTZ Speed Dome', note: 'Professional pan-tilt-zoom camera.', image: hikvisionPtzCamera, tag: '4MP' },
    { name: 'Samsung Dome Camera', note: 'All-weather fixed-dome surveillance.', image: samsungDomeCamera },
    { name: 'Sony IP Bullet Camera', note: 'Smart tracking for indoor spaces.', image: sonyBulletCamera },
    { name: 'EZVIZ Pan & Tilt Camera', note: 'Remote pan-tilt surveillance camera.', image: ezvizOutdoorPanTiltCamera, tag: 'AI' },
    { name: 'Hikvision Turret Camera', note: 'Compact, durable outdoor protection.', image: hikvisionTurretCamera },
    { name: 'Hikvision Mini Dome Camera', note: 'Discreet indoor ceiling monitoring.', image: hikvisionMiniDome },
  ],
  'Locks & Access': [
    { name: 'EZVIZ Smart Door Lock', note: 'Keyless entry with mobile control.', image: ezvizSmartDoorLock, tag: 'Popular' },
    { name: 'EZVIZ Smart Lock Collection', note: 'Fingerprint, keypad and app-based entry.', image: ezvizSmartLockCollection },
    { name: 'Hikvision Access Control Terminals', note: 'Fingerprint, face and keypad access control.', image: hikvisionAccessTerminals, tag: 'Enterprise' },
    { name: 'EZVIZ Indoor Pan & Tilt Camera', note: 'Monitor entry points from indoors.', image: ezvizIndoorPanTiltCamera },
  ],
}

const activePickProducts = computed(() => pickProducts[activePickTab.value] ?? pickProducts.Bestsellers!)
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

/* ── Tabbed lifestyle/solutions section ───────────────────── */
interface LifestyleProduct {
  name: string
  note: string
  image: string
}

const lifestyleTabs = ['Indoor', 'Outdoor', 'Entrance', 'Business']
const activeLifestyleTab = ref('Indoor')

const lifestyleProductsByTab: Record<string, LifestyleProduct[]> = {
  Indoor: [
    { name: 'Sony IP Bullet Camera', note: 'Crystal clear indoor monitoring.', image: sonyIndoorCameraShowcase },
    { name: 'EZVIZ Indoor Pan & Tilt Camera', note: '360° indoor coverage that follows the action.', image: ezvizIndoorPanTiltCamera },
    { name: 'Dome CCTV Camera', note: 'Discreet ceiling-mounted monitoring.', image: domeCctvCamera },
  ],
  Outdoor: [
    { name: 'Samsung Dome Camera', note: 'All-weather outdoor protection.', image: samsungDomeCamera },
    { name: 'Hikvision Turret Camera', note: 'Weather-resistant outdoor protection.', image: hikvisionTurretCamera },
    { name: 'EZVIZ Outdoor Camera', note: 'Wireless coverage for yards and driveways.', image: ezvizWallMountCamera },
  ],
  Entrance: [
    { name: 'EZVIZ Smart Door Lock', note: 'Keyless entry with mobile control.', image: ezvizSmartDoorLock },
    { name: 'EZVIZ Smart Lock Collection', note: 'A full range of smart lock styles.', image: ezvizSmartLockCollection },
    { name: 'EZVIZ Pan & Tilt Camera', note: 'See who\'s approaching before they knock.', image: ezvizOutdoorPanTiltCamera },
  ],
  Business: [
    { name: 'Hikvision Access Control Terminals', note: 'Fingerprint, face and keypad access control.', image: hikvisionAccessTerminals },
    { name: 'Hikvision 4-Channel CCTV Package', note: 'Complete surveillance kits for any site.', image: hikvisionCctvKit },
    { name: 'Hikvision PTZ Speed Dome', note: 'Wide-area coverage for large premises.', image: hikvisionPtzCamera },
  ],
}

const activeLifestyleProducts = computed(() => lifestyleProductsByTab[activeLifestyleTab.value] ?? lifestyleProductsByTab.Indoor!)
</script>

<template>
  <div class="overflow-x-hidden">

    <HeroSection />

    <section class="family-map-section">
      <div class="family-map-shell">
        <div ref="familyHeadingRef" class="reveal-up">
          <h2>SDSSS Product Family Map</h2>
          <nav class="family-map-tabs" aria-label="Product category">
            <button v-for="tab in categoryTabs" :key="tab" type="button" :class="{ active: activeCategoryTab === tab }" @click="activeCategoryTab = tab">{{ tab }}</button>
          </nav>
        </div>
        <Transition name="tab-fade" mode="out-in">
          <div class="family-map-grid" :key="activeCategoryTab">
            <button v-for="family in activeFamilyMap" :key="family.title" type="button" class="tile-card" @click="emit('goToShop')">
              <span class="tile-media">
                <img :src="family.image" :alt="family.title" loading="lazy" />
              </span>
              <span class="tile-label">{{ family.title }}</span>
              <span class="tile-more">Explore →</span>
            </button>
          </div>
        </Transition>
      </div>
    </section>

    <section class="lifestyle-section">
      <div class="section-shell">
        <div ref="lifestyleHeadingRef" class="reveal-up lifestyle-heading">
          <p class="eyebrow">The SDSSS smart home</p>
          <h2>Solutions for every space</h2>
          <nav class="lifestyle-tabs" aria-label="Spaces">
            <button v-for="tab in lifestyleTabs" :key="tab" type="button" :class="{ active: activeLifestyleTab === tab }" @click="activeLifestyleTab = tab">{{ tab }}</button>
          </nav>
        </div>
        <Transition name="tab-fade" mode="out-in">
          <div class="lifestyle-grid" :key="activeLifestyleTab">
            <button v-for="product in activeLifestyleProducts" :key="product.name" type="button" class="tile-card" @click="emit('goToShop')">
              <span class="tile-media">
                <img :src="product.image" :alt="product.name" loading="lazy" />
              </span>
              <span class="tile-info">
                <span class="tile-title">{{ product.name }}</span>
                <span class="tile-note">{{ product.note }}</span>
                <span class="tile-more">More →</span>
              </span>
            </button>
          </div>
        </Transition>
      </div>
    </section>

    <section class="picks-section">
      <div class="section-shell">
        <div ref="picksHeadingRef" class="reveal-up picks-heading">
          <h2>Our top picks</h2>
          <nav class="pick-tabs" aria-label="Top pick categories">
            <button v-for="tab in pickTabs" :key="tab" type="button" :class="{ active: activePickTab === tab }" @click="activePickTab = tab">{{ tab }}</button>
          </nav>
        </div>

        <Transition name="tab-fade" mode="out-in">
          <div class="picks-grid" :key="activePickTab + pickOffset">
            <div v-for="product in visibleTopPicks" :key="product.name" class="tile-card">
              <span class="tile-media">
                <span v-if="product.tag" class="pick-tag">{{ product.tag }}</span>
                <img :src="product.image" :alt="product.name" loading="lazy" />
              </span>
              <span class="tile-info">
                <span class="tile-title">{{ product.name }}</span>
                <span class="tile-note">{{ product.note }}</span>
              </span>
            </div>
          </div>
        </Transition>

        <div class="picks-controls">
          <button type="button" @click="movePicks(-1)" aria-label="Previous products">‹</button>
          <button type="button" @click="movePicks(1)" aria-label="Next products">›</button>
        </div>
      </div>
    </section>

    <section class="action-section">
      <div class="section-shell action-shell">
        <div class="action-heading reveal-up">
          <h2>Security solutions for every need</h2>
          <p>From residential to commercial, we've got you covered with professional-grade equipment and expert installation.</p>
        </div>
        <div ref="actionGridRef" class="action-grid">
          <div class="action-card reveal-up" data-reveal style="transition-delay: 0ms">
            <span class="tile-media action-media">
              <img :src="guardsPhoto" alt="SDSSS security guard services" loading="lazy" />
            </span>
            <h3>Guard Services</h3>
            <p>Professional, uniformed security personnel for your premises</p>
            <button type="button" @click="emit('goToShop')">Learn more →</button>
          </div>
          <div class="action-card reveal-up" data-reveal style="transition-delay: 120ms">
            <span class="tile-media action-media">
              <img :src="hikvisionCctvKit" alt="Hikvision CCTV installation kit" loading="lazy" />
            </span>
            <h3>CCTV Installation</h3>
            <p>Complete Hikvision surveillance kits with expert setup</p>
            <button type="button" @click="emit('goToShop')">Get started →</button>
          </div>
          <div class="action-card reveal-up" data-reveal style="transition-delay: 240ms">
            <span class="tile-media action-media">
              <img :src="ezvizSmartLockCollection" alt="EZVIZ smart lock access control systems" loading="lazy" />
            </span>
            <h3>Access Control</h3>
            <p>EZVIZ and Hikvision entry management and monitoring</p>
            <button type="button" @click="emit('goToShop')">Explore →</button>
          </div>
        </div>
      </div>
    </section>

    <section ref="aboutRef" class="about-section reveal-up">
      <div class="section-shell about-shell">
        <div class="about-media">
          <img :src="logoImg" alt="SDSSS Security Systems" loading="lazy" />
        </div>
        <div class="about-copy">
          <p class="eyebrow">Founded 2009</p>
          <h2>Protecting homes and businesses across Pakistan</h2>
          <p>SDSSS is a PSQCA-licensed security agency serving 500+ clients nationwide — combining trained guard personnel with modern CCTV, access control and alarm technology to keep every site secure.</p>
          <button type="button" class="about-link" @click="emit('goToAbout')">Learn more about us →</button>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ── Shared tile card (used by every product grid) ─────────── */
.tile-card { position: relative; display: flex; flex-direction: column; text-align: left; background: #fff; border: 1px solid #eef1f4; border-radius: 14px; overflow: hidden; cursor: pointer; padding: 0; transition: transform 300ms cubic-bezier(.22,1,.36,1), box-shadow 300ms ease; }
.tile-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(15,23,42,.1); }
.tile-media { position: relative; display: flex; align-items: center; justify-content: center; aspect-ratio: 4/3; background: linear-gradient(150deg, #f4f7fb 0%, #e9eef5 100%); overflow: hidden; padding: 1.25rem; }
.tile-media img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; transition: transform 450ms ease; }
.tile-card:hover .tile-media img { transform: scale(1.08); }
.tile-label { padding: 1.1rem 1.25rem .25rem; font-size: 1.0625rem; font-weight: 700; color: #0f172a; }
.tile-info { display: flex; flex-direction: column; padding: 1.1rem 1.25rem 1.25rem; }
.tile-title { font-size: 1.0625rem; font-weight: 700; color: #0f172a; margin-bottom: .35rem; }
.tile-note { font-size: .875rem; color: #6c757d; margin-bottom: .6rem; }
.tile-more { padding: 0 1.25rem 1.1rem; font-size: .8125rem; font-weight: 700; color: #1676d2; }
.tile-info .tile-more { padding: 0; margin-top: auto; }
.pick-tag { position: absolute; z-index: 1; top: .75rem; right: .75rem; padding: .375rem .75rem; background: #1676d2; color: white; font-size: .75rem; font-weight: 700; border-radius: 999px; }

/* Tab-switch cross-fade */
.tab-fade-enter-active, .tab-fade-leave-active { transition: opacity 320ms ease, transform 320ms ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(10px); }
.tab-fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── Category grid ─────────────────────────────────────────── */
.family-map-section { padding: 4rem 1.5rem; background: white; }
.family-map-shell { max-width: 1280px; margin: 0 auto; }
.family-map-shell h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; text-align: center; margin-bottom: 1.5rem; }
.family-map-tabs { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
.family-map-tabs button { padding: .625rem 1.25rem; border: 1px solid #dee2e6; border-radius: 999px; background: white; font-size: .875rem; font-weight: 600; cursor: pointer; transition: all 180ms ease; }
.family-map-tabs button.active { border-color: #1676d2; color: #1676d2; background: #e7f3ff; }
.family-map-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }

/* ── Lifestyle / solutions section ─────────────────────────── */
.lifestyle-section { padding: 4rem 1.5rem; background: #f8f9fa; }
.lifestyle-heading { text-align: center; margin-bottom: 1.5rem; }
.lifestyle-heading .eyebrow { font-size: .875rem; color: #1676d2; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
.lifestyle-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 1.5rem; }
.lifestyle-tabs { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; }
.lifestyle-tabs button { padding: .625rem 1.25rem; border: 1px solid #dee2e6; border-radius: 999px; background: white; font-size: .875rem; font-weight: 600; cursor: pointer; transition: all 180ms ease; }
.lifestyle-tabs button.active { border-color: #1676d2; color: #1676d2; background: #e7f3ff; }
.lifestyle-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1280px; margin: 0 auto; }

/* ── Top picks ──────────────────────────────────────────────── */
.picks-section { padding: 4rem 1.5rem; background: white; }
.section-shell { max-width: 1280px; margin: 0 auto; }
.picks-heading { margin-bottom: 2.5rem; text-align: center; }
.picks-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 1.5rem; }
.pick-tabs { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; }
.pick-tabs button { padding: .625rem 1.25rem; border: 1px solid #dee2e6; border-radius: 999px; background: white; font-size: .875rem; font-weight: 600; cursor: pointer; transition: all 180ms ease; }
.pick-tabs button.active { border-color: #1676d2; color: #1676d2; background: #e7f3ff; }
.picks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.picks-controls { display: flex; gap: 1rem; justify-content: center; }
.picks-controls button { width: 3rem; height: 3rem; border: 1px solid #dee2e6; border-radius: 50%; background: white; font-size: 1.5rem; cursor: pointer; transition: all 180ms ease; }
.picks-controls button:hover { border-color: #1676d2; color: #1676d2; }

/* ── Action / service cards ─────────────────────────────────── */
.action-section { padding: 4rem 1.5rem; background: #f8f9fa; }
.action-heading { text-align: center; margin-bottom: 3rem; }
.action-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 1rem; }
.action-heading p { font-size: 1.125rem; color: #6c757d; max-width: 600px; margin: 0 auto; }
.action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.action-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 250ms ease, box-shadow 250ms ease, opacity 700ms cubic-bezier(.22,1,.36,1), translate 700ms cubic-bezier(.22,1,.36,1); }
.action-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,.1); }
.action-media { aspect-ratio: 16/9; padding: 1.75rem; }
.action-card h3 { font-size: 1.5rem; font-weight: 700; margin: 1.5rem 1.5rem 1rem; }
.action-card p { font-size: 1rem; color: #6c757d; margin: 0 1.5rem 1.5rem; }
.action-card button { margin: 0 1.5rem 1.5rem; padding: .75rem 1.5rem; border: none; background: #1676d2; color: white; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 180ms ease; }
.action-card button:hover { background: #0d5ea8; }

/* ── About teaser ───────────────────────────────────────────── */
.about-section { padding: 5rem 1.5rem; background: white; }
.about-shell { display: grid; grid-template-columns: .8fr 1.2fr; gap: 4rem; align-items: center; }
.about-media { display: flex; align-items: center; justify-content: center; padding: 3rem; border-radius: 20px; background: linear-gradient(150deg, #f4f7fb 0%, #e9eef5 100%); }
.about-media img { width: 100%; max-width: 220px; height: auto; object-fit: contain; }
.about-copy .eyebrow { font-size: .875rem; color: #1676d2; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
.about-copy h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
.about-copy p { font-size: 1.0625rem; color: #475569; line-height: 1.7; margin-bottom: 1.5rem; max-width: 560px; }
.about-link { border: 0; padding: .9rem 1.75rem; border-radius: 999px; background: #1676d2; color: white; font-weight: 700; cursor: pointer; transition: background 180ms ease, transform 180ms ease; }
.about-link:hover { background: #0d5ea8; transform: translateY(-2px); }

@media (max-width: 768px) {
  .family-map-grid, .picks-grid, .action-grid, .lifestyle-grid { grid-template-columns: 1fr; }
  .about-shell { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
  .about-copy p { margin-left: auto; margin-right: auto; }
}
</style>
