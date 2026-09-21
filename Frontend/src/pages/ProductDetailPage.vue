<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { priceLabel, relatedProducts, type Product } from '../data/products'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ back: []; goHome: []; goToContact: []; selectProduct: [id: string] }>()

const related = computed(() => relatedProducts(props.product))

const mediaRef = ref<HTMLElement | null>(null)
// Re-run the image entrance when switching to a related product.
const mediaKey = ref(0)
watch(() => props.product.id, () => { mediaKey.value += 1 })
</script>

<template>
  <div class="pdp">
    <div class="pdp-shell">
      <button type="button" class="pdp-back" @click="emit('back')">
        <span class="pdp-back-arrow" aria-hidden="true">←</span>
        Back to products
      </button>

      <nav class="pdp-crumbs" aria-label="Breadcrumb">
        <button type="button" @click="emit('goHome')">Home</button>
        <span aria-hidden="true">/</span>
        <span>{{ product.brand }}</span>
        <span aria-hidden="true">/</span>
        <span class="current">{{ product.title }}</span>
      </nav>

      <div class="pdp-main">
        <div ref="mediaRef" :key="mediaKey" class="pdp-media">
          <img :src="product.image" :alt="product.title" />
        </div>

        <div class="pdp-info">
          <p class="pdp-brand">{{ product.brand }} · {{ product.category }}</p>
          <h1>{{ product.title }}</h1>

          <p class="pdp-price">
            {{ priceLabel(product) }}
            <span v-if="product.price > 0" class="pdp-price-note">{{ product.priceNote ?? 'incl. standard installation' }}</span>
          </p>

          <p class="pdp-description">{{ product.description }}</p>

          <ul class="pdp-highlights">
            <li v-for="point in product.highlights" :key="point">{{ point }}</li>
          </ul>

          <div class="pdp-actions">
            <button type="button" class="pdp-cta" @click="emit('goToContact')">Request a quote</button>
            <button type="button" class="pdp-ghost" @click="emit('back')">Back to products</button>
          </div>
        </div>
      </div>

      <section class="pdp-specs">
        <h2>Specifications</h2>
        <dl>
          <div v-for="spec in product.specs" :key="spec.label" class="pdp-spec-row">
            <dt>{{ spec.label }}</dt>
            <dd>{{ spec.value }}</dd>
          </div>
        </dl>
      </section>

      <section v-if="related.length" class="pdp-related">
        <h2>More from {{ product.brand }}</h2>
        <div class="pdp-related-grid">
          <button
            v-for="item in related"
            :key="item.id"
            type="button"
            class="pdp-related-card"
            @click="emit('selectProduct', item.id)"
          >
            <span class="pdp-related-media">
              <img :src="item.image" :alt="item.title" loading="lazy" />
            </span>
            <span class="pdp-related-title">{{ item.title }}</span>
            <span class="pdp-related-price">{{ priceLabel(item) }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.pdp { padding: 6rem 1.5rem 5rem; background: #fff; }
.pdp-shell { max-width: 1180px; margin: 0 auto; }

/* Primary "one step back" control — returns to the grid this was opened from. */
.pdp-back { display: inline-flex; align-items: center; gap: .55rem; margin-bottom: 1.25rem; padding: .6rem 1.15rem .6rem .95rem; border: 1px solid #e2e8f0; border-radius: 999px; background: #fff; color: #0f172a; font-size: .875rem; font-weight: 700; cursor: pointer; transition: border-color 200ms ease, color 200ms ease, box-shadow 200ms ease; }
.pdp-back:hover { border-color: #1676d2; color: #1676d2; box-shadow: 0 6px 16px rgba(15,23,42,.07); }
.pdp-back-arrow { display: inline-block; transition: transform 260ms cubic-bezier(.22,1,.36,1); }
.pdp-back:hover .pdp-back-arrow { transform: translateX(-3px); }

.pdp-crumbs { display: flex; align-items: center; gap: .5rem; font-size: .8125rem; color: #94a3b8; margin-bottom: 2.25rem; flex-wrap: wrap; }
.pdp-crumbs button { background: none; border: none; padding: 0; font: inherit; color: #1676d2; font-weight: 600; cursor: pointer; }
.pdp-crumbs button:hover { text-decoration: underline; }
.pdp-crumbs .current { color: #0f172a; font-weight: 600; }

.pdp-main { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }

.pdp-media { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; background: #fff; border: 1px solid #e8ecf1; border-radius: 20px; padding: 2.5rem; overflow: hidden; animation: pdp-media-in 560ms cubic-bezier(.22,1,.36,1) backwards; }
.pdp-media img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }
@keyframes pdp-media-in { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: none; } }

.pdp-brand { font-size: .8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #1676d2; margin-bottom: .75rem; }
.pdp-info h1 { font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 800; letter-spacing: -.02em; color: #0f172a; line-height: 1.15; margin-bottom: 1.25rem; }

.pdp-price { display: flex; align-items: baseline; gap: .75rem; flex-wrap: wrap; font-size: 1.75rem; font-weight: 800; color: #0f172a; margin-bottom: 1.5rem; }
.pdp-price-note { font-size: .8125rem; font-weight: 600; color: #94a3b8; }

.pdp-description { font-size: 1rem; line-height: 1.75; color: #475569; margin-bottom: 1.75rem; }

.pdp-highlights { list-style: none; padding: 0; margin: 0 0 2rem; display: grid; gap: .625rem; }
.pdp-highlights li { position: relative; padding-left: 1.6rem; font-size: .9375rem; color: #334155; }
.pdp-highlights li::before { content: '✓'; position: absolute; left: 0; color: #1676d2; font-weight: 700; }

.pdp-actions { display: flex; gap: .875rem; flex-wrap: wrap; }
.pdp-cta { padding: .875rem 1.75rem; border: none; border-radius: 10px; background: #1676d2; color: #fff; font-size: .9375rem; font-weight: 700; cursor: pointer; transition: background 180ms ease, transform 220ms cubic-bezier(.22,1,.36,1); }
.pdp-cta:hover { background: #0d5ea8; transform: translateY(-2px); }
.pdp-ghost { padding: .875rem 1.75rem; border: 1px solid #dee2e6; border-radius: 10px; background: #fff; color: #475569; font-size: .9375rem; font-weight: 700; cursor: pointer; transition: border-color 180ms ease, color 180ms ease; }
.pdp-ghost:hover { border-color: #1676d2; color: #1676d2; }

.pdp-specs { margin-top: 4rem; padding-top: 3rem; border-top: 1px solid #eef2f6; }
.pdp-specs h2, .pdp-related h2 { font-size: 1.375rem; font-weight: 800; letter-spacing: -.01em; color: #0f172a; margin-bottom: 1.5rem; }
.pdp-specs dl { margin: 0; display: grid; gap: 0; max-width: 680px; }
.pdp-spec-row { display: grid; grid-template-columns: 220px 1fr; gap: 1rem; padding: .875rem 0; border-bottom: 1px solid #f1f5f9; }
.pdp-spec-row dt { font-size: .9375rem; font-weight: 700; color: #0f172a; margin: 0; }
.pdp-spec-row dd { font-size: .9375rem; color: #475569; margin: 0; }

.pdp-related { margin-top: 4rem; padding-top: 3rem; border-top: 1px solid #eef2f6; }
.pdp-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
.pdp-related-card { display: flex; flex-direction: column; text-align: left; background: #fff; border: 1px solid #C5A059; border-radius: 14px; overflow: hidden; padding: 0; cursor: pointer; transition: transform 300ms cubic-bezier(.22,1,.36,1), box-shadow 300ms ease, border-color 300ms ease; }
.pdp-related-card:hover { transform: translateY(-6px); border-color: #D4AF37; box-shadow: 0 16px 32px rgba(15,23,42,.09); }
.pdp-related-media { display: flex; align-items: center; justify-content: center; aspect-ratio: 4/3; padding: 1.25rem; background: #fff; border-bottom: 1px solid #f1f5f9; overflow: hidden; }
.pdp-related-media img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; transition: transform 450ms ease; }
.pdp-related-card:hover .pdp-related-media img { transform: scale(1.07); }
.pdp-related-title { padding: .9rem 1rem .25rem; font-size: .9375rem; font-weight: 700; color: #0f172a; }
.pdp-related-price { padding: 0 1rem 1rem; font-size: .875rem; font-weight: 600; color: #1676d2; }

@media (max-width: 900px) {
  .pdp-main { grid-template-columns: 1fr; gap: 2rem; }
  .pdp-spec-row { grid-template-columns: 1fr; gap: .25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .pdp-media { animation: none; }
  .pdp-cta:hover, .pdp-related-card:hover { transform: none; }
  .pdp-related-card:hover .pdp-related-media img { transform: none; }
}
</style>
