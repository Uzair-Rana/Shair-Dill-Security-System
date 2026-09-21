<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import HeaderNav  from './components/HeaderNav.vue'
import Footer     from './components/Footer.vue'
import HomePage   from './pages/HomePage.vue'
import ShopPage   from './pages/ShopPage.vue'
import ServicesPage from './pages/ServicesPage.vue'
import CareersPage from './pages/CareersPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ContactPage from './pages/ContactPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import { findProduct } from './data/products'

type Page = 'home' | 'shop' | 'services' | 'careers' | 'about' | 'contact' | 'product'
type NavPage = Exclude<Page, 'product'>

const currentPage = ref<Page>('home')
const selectedProductId = ref<string | null>(null)

const selectedProduct = computed(() =>
  selectedProductId.value ? findProduct(selectedProductId.value) : undefined,
)

// HeaderNav has no "product" entry, so a product page highlights Shop.
const headerPage = computed<NavPage>(() =>
  currentPage.value === 'product' ? 'shop' : currentPage.value,
)

/**
 * Where to land after the next page switch. `null` means top of page; an
 * element id means scroll that section back into view, which is how the
 * product page returns you to the grid you clicked from.
 */
let pendingAnchor: string | null = null

/** Which home-page section the current product was opened from. */
const productOrigin = ref('product-family-map')

const navigate = (page: NavPage) => {
  if (currentPage.value === page) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  selectedProductId.value = null
  currentPage.value = page
}

const openProduct = (id: string, origin?: string) => {
  if (!findProduct(id)) return
  if (origin) productOrigin.value = origin
  selectedProductId.value = id
  currentPage.value = 'product'
}

/** Anchors that live on the shop page rather than the home page. */
const SHOP_ANCHORS = new Set(['shop-brands'])

/** Back from a product to the exact section it was opened from. */
const backToProducts = () => {
  pendingAnchor = productOrigin.value
  selectedProductId.value = null
  currentPage.value = SHOP_ANCHORS.has(productOrigin.value) ? 'shop' : 'home'
}

watch([currentPage, selectedProductId], async () => {
  await nextTick()

  if (pendingAnchor) {
    const target = document.getElementById(pendingAnchor)
    pendingAnchor = null
    if (target) {
      // Offset for the fixed 54px header.
      const top = target.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'auto' })
      return
    }
  }

  window.scrollTo({ top: 0, behavior: 'auto' })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <HeaderNav :current-page="headerPage" @navigate="navigate" />

    <main class="flex-1">
      <!-- HomePage is cached so the selected brand tab survives a trip to a
           product page and back. -->
      <KeepAlive include="HomePage">
        <HomePage
          v-if="currentPage === 'home'"
          @go-to-shop="navigate('shop')"
          @go-to-about="navigate('about')"
          @go-to-product="openProduct"
        />
        <div         v-else-if="currentPage === 'shop'"    class="pt-[54px]"><ShopPage @go-to-product="openProduct" /></div>
        <ServicesPage v-else-if="currentPage === 'services'" />
        <CareersPage v-else-if="currentPage === 'careers'" />
        <AboutPage   v-else-if="currentPage === 'about'" />
        <ContactPage v-else-if="currentPage === 'contact'" />
        <ProductDetailPage
          v-else-if="currentPage === 'product' && selectedProduct"
          :product="selectedProduct"
          @back="backToProducts"
          @go-home="navigate('home')"
          @go-to-contact="navigate('contact')"
          @select-product="openProduct"
        />
      </KeepAlive>
    </main>

    <Footer />
  </div>
</template>
