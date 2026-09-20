<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useScrollReveal, useChildReveal } from '../composables/useScrollReveal'

import logoImg from '../assets/logo of SDSSS.png'

// Product photography — each import name reflects what the photo actually
// shows (brand + device), since several were previously mislabeled.
import hikvisionCctvKit from '../assets/products/CCTV-camera-price-in-lahore-4-FHD-CCTV-Cameras-Package-hikvisionstore.pk_-1200x1108.jpg'
import hikvisionPtzCamera from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import ezvizSmartLockCollection from '../assets/products/ChatGPT Image Sep 20, 2026, 02_36_23 AM.png'
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

// Brand line-up photography for the product family map. Several tiles were
// cropped out of the per-brand range sheets so each brand has a full set.
import sonyPtzCameraBlack from '../assets/products/images (7).jpg'
import sonyIpelaBullet from '../assets/products/7793532-6577.jpg'
import sonyVandalDome from '../assets/products/sony-vandal-dome.jpg'
import sonyTurretCamera from '../assets/products/sony-turret.jpg'
import sonyOutdoorBullet from '../assets/products/sony-bullet-wall.jpg'
import sonyPtzSpeedDome from '../assets/products/sony-ptz-dome.jpg'

import samsungIrDome from '../assets/products/images (1).jpg'
import samsungWeatherproofBullet from '../assets/products/SCO-1020R__77596.webp'
import samsungIrBullet from '../assets/products/SDH-B74041_2_Supersize.jpg'
import samsungVandalDome from '../assets/products/samsung-vandal-dome.jpg'
import samsungTurretCamera from '../assets/products/samsung-turret.jpg'
import samsungPtzSpeedDome from '../assets/products/samsung-ptz-dome.jpg'
import samsungOutdoorBullet from '../assets/products/samsung-bullet-ir.jpg'
import samsungMiniCube from '../assets/products/samsung-mini-cube.jpg'

import boschFlushDome from '../assets/products/61bP3br6H4L._AC_UF1000,1000_QL80_.jpg'
import boschVandalDome from '../assets/products/bosch-vandal-dome.jpg'
import boschOutdoorBullet from '../assets/products/bosch-bullet-wall.jpg'
import boschTurretCamera from '../assets/products/bosch-turret.jpg'
import boschPtzSpeedDome from '../assets/products/bosch-ptz-dome.jpg'
import boschSmartHomeSystem from '../assets/products/konfigurator_vorschau_res_1984x1116.png'
import boschProfessionalRange from '../assets/products/images (6).jpg'

import hikvisionIpDome from '../assets/products/images (3).jpg'
import hikvisionMiniBullet from '../assets/products/images (5).jpg'
import hikvisionDoorStation from '../assets/products/images (24).jpg'
import hikvisionAccessTerminal from '../assets/products/images (25).jpg'
import hikvisionBarrierGate from '../assets/products/Untitled-design-2025-09-01T101621.663.jpg'

import ezvizDualLensPanTilt from '../assets/products/images (8).jpg'
import ezvizSpotlightPanTilt from '../assets/products/images (16).jpg'
import ezvizVideoDoorbell from '../assets/products/images (20).jpg'
import ezvizSolarDoorbellKit from '../assets/products/images (23).jpg'
import ezvizOutdoorWifiCamera from '../assets/products/3HMfCDNH8nZfvktqCcnerh-1280-80.jpg'

// Full brand line-up sheets for the cursor-driven showcase carousel.
import sonyRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_33_16 AM.png'
import samsungRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_23_45 AM.png'
import boschRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_12_48 AM.png'
import hikvisionRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_26_26 AM.png'
import ezvizRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_15_57 AM.png'

const emit = defineEmits<{ goToShop: []; goToAbout: [] }>()

/* ── Scroll-reveal wiring ─────────────────────────────────── */
const familyHeadingRef = ref<HTMLElement | null>(null)
const showcaseHeadingRef = ref<HTMLElement | null>(null)
const picksHeadingRef = ref<HTMLElement | null>(null)
const actionHeadingRef = ref<HTMLElement | null>(null)
const actionGridRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)

useScrollReveal(familyHeadingRef)
useScrollReveal(showcaseHeadingRef)
useScrollReveal(picksHeadingRef)
useScrollReveal(actionHeadingRef)
useChildReveal(actionGridRef)
useScrollReveal(aboutRef)

/* ── Category grid (tabbed) ───────────────────────────────── */
interface FamilyItem {
  title: string
  image: string
}

const categoryTabs = ['Sony', 'Samsung', 'BOSCH', 'Hikvision', 'EZVIZ']
const activeCategoryTab = ref('Sony')

const familyMapTabs: Record<string, FamilyItem[]> = {
  Sony: [
    { title: 'Sony SNC-CH160 IP Camera', image: sonyBulletCamera },
    { title: 'Sony IPELA HD Bullet', image: sonyIpelaBullet },
    { title: 'Sony SRG Series PTZ', image: sonyPtzCameraBlack },
    { title: 'Sony PTZ Speed Dome', image: sonyPtzSpeedDome },
    { title: 'Sony Vandal-Resistant Dome', image: sonyVandalDome },
    { title: 'Sony IR Turret Camera', image: sonyTurretCamera },
    { title: 'Sony Outdoor Bullet', image: sonyOutdoorBullet },
    { title: 'Sony Indoor Pan & Tilt', image: sonyIndoorCameraShowcase },
  ],
  Samsung: [
    { title: 'Samsung IR Dome Camera', image: samsungIrDome },
    { title: 'Samsung Vandal-Resistant Dome', image: samsungVandalDome },
    { title: 'Samsung PTZ Speed Dome', image: samsungPtzSpeedDome },
    { title: 'Samsung IR Turret Camera', image: samsungTurretCamera },
    { title: 'Samsung SCO-1020R Bullet', image: samsungWeatherproofBullet },
    { title: 'Samsung SDH-B74041 IR Bullet', image: samsungIrBullet },
    { title: 'Samsung Outdoor Bullet', image: samsungOutdoorBullet },
    { title: 'Samsung Mini Indoor Camera', image: samsungMiniCube },
  ],
  BOSCH: [
    { title: 'Bosch NBE-3703-AL IP Bullet', image: boschBulletCamera },
    { title: 'Bosch FlexiDome Flush Mount', image: boschFlushDome },
    { title: 'Bosch AutoDome PTZ', image: boschPtzSpeedDome },
    { title: 'Bosch Vandal-Resistant Dome', image: boschVandalDome },
    { title: 'Bosch Outdoor IR Bullet', image: boschOutdoorBullet },
    { title: 'Bosch IR Turret Camera', image: boschTurretCamera },
    { title: 'Bosch Professional Range', image: boschProfessionalRange },
    { title: 'Bosch Smart Home System', image: boschSmartHomeSystem },
  ],
  Hikvision: [
    { title: 'Hikvision DS-2DE4225IW PTZ', image: hikvisionPtzCamera },
    { title: 'Hikvision DS-2CE16D0T Bullet', image: hikvisionTurretCamera },
    { title: 'Hikvision IP Dome Camera', image: hikvisionIpDome },
    { title: 'Hikvision IR Turret Camera', image: hikvisionMiniDome },
    { title: 'Hikvision Mini IP Bullet', image: hikvisionMiniBullet },
    { title: 'Hikvision Video Door Station', image: hikvisionDoorStation },
    { title: 'Hikvision Access Terminal', image: hikvisionAccessTerminal },
    { title: 'Hikvision Barrier Gate', image: hikvisionBarrierGate },
  ],
  EZVIZ: [
    { title: 'EZVIZ Dual-Lens Pan & Tilt', image: ezvizDualLensPanTilt },
    { title: 'EZVIZ Outdoor Pan & Tilt', image: ezvizOutdoorPanTiltCamera },
    { title: 'EZVIZ Indoor Pan & Tilt', image: ezvizIndoorPanTiltCamera },
    { title: 'EZVIZ Spotlight Pan & Tilt', image: ezvizSpotlightPanTilt },
    { title: 'EZVIZ Outdoor Wi-Fi Camera', image: ezvizOutdoorWifiCamera },
    { title: 'EZVIZ Smart Door Lock', image: ezvizSmartDoorLock },
    { title: 'EZVIZ Video Doorbell', image: ezvizVideoDoorbell },
    { title: 'EZVIZ Solar Doorbell Kit', image: ezvizSolarDoorbellKit },
  ],
}

const activeFamilyMap = computed(() => familyMapTabs[activeCategoryTab.value] ?? familyMapTabs['Sony']!)

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

/* ── Cursor-driven brand showcase carousel ────────────────── */
const brandSheets = [
  { brand: 'Sony', image: sonyRangeSheet },
  { brand: 'Samsung', image: samsungRangeSheet },
  { brand: 'BOSCH', image: boschRangeSheet },
  { brand: 'Hikvision', image: hikvisionRangeSheet },
  { brand: 'EZVIZ', image: ezvizRangeSheet },
]

const showcaseSectionRef = ref<HTMLElement | null>(null)
const showcaseTrackRef = ref<HTMLElement | null>(null)

// Cursor position across the section maps to travel along the track; the
// current offset eases toward that target each frame so it glides.
const EASING = 0.075
let targetX = 0
let currentX = 0
let showcaseRaf = 0
let pointerDriven = false

const onShowcaseMove = (event: MouseEvent) => {
  const section = showcaseSectionRef.value
  const track = showcaseTrackRef.value
  if (!pointerDriven || !section || !track) return

  const rect = section.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  const maxTravel = Math.max(0, track.scrollWidth - rect.width)
  targetX = -ratio * maxTravel
}

const showcaseLoop = () => {
  currentX += (targetX - currentX) * EASING
  const track = showcaseTrackRef.value
  if (track) track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`
  showcaseRaf = requestAnimationFrame(showcaseLoop)
}

onMounted(() => {
  // Touch devices get native horizontal scrolling instead (see the CSS).
  pointerDriven = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (pointerDriven) showcaseRaf = requestAnimationFrame(showcaseLoop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(showcaseRaf)
})
</script>

<template>
  <div class="overflow-x-hidden">

    <HeroSection />

    <section class="family-map-section">
      <div class="family-map-shell">
        <div ref="familyHeadingRef" class="reveal-up">
          <h2>Product Family Map</h2>
          <nav class="family-map-tabs" aria-label="Brand">
            <button v-for="tab in categoryTabs" :key="tab" type="button" :class="{ active: activeCategoryTab === tab }" @click="activeCategoryTab = tab">{{ tab }}</button>
          </nav>
        </div>
        <Transition name="tab-fade" mode="out-in">
          <div class="family-map-grid" :key="activeCategoryTab">
            <button
              v-for="(family, i) in activeFamilyMap"
              :key="family.title"
              type="button"
              class="tile-card brand-tile"
              :style="{ animationDelay: `${i * 65}ms` }"
              @click="emit('goToShop')"
            >
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

    <section ref="showcaseSectionRef" class="showcase-section" @mousemove="onShowcaseMove">
      <div class="section-shell">
        <div ref="showcaseHeadingRef" class="reveal-up showcase-heading">
          <p class="eyebrow">Full brand line-ups</p>
          <h2>Every product, every brand</h2>
          <p class="showcase-hint">Move your cursor across to travel the range</p>
        </div>
      </div>
      <div class="showcase-viewport">
        <div ref="showcaseTrackRef" class="showcase-track">
          <figure v-for="sheet in brandSheets" :key="sheet.brand" class="showcase-slide">
            <img :src="sheet.image" :alt="`${sheet.brand} full product range`" loading="lazy" />
            <figcaption>{{ sheet.brand }}</figcaption>
          </figure>
        </div>
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
        <div ref="actionHeadingRef" class="action-heading reveal-up">
          <h2>Our Services</h2>
          <p>From residential to commercial, we've got you covered with professional-grade equipment and expert installation.</p>
        </div>
        <div ref="actionGridRef" class="action-grid">
          <div class="action-card reveal-up" data-reveal style="transition-delay: 0ms">
            <span class="tile-media action-media">
              <img :src="guardsPhoto" alt="SDSSS security guard services" loading="lazy" />
            </span>
            <h3>Guard Services</h3>
            <p>Professional, uniformed security personnel for your premises</p>
            <button type="button" @click="emit('goToShop')">Learn more</button>
          </div>
          <div class="action-card reveal-up" data-reveal style="transition-delay: 120ms">
            <span class="tile-media action-media">
              <img :src="hikvisionCctvKit" alt="Hikvision CCTV installation kit" loading="lazy" />
            </span>
            <h3>CCTV Installation</h3>
            <p>Complete Hikvision surveillance kits with expert setup</p>
            <button type="button" @click="emit('goToShop')">Get started</button>
          </div>
          <div class="action-card reveal-up" data-reveal style="transition-delay: 240ms">
            <span class="tile-media action-media">
              <img :src="ezvizSmartLockCollection" alt="EZVIZ smart lock access control systems" loading="lazy" />
            </span>
            <h3>Access Control</h3>
            <p>EZVIZ and Hikvision entry management and monitoring</p>
            <button type="button" @click="emit('goToShop')">Explore</button>
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
.tile-media { position: relative; display: flex; align-items: center; justify-content: center; aspect-ratio: 4/3; background: #fff; border-bottom: 1px solid #f1f5f9; overflow: hidden; padding: 1.25rem; }
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
.family-map-tabs button { padding: .625rem 1.4rem; border: 1px solid #dee2e6; border-radius: 999px; background: white; font-size: .875rem; font-weight: 700; letter-spacing: .02em; color: #475569; cursor: pointer; transition: transform 220ms cubic-bezier(.22,1,.36,1), color 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 220ms ease; }
.family-map-tabs button:hover { border-color: #9dc6ee; color: #1676d2; transform: translateY(-2px); }
.family-map-tabs button.active { border-color: #1676d2; color: #fff; background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); transform: translateY(-2px); box-shadow: 0 10px 22px rgba(22,118,210,.28); }

/* Cards fan in one after another whenever the brand changes. `backwards`
   (not `both`) so the tile releases its transform and hover-lift still works. */
.brand-tile { animation: brand-tile-in 520ms cubic-bezier(.22,1,.36,1) backwards; }
@keyframes brand-tile-in {
  from { opacity: 0; transform: translateY(22px) scale(.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .brand-tile { animation: none; }
  .family-map-tabs button { transition: color 180ms ease, background 180ms ease; }
  .family-map-tabs button:hover, .family-map-tabs button.active { transform: none; }
}
.family-map-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }

/* ── Lifestyle / solutions section ─────────────────────────── */
.showcase-section { padding: 4rem 0 5rem; background: #f8f9fa; overflow: hidden; }
.showcase-heading { text-align: center; margin-bottom: 2.25rem; padding: 0 1.5rem; }
.showcase-heading .eyebrow { font-size: .875rem; color: #1676d2; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
.showcase-heading h2 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: .75rem; }
.showcase-hint { font-size: .9375rem; color: #64748b; }

.showcase-viewport { overflow: hidden; }
.showcase-track { display: flex; gap: 1.75rem; padding: .5rem 1.5rem 1rem; width: max-content; will-change: transform; }
.showcase-slide { flex: 0 0 auto; width: min(80vw, 1000px); margin: 0; background: #fff; border: 1px solid #eef1f4; border-radius: 18px; overflow: hidden; box-shadow: 0 14px 34px rgba(15, 23, 42, .08); transition: box-shadow 300ms ease; }
.showcase-slide:hover { box-shadow: 0 20px 44px rgba(15, 23, 42, .14); }
.showcase-slide img { display: block; width: 100%; height: auto; }
.showcase-slide figcaption { padding: .95rem 1.35rem 1.15rem; font-size: 1.0625rem; font-weight: 700; color: #0f172a; }

/* Touch devices can't drive a cursor, so they swipe the track instead. */
@media (hover: none), (pointer: coarse) {
  .showcase-viewport { overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
  .showcase-track { transform: none !important; }
  .showcase-slide { width: min(88vw, 640px); scroll-snap-align: center; }
}

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
/* Sits between two other white sections, so a hairline does the separating
   that the old grey background used to. */
.action-section { padding: 5rem 1.5rem; background: #fff; border-top: 1px solid #eef2f6; border-bottom: 1px solid #eef2f6; }
.action-heading { text-align: center; margin-bottom: 3.25rem; }
.action-heading h2 { font-size: clamp(1.875rem, 4.5vw, 2.75rem); font-weight: 800; letter-spacing: -.02em; color: #0f172a; margin-bottom: 1rem; }
.action-heading p { font-size: 1.0625rem; line-height: 1.65; color: #64748b; max-width: 580px; margin: 0 auto; }
.action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.75rem; }

/* Quiet white cards: a hairline at rest, lift + soft shadow on hover.
   opacity/translate stay in the transition for the scroll reveal. */
.action-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e8ecf1;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: none;
  transition: transform 320ms cubic-bezier(.22,1,.36,1), box-shadow 320ms ease, border-color 320ms ease,
              opacity 700ms cubic-bezier(.22,1,.36,1), translate 700ms cubic-bezier(.22,1,.36,1);
}
.action-card:hover { transform: translateY(-6px); border-color: #d6e4f2; box-shadow: 0 18px 40px rgba(15,23,42,.09); }

.action-media { aspect-ratio: 16/10; padding: 1.75rem; }
.action-card:hover .action-media img { transform: scale(1.05); }

.action-card h3 { font-size: 1.1875rem; font-weight: 700; letter-spacing: -.01em; color: #0f172a; margin: 1.5rem 1.5rem .5rem; }
.action-card p { font-size: .9375rem; line-height: 1.65; color: #64748b; margin: 0 1.5rem 1.5rem; }

/* Text-link CTA rather than a filled button — lighter on a white page. */
.action-card button {
  align-self: flex-start;
  margin: auto 1.5rem 1.5rem;
  padding: 0;
  border: none;
  background: none;
  color: #1676d2;
  font-size: .9375rem;
  font-weight: 700;
  cursor: pointer;
  transition: color 180ms ease;
}
.action-card button::after { content: '→'; display: inline-block; margin-left: .4rem; transition: transform 280ms cubic-bezier(.22,1,.36,1); }
.action-card button:hover { color: #0d5ea8; }
.action-card:hover button::after, .action-card button:hover::after { transform: translateX(4px); }

@media (prefers-reduced-motion: reduce) {
  .action-card:hover { transform: none; }
  .action-card:hover .action-media img { transform: none; }
  .action-card:hover button::after, .action-card button:hover::after { transform: none; }
}

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
  .family-map-grid, .picks-grid, .action-grid { grid-template-columns: 1fr; }
  .about-shell { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
  .about-copy p { margin-left: auto; margin-right: auto; }
}
</style>
