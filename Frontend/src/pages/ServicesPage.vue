<script setup lang="ts">
import smartHomeImage from '../assets/products/Security_system_product_array_la…_202609052309.jpeg'
import cameraImage from '../assets/products/Smart_indoor_security_camera_202609052309.jpeg'
import entryImage from '../assets/products/Smart_Touchscreen_Door_Controller_202609052309.jpeg'
import sensorImage from '../assets/products/Motion_sensor_product_photo_202609052309.jpeg'
import { ref } from 'vue'

const smartHomeCategories = [
  { title: 'Cameras', description: 'See every important moment.', image: cameraImage },
  { title: 'Smart Entry', description: 'Answer from anywhere.', image: entryImage },
  { title: 'Smart Control', description: 'Make your space work smarter.', image: sensorImage },
]

const sceneTabs = ['Home', 'Living room', 'Kitchen', 'Home office', 'Room', 'Yard']
const activeScene = ref('Home')

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <div class="smart-home-page">
    <section class="smart-home-hero" aria-labelledby="smart-home-title">
      <div class="smart-home-heading">
        <h1 id="smart-home-title">The SDSSS Smart Home</h1>
        <p>Everything in one place, for all families.</p>
      </div>
      <div class="smart-home-scene">
        <img :src="smartHomeImage" alt="Connected SDSSS smart home security system" />
        <nav class="scene-tabs" aria-label="Smart home spaces">
          <button
            v-for="tab in sceneTabs"
            :key="tab"
            type="button"
            :class="{ active: activeScene === tab }"
            @click="activeScene = tab"
          >{{ tab }}</button>
        </nav>
      </div>
      <div class="smart-home-floaters" aria-label="Smart home actions">
        <button type="button" aria-label="Back to top" @click="scrollToTop">⌃</button>
        <button type="button" aria-label="Open support">◉</button>
      </div>
    </section>

    <section class="smart-home-products" aria-labelledby="smart-home-products-title">
      <div class="smart-home-products-heading">
        <div>
          <p class="eyebrow">Explore SDSSS</p>
          <h2 id="smart-home-products-title">A smarter way to look after home.</h2>
        </div>
        <p>Start with one device or bring your whole space together with connected security.</p>
      </div>
      <div class="smart-home-product-grid">
        <article v-for="category in smartHomeCategories" :key="category.title" class="smart-home-product-card">
          <img :src="category.image" :alt="category.title" loading="lazy" />
          <div>
            <h3>{{ category.title }}</h3>
            <p>{{ category.description }}</p>
            <span>Explore <b>→</b></span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.smart-home-page { padding-top: 54px; background: #fff; color: #333; }
.smart-home-hero { min-height: min(820px, calc(100vh - 54px)); position: relative; overflow: hidden; background: #fff; }
.smart-home-heading { position: absolute; z-index: 2; top: clamp(3rem, 8vw, 7rem); left: max(1.2rem, calc((100% - 1400px) / 2)); }
.smart-home-heading h1 { margin: 0 0 .4rem; color: #222; font-family: var(--font-heading); font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.2; }
.smart-home-heading p { margin: 0; color: #888; font-size: .82rem; }
.smart-home-scene { position: absolute; inset: 10.5rem 0 0; display: flex; align-items: end; justify-content: center; overflow: hidden; background: linear-gradient(180deg, #faffff 0%, #f5fbfc 55%, #e8f1f2 100%); }
.smart-home-scene::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 100%, rgba(93, 185, 196, .18), transparent 58%); }
.smart-home-scene img { position: relative; width: min(1400px, 100%); height: 100%; object-fit: cover; object-position: center bottom; mix-blend-mode: multiply; }
.scene-tabs { position: absolute; z-index: 2; left: 50%; bottom: 1.4rem; display: flex; justify-content: center; gap: .8rem; width: min(900px, calc(100% - 2rem)); transform: translateX(-50%); }
.scene-tabs button { flex: 1 1 0; min-width: 0; border: 1px solid rgba(255, 255, 255, .55); border-radius: 999px; padding: .75rem 1rem; color: #25323a; background: rgba(255, 255, 255, .48); backdrop-filter: blur(8px); cursor: pointer; font-size: .78rem; white-space: nowrap; transition: background .2s ease, color .2s ease, transform .2s ease; }
.scene-tabs button:hover, .scene-tabs button.active { color: #14232b; background: rgba(255, 255, 255, .82); transform: translateY(-2px); }
.smart-home-floaters { position: absolute; z-index: 10; right: 1.5rem; top: 54%; display: grid; gap: .8rem; }
.smart-home-floaters button { width: 2.7rem; height: 2.7rem; border: 0; border-radius: 50%; color: #fff; background: #6aaeff; box-shadow: 0 4px 12px rgba(38, 102, 255, .2); cursor: pointer; font-size: 1.2rem; }
.smart-home-products { padding: 5.5rem max(1.2rem, calc((100% - 1200px) / 2)); background: #fff; }
.smart-home-products-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2rem; }
.eyebrow { margin: 0 0 .7rem; color: #2666ff; font-size: .7rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; }
.smart-home-products h2 { margin: 0; color: #222; font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 400; line-height: 1; }
.smart-home-products-heading > p { max-width: 300px; margin: 0; color: #777; font-size: .9rem; line-height: 1.6; }
.smart-home-product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.smart-home-product-card { overflow: hidden; border: 1px solid #e7ecee; background: #fff; }
.smart-home-product-card img { display: block; width: 100%; height: 220px; object-fit: cover; transition: transform .45s ease; }
.smart-home-product-card:hover img { transform: scale(1.05); }
.smart-home-product-card > div { padding: 1.2rem; }
.smart-home-product-card h3 { margin: 0 0 .35rem; color: #222; font-size: 1.1rem; font-weight: 500; }
.smart-home-product-card p { margin: 0 0 1rem; color: #777; font-size: .85rem; }
.smart-home-product-card span { color: #2666ff; font-size: .8rem; font-weight: 500; }
.smart-home-product-card b { margin-left: .4rem; }
@media (max-width: 700px) {
  .smart-home-heading { top: 2.5rem; left: 1.2rem; }
  .smart-home-hero { min-height: 660px; }
  .smart-home-scene { inset: 8rem 0 0; }
  .smart-home-scene img { object-fit: contain; height: 75%; align-self: end; }
  .scene-tabs { bottom: .85rem; gap: .35rem; overflow-x: auto; justify-content: flex-start; padding: 0 .3rem; }
  .scene-tabs button { flex: 0 0 auto; padding: .6rem .9rem; font-size: .7rem; }
  .smart-home-products { padding: 4rem 1.2rem; }
  .smart-home-products-heading { align-items: start; flex-direction: column; }
  .smart-home-product-grid { grid-template-columns: 1fr; }
}
</style>
