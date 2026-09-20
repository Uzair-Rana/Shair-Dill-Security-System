<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import SolutionsCarousel from '../components/SolutionsCarousel.vue'
import CurvedCarousel from '../components/CurvedCarousel.vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useScrollSpin } from '../composables/useScrollSpin'
import { brandOrder, findProduct, priceLabel, productsByBrand, serviceProducts, solutionProducts } from '../data/products'

import logoImg from '../assets/logo of SDSSS.png'

// Product photography — each import name reflects what the photo actually
// shows (brand + device), since several were previously mislabeled.

// Full brand line-up sheets for the cursor-driven showcase carousel.
import sonyRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_33_16 AM.png'
import samsungRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_23_45 AM.png'
import boschRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_12_48 AM.png'
import hikvisionRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_26_26 AM.png'
import ezvizRangeSheet from '../assets/products/ChatGPT Image Sep 20, 2026, 07_15_57 AM.png'

const emit = defineEmits<{ goToShop: []; goToAbout: []; goToProduct: [id: string, origin: string] }>()

/* ── Scroll-reveal wiring ─────────────────────────────────── */
const familyHeadingRef = ref<HTMLElement | null>(null)
const showcaseHeadingRef = ref<HTMLElement | null>(null)
const picksHeadingRef = ref<HTMLElement | null>(null)
const solutionsHeadingRef = ref<HTMLElement | null>(null)
const actionHeadingRef = ref<HTMLElement | null>(null)
const actionGridRef = ref<HTMLElement | null>(null)
const familyGridRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)

useScrollReveal(familyHeadingRef)
useScrollReveal(showcaseHeadingRef)
useScrollReveal(picksHeadingRef)
useScrollReveal(solutionsHeadingRef)
useScrollReveal(actionHeadingRef)
useScrollReveal(aboutRef)

/* ── Brand family map (tabbed) ────────────────────────────── */
const categoryTabs = [...brandOrder]
const activeCategoryTab = ref<string>('Sony')

const activeFamilyMap = computed(() => productsByBrand[activeCategoryTab.value] ?? productsByBrand['Sony']!)

/* ── Top picks (tabbed carousel) ──────────────────────────── */
// Entries reference the shared catalogue by id so a click can open the same
// detail page the family map uses; note/tag are pick-specific presentation.
interface PickEntry {
  id: string
  note: string
  tag?: string
}

const pickTabs = ['Bestsellers', 'Cameras', 'Locks & Access']

const pickEntries: Record<string, PickEntry[]> = {
  Bestsellers: [
    { id: 'hikvision-cctv-package', note: 'Complete 4-camera surveillance kit with DVR and hard drive.', tag: 'Best Value' },
    { id: 'hikvision-ds-2de4225iw', note: 'Pan-tilt-zoom camera with night vision.', tag: 'New' },
    { id: 'sony-snc-ch160', note: 'Crystal clear indoor/outdoor monitoring.' },
    { id: 'hikvision-turret', note: 'Weather-resistant outdoor protection.' },
    { id: 'ezviz-smart-lock-collection', note: 'A full range of keyless smart lock styles.', tag: 'Popular' },
    { id: 'samsung-dome-2mp', note: 'Reliable fixed-dome surveillance.' },
    { id: 'ezviz-wall-mount-camera', note: 'Wireless coverage for entrances and yards.' },
    { id: 'bosch-nbe-3703', note: 'Professional-grade outdoor monitoring.' },
  ],
  Cameras: [
    { id: 'hikvision-ds-2de4225iw', note: 'Professional pan-tilt-zoom camera.', tag: '4MP' },
    { id: 'samsung-dome-2mp', note: 'All-weather fixed-dome surveillance.' },
    { id: 'sony-snc-ch160', note: 'Smart tracking for indoor spaces.' },
    { id: 'ezviz-outdoor-pt', note: 'Remote pan-tilt surveillance camera.', tag: 'AI' },
    { id: 'hikvision-ds-2ce16d0t', note: 'Compact, durable outdoor protection.' },
    { id: 'hikvision-ip-dome', note: 'Discreet indoor ceiling monitoring.' },
  ],
  'Locks & Access': [
    { id: 'ezviz-smart-lock', note: 'Keyless entry with mobile control.', tag: 'Popular' },
    { id: 'ezviz-smart-lock-collection', note: 'Fingerprint, keypad and app-based entry.' },
    { id: 'hikvision-access-terminals', note: 'Fingerprint, face and keypad access control.', tag: 'Enterprise' },
    { id: 'ezviz-indoor-pt', note: 'Monitor entry points from indoors.' },
  ],
}

/** One continuous track across all three tabs, so scrolling past the end of a
    group flows into the next and the tab highlight follows the front card. */
const flatPicks = computed(() =>
  pickTabs.flatMap((tab) =>
    (pickEntries[tab] ?? []).flatMap((entry) => {
      const product = findProduct(entry.id)
      return product ? [{ ...product, note: entry.note, tag: entry.tag, group: tab }] : []
    }),
  ),
)

const pickIndex = ref(0)

const activePickTab = computed(() => flatPicks.value[pickIndex.value]?.group ?? pickTabs[0]!)

const jumpToPickTab = (tab: string) => {
  const first = flatPicks.value.findIndex((p) => p.group === tab)
  if (first >= 0) pickIndex.value = first
}

/* ── Scroll-scrubbed card rotation ────────────────────────── */
const { styleFor: serviceStyle } = useScrollSpin(actionGridRef, { columns: 3 })
const { styleFor: familyStyle, measure: measureFamily } = useScrollSpin(familyGridRef, { columns: 4 })

// The grid is re-keyed on tab change, so re-measure the new cards.
watch(activeCategoryTab, async () => {
  await nextTick()
  measureFamily()
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

    <section id="product-family-map" class="family-map-section">
      <div class="family-map-shell">
        <div ref="familyHeadingRef" class="reveal-up">
          <h2>Product Family Map</h2>
          <nav class="family-map-tabs" aria-label="Brand">
            <button v-for="tab in categoryTabs" :key="tab" type="button" :class="{ active: activeCategoryTab === tab }" @click="activeCategoryTab = tab">{{ tab }}</button>
          </nav>
        </div>
        <Transition name="tab-fade" mode="out-in">
          <div ref="familyGridRef" class="family-map-grid" :key="activeCategoryTab">
            <button
              v-for="(family, i) in activeFamilyMap"
              :key="family.title"
              type="button"
              class="tile-card brand-tile"
              :style="familyStyle(i)"
              @click="emit('goToProduct', family.id, 'product-family-map')"
            >
              <span class="tile-media">
                <img :src="family.image" :alt="family.title" loading="lazy" />
              </span>
              <span class="tile-label">{{ family.title }}</span>
              <span class="tile-price">{{ priceLabel(family) }}</span>
              <span class="tile-more">View details →</span>
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

    <section id="top-picks" class="picks-section">
      <div class="section-shell">
        <div ref="picksHeadingRef" class="reveal-up picks-heading">
          <h2>Our top picks</h2>
          <nav class="pick-tabs" aria-label="Top pick categories">
            <button
              v-for="tab in pickTabs"
              :key="tab"
              type="button"
              :class="{ active: activePickTab === tab }"
              :aria-pressed="activePickTab === tab"
              @click="jumpToPickTab(tab)"
            >{{ tab }}</button>
          </nav>
        </div>

        <CurvedCarousel
          v-model:index="pickIndex"
          class="picks-carousel"
          :count="flatPicks.length"
          :spacing="252"
          :depth="55"
          :tilt="9"
          :arc="17"
          :shrink="0.07"
          :fade="0.2"
          :step-by="2"
          :arrows="false"
          @select="(i: number) => emit('goToProduct', flatPicks[i]!.id, 'top-picks')"
        >
          <template #card="{ index, active }">
            <article class="pick-card" :class="{ active }">
              <span class="pick-media">
                <span v-if="flatPicks[index]!.tag" class="pick-tag">{{ flatPicks[index]!.tag }}</span>
                <img :src="flatPicks[index]!.image" :alt="flatPicks[index]!.title" draggable="false" loading="lazy" />
              </span>
              <span class="pick-body">
                <span class="pick-title">{{ flatPicks[index]!.title }}</span>
                <span class="pick-note">{{ flatPicks[index]!.note }}</span>
                <span class="pick-price">{{ priceLabel(flatPicks[index]!) }}</span>
                <span class="pick-more">View details →</span>
              </span>
            </article>
          </template>
        </CurvedCarousel>
      </div>
    </section>

    <section id="solutions" class="solutions-section">
      <div class="section-shell">
        <div ref="solutionsHeadingRef" class="reveal-up solutions-heading">
          <p class="eyebrow">Integrated systems</p>
          <h2>Complete security solutions</h2>
          <p>Beyond individual cameras — recording, perimeter detection, remote monitoring and central management, specified and installed as one system.</p>
        </div>
        <SolutionsCarousel
          :items="solutionProducts"
          @select="(id: string) => emit('goToProduct', id, 'solutions')"
        />
      </div>
    </section>

    <section id="our-services" class="action-section">
      <div class="section-shell action-shell">
        <div ref="actionHeadingRef" class="action-heading reveal-up">
          <h2>Our Services</h2>
          <p>From residential to commercial, we've got you covered with professional-grade equipment and expert installation.</p>
        </div>
        <div ref="actionGridRef" class="action-grid">
          <button
            v-for="(service, i) in serviceProducts"
            :key="service.id"
            type="button"
            class="action-card"
            :style="serviceStyle(i)"
            @click="emit('goToProduct', service.id, 'our-services')"
          >
            <span class="tile-media action-media">
              <img :src="service.image" :alt="service.title" loading="lazy" />
            </span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.category }}</p>
            <span class="action-price">{{ priceLabel(service) }}</span>
            <span class="action-link">View details →</span>
          </button>
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
.tile-price { padding: 0 1.25rem .35rem; font-size: .875rem; font-weight: 700; color: #475569; }
.tile-more { padding: 0 1.25rem 1.1rem; font-size: .8125rem; font-weight: 700; color: #1676d2; }
.tile-info .tile-price { padding: 0; margin-top: .5rem; }
.tile-info .tile-more { padding: 0; margin-top: .35rem; }
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

/* Entrance is scroll-driven from JS (useScrollSpin); a CSS animation here
   would win the cascade over the inline transform and fight it. */
.brand-tile { transform-style: preserve-3d; }

@media (prefers-reduced-motion: reduce) {
  .family-map-tabs button { transition: color 180ms ease, background 180ms ease; }
  .family-map-tabs button:hover, .family-map-tabs button.active { transform: none; }
}
.family-map-grid { perspective: 1400px; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }

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
.pick-tabs button.active { border-color: #1676d2; color: #fff; background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); box-shadow: 0 8px 18px rgba(22,118,210,.24); }
/* Gentle arc — much flatter than the solutions ring. */
.picks-carousel { --cc-card-w: 252px; --cc-height: 408px; --cc-perspective: 2200px; }

.pick-card { display: flex; flex-direction: column; background: #fff; border: 1px solid #e8ecf1; border-radius: 16px; overflow: hidden; text-align: left; box-shadow: 0 8px 22px rgba(15,23,42,.05); transition: border-color 300ms ease, box-shadow 300ms ease; }
.pick-card.active { cursor: pointer; border-color: #d6e4f2; box-shadow: 0 22px 44px rgba(15,23,42,.13); }

.pick-media { position: relative; display: flex; align-items: center; justify-content: center; aspect-ratio: 4/3; padding: 1.25rem; background: #fff; border-bottom: 1px solid #f1f5f9; overflow: hidden; }
.pick-media img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; -webkit-user-drag: none; }

.pick-body { display: flex; flex-direction: column; padding: 1rem 1.25rem 1.25rem; }
.pick-title { font-size: 1rem; font-weight: 700; letter-spacing: -.01em; color: #0f172a; line-height: 1.3; margin-bottom: .35rem; }
.pick-note { font-size: .8125rem; line-height: 1.55; color: #64748b; margin-bottom: .6rem; }
.pick-price { font-size: .9375rem; font-weight: 700; color: #475569; margin-bottom: .5rem; }
.pick-more { font-size: .8125rem; font-weight: 700; color: #1676d2; opacity: 0; transition: opacity 260ms ease; }
.pick-card.active .pick-more { opacity: 1; }

/* ── Integrated solutions ───────────────────────────────────── */
.solutions-section { padding: 4.5rem 1.5rem; background: #fff; border-top: 1px solid #eef2f6; }
.solutions-heading { text-align: center; margin-bottom: 3rem; }
.solutions-heading .eyebrow { font-size: .875rem; color: #1676d2; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
.solutions-heading h2 { font-size: clamp(1.875rem, 4.5vw, 2.75rem); font-weight: 800; letter-spacing: -.02em; color: #0f172a; margin-bottom: 1rem; }
.solutions-heading p { font-size: 1.0625rem; line-height: 1.65; color: #64748b; max-width: 640px; margin: 0 auto; }

/* ── Action / service cards ─────────────────────────────────── */
/* Sits between two other white sections, so a hairline does the separating
   that the old grey background used to. */
.action-section { padding: 5rem 1.5rem; background: #fff; border-top: 1px solid #eef2f6; border-bottom: 1px solid #eef2f6; }
.action-heading { text-align: center; margin-bottom: 3.25rem; }
.action-heading h2 { font-size: clamp(1.875rem, 4.5vw, 2.75rem); font-weight: 800; letter-spacing: -.02em; color: #0f172a; margin-bottom: 1rem; }
.action-heading p { font-size: 1.0625rem; line-height: 1.65; color: #64748b; max-width: 580px; margin: 0 auto; }
.action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.75rem; perspective: 1400px; }

/* Rotation is driven from JS (see serviceStyle) rather than a keyframe, so it
   tracks scroll position instead of firing once. */

/* Quiet white cards: a hairline at rest, lift + soft shadow on hover.
   opacity/translate stay in the transition for the scroll reveal. */
.action-card {
  transform-style: preserve-3d;
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
.action-card { text-align: left; padding: 0; cursor: pointer; font: inherit; }
.action-price { margin: 0 1.5rem .65rem; font-size: .9375rem; font-weight: 700; color: #475569; }
.action-link { margin: auto 1.5rem 1.5rem; font-size: .9375rem; font-weight: 700; color: #1676d2; transition: color 180ms ease; }
.action-link::after { content: '→'; display: inline-block; margin-left: .4rem; transition: transform 280ms cubic-bezier(.22,1,.36,1); }
.action-card:hover .action-link { color: #0d5ea8; }
.action-card:hover .action-link::after { transform: translateX(4px); }

@media (prefers-reduced-motion: reduce) {
  .action-card:hover { transform: none; }
  .action-card:hover .action-media img { transform: none; }
  .action-card:hover .action-link::after { transform: none; }
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
  .family-map-grid, .action-grid { grid-template-columns: 1fr; }
  .about-shell { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
  .about-copy p { margin-left: auto; margin-right: auto; }
}
</style>
