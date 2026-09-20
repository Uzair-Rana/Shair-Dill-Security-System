<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logoImg from '../assets/logo of SDSSS.png'

interface Props {
  currentPage?: 'home' | 'shop' | 'services' | 'careers' | 'about' | 'contact'
}
withDefaults(defineProps<Props>(), { currentPage: 'home' })

const emit = defineEmits<{ navigate: [page: 'home' | 'shop' | 'services' | 'careers' | 'about' | 'contact'] }>()

const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Home', page: 'home' as const },
  { label: 'Security Cameras', page: 'shop' as const, desc: 'Indoor & outdoor security' },
  { label: 'Smart Home', page: 'services' as const, desc: 'Connected home solutions' },
  { label: 'Business', page: 'shop' as const, desc: 'Solutions for every site' },
  { label: 'Support', page: 'contact' as const, desc: 'Help & downloads' },
  { label: 'About SDSSS', page: 'about' as const, desc: 'Our story' },
]

const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const handleNav = (page: 'home' | 'shop' | 'services' | 'careers' | 'about' | 'contact') => {
  mobileOpen.value = false
  emit('navigate', page)
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3">
    <div :class="[
      'w-full max-w-[1400px] mx-auto rounded-full transition-all duration-300 ezviz-header glass-nav',
      scrolled && 'glass-nav--scrolled',
    ]">
      <div class="px-5 sm:px-8">
        <div class="flex items-center justify-between h-[54px]">

          <!-- Logo -->
          <button @click="handleNav('home')" class="flex items-center gap-3 flex-shrink-0" aria-label="Go to homepage">
            <div class="w-10 h-10 overflow-hidden flex-shrink-0 p-1">
              <img :src="logoImg" alt="SDSSS Logo" class="w-full h-full object-contain" />
            </div>
            <span class="hidden sm:block text-[15px] font-medium tracking-tight">
              <span class="text-[#E9C874]">SDSSS</span>
              <span class="text-[#E9C874]/70"> Security Systems</span>
            </span>
          </button>

          <!-- Desktop nav -->
          <nav class="hidden lg:flex items-center gap-2">
            <button
              v-for="link in navLinks" :key="link.label"
              @click="handleNav(link.page)"
              :class="[
                'text-[14px] font-normal px-3 transition-colors duration-200 nav-link text-[#E9C874]',
                (link.page === currentPage) ? 'font-semibold' : 'opacity-80 hover:opacity-100',
              ]"
            >{{ link.label }}</button>
          </nav>

          <!-- Right actions -->
          <div class="flex items-center gap-1">
            <button type="button" aria-label="Search products" class="header-icon" @click="handleNav('shop')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            </button>
            <button type="button" aria-label="Account" class="header-icon hidden sm:inline-flex" @click="handleNav('contact')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
            </button>
            <button type="button" aria-label="Shopping cart" class="header-icon hidden sm:inline-flex" @click="handleNav('shop')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2.5 3h2.6l2.4 11.6a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.1L21.5 7H6"/></svg>
            </button>
            <button @click="handleNav('shop')" style="border-radius: 10px;" class="hidden md:inline-flex items-center justify-center text-[13px] font-medium px-6 py-2.5 transition-all duration-200 active:scale-[0.97] bg-[#D4AF37] text-black hover:bg-[#C5A059]">
              Shop now
            </button>

            <button @click="mobileOpen = !mobileOpen"
              class="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#E9C874] hover:bg-white/15 transition-colors"
              aria-label="Toggle menu"
            >
              <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="mobileOpen" class="lg:hidden py-4 px-2 glass-nav glass-nav--menu">
            <nav class="flex flex-col mb-4">
              <button
                v-for="link in navLinks" :key="link.label"
                @click="handleNav(link.page)"
                :class="[
                  'text-left px-3 py-2.5 text-[15px] transition-colors w-full rounded-lg text-[#E9C874]',
                  (link.page === currentPage)
                    ? 'font-semibold bg-white/10'
                    : 'opacity-80 hover:opacity-100 hover:bg-white/10',
                ]"
              >{{ link.label }}</button>
            </nav>
            <button @click="handleNav('shop')" style="border-radius: 10px;" class="w-full bg-[#D4AF37] text-black font-medium py-2.5 text-[14px] hover:bg-[#C5A059] active:scale-[0.98] transition-all">
              Shop now
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
