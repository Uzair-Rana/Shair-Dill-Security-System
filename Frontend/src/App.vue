<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import HeaderNav  from './components/HeaderNav.vue'
import Footer     from './components/Footer.vue'
import HomePage   from './pages/HomePage.vue'
import ShopPage   from './pages/ShopPage.vue'
import ServicesPage from './pages/ServicesPage.vue'
import CareersPage from './pages/CareersPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ContactPage from './pages/ContactPage.vue'

type Page = 'home' | 'shop' | 'services' | 'careers' | 'about' | 'contact'

const currentPage = ref<Page>('home')

const navigate = (page: Page) => {
  if (currentPage.value === page) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  currentPage.value = page
}

watch(currentPage, async () => {
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'auto' })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <HeaderNav :current-page="currentPage" @navigate="navigate" />

    <main class="flex-1">
      <HomePage    v-if="currentPage === 'home'"    @go-to-shop="navigate('shop')" />
      <div         v-else-if="currentPage === 'shop'"    class="pt-[54px]"><ShopPage /></div>
      <ServicesPage v-else-if="currentPage === 'services'" />
      <CareersPage v-else-if="currentPage === 'careers'" />
      <AboutPage   v-else-if="currentPage === 'about'" />
      <ContactPage v-else-if="currentPage === 'contact'" />
    </main>

    <Footer />
  </div>
</template>
