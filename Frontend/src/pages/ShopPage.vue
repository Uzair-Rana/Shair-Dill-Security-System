<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'

import bgGradientTransition from '../assets/Backgrounds/Gradient_background_transitionin…_2K_202609091340.jpeg'
import dahuaDomeImg from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import hikvisionNvrImg from '../assets/products/SDH-B74041_2_Supersize.jpg'
import biometricTerminalImg from '../assets/products/ChatGPT Image Sep 20, 2026, 02_36_23 AM.png'
import anprCameraImg from '../assets/products/images (10).jpg'
import alarmSirenImg from '../assets/products/BOS-NBE-3703-AL.webp'
import turretCameraImg from '../assets/products/DS-2CE16D0T-EXIPF-3.6mm-price-in-pakistan-hikvisionstore.pk_.png'
import gpsTrackerImg from '../assets/products/images (20).jpg'
import emLockImg from '../assets/products/images (15).jpg'
import dahua16ChImg from '../assets/products/ChatGPT Image Sep 20, 2026, 02_47_35 AM.png'
import ptzCameraImg from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import cat6CableImg from '../assets/products/ChatGPT Image Sep 20, 2026, 02_58_15 AM.png'
import rfidReaderImg from '../assets/products/images (19).jpg'
import smartIndoorCameraImg from '../assets/products/sony-snc-ch160-ip-camera.jpg'
import motionSensorImg from '../assets/products/images (17).jpg'
import keyFobsImg from '../assets/products/images (16).jpg'
import videoDoorbellImg from '../assets/products/61XkDOqfaOL.jpg'

const categories = [
  { id: 'cctv',      label: 'CCTV Cameras',       count: 48 },
  { id: 'gps',       label: 'GPS & Trackers',      count: 21 },
  { id: 'biometric', label: 'Biometric & Access',  count: 34 },
  { id: 'anpr',      label: 'ANPR/LPR Systems',    count: 12 },
  { id: 'alarms',    label: 'Alarms',              count: 27 },
  { id: 'accessories', label: 'Accessories',       count: 63 },
]

const selectedCategories = ref<string[]>(['cctv', 'biometric'])
const inStockOnly = ref(false)
const priceRange = ref(60)
const mobileFiltersOpen = ref(false)
const sortBy = ref('featured')

const priceMin = 0
const priceMax = 200000

const displayPrice = computed(
  () => 'PKR ' + (priceMin + Math.round((priceRange.value / 100) * (priceMax - priceMin))).toLocaleString('en-PK'),
)

const priceTrackStyle = computed(() => ({
  background: `linear-gradient(to right, #5FA8E0 0%, #5FA8E0 ${priceRange.value}%, #C5DEF5 ${priceRange.value}%, #C5DEF5 100%)`,
}))

const products = [
  { name: 'Dahua 4MP IP Dome Camera (IPC-HDBW2431E)',       price: 'PKR 24,500',  tag: 'Best Seller', category: 'cctv',        image: dahuaDomeImg },
  { name: 'Hikvision 8-Channel PoE NVR 4K (DS-7608NXI)',    price: 'PKR 42,999',  tag: 'New',         category: 'cctv',        image: hikvisionNvrImg },
  { name: 'ZKteco F22 Biometric Fingerprint Terminal',       price: 'PKR 18,750',  tag: '',            category: 'biometric',   image: biometricTerminalImg },
  { name: 'Long Range ANPR LPR Camera 2MP HD',               price: 'PKR 98,000',  tag: 'Pro',         category: 'anpr',        image: anprCameraImg },
  { name: 'Honeywell Wireless Alarm Strobe & Siren Kit',     price: 'PKR 32,400',  tag: '',            category: 'alarms',      image: alarmSirenImg },
  { name: 'CP Plus 2MP Turret CCTV Camera Starlight',        price: 'PKR 11,200',  tag: 'Sale',        category: 'cctv',        image: turretCameraImg },
  { name: 'Vehicle GPS Tracker with Live Map (TK103B)',      price: 'PKR 8,950',   tag: '',            category: 'gps',         image: gpsTrackerImg },
  { name: 'EM Lock 600lbs Magnetic Door with Sensor',        price: 'PKR 14,200',  tag: '',            category: 'biometric',   image: emLockImg },
  { name: 'Dahua 16-Channel DVR 1080p Lite H.265+',          price: 'PKR 28,750',  tag: '',            category: 'cctv',        image: dahua16ChImg },
  { name: 'PTZ Speed Dome IP Camera 25x Optical Zoom',       price: 'PKR 156,000', tag: 'Premium',     category: 'cctv',        image: ptzCameraImg },
  { name: 'Cat6e Cable 305m Roll Box Pure Copper',           price: 'PKR 7,800',   tag: '',            category: 'accessories', image: cat6CableImg },
  { name: 'RFID Card Reader Wiegand 26/34 Waterproof',       price: 'PKR 9,450',   tag: '',            category: 'biometric',   image: rfidReaderImg },
  { name: 'Smart Indoor WiFi Security Camera 2K',            price: 'PKR 12,900',  tag: 'New',         category: 'cctv',        image: smartIndoorCameraImg },
  { name: 'PIR Motion Sensor Pet Immune Wireless',           price: 'PKR 5,250',   tag: '',            category: 'alarms',      image: motionSensorImg },
  { name: 'Access Control Key Fobs + Cards Pack (10 pcs)',   price: 'PKR 3,200',   tag: '',            category: 'accessories', image: keyFobsImg },
  { name: 'Smart Video Doorbell Camera 1080p WiFi',          price: 'PKR 16,500',  tag: 'New',         category: 'cctv',        image: videoDoorbellImg },
]

const pageCount = 6
const currentPage = ref(1)

const cartItems = ref<Array<{ name: string; price: string; quantity: number }>>([])
const showCart = ref(false)

const handleAddToCart = (item: { name: string; price: string }) => {
  const existingItem = cartItems.value.find(cartItem => cartItem.name === item.name)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({ ...item, quantity: 1 })
  }
}

const removeFromCart = (name: string) => {
  cartItems.value = cartItems.value.filter(item => item.name !== name)
}

const getTotalItems = () => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
}
</script>

<template>
  <section class="bg-white text-[#1D1D1F] min-h-screen">

    <!-- ── Page Banner ──────────────────────────────────────────────────────── -->
    <div class="relative overflow-hidden bg-white">
      <div class="absolute inset-0 pointer-events-none">
        <img :src="bgGradientTransition" alt="" class="w-full h-full object-cover opacity-40" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/10 pointer-events-none" />
      <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#5FA8E0]/10 blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div class="absolute bottom-0 left-10 w-64 h-64 border border-[#C5DEF5] rounded-full -translate-y-1/4 pointer-events-none" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-[#6E6E73] mb-5 flex-wrap">
          <a href="#" class="hover:text-[#5FA8E0] transition-colors font-medium">Home</a>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span class="text-[#1D1D1F] font-semibold">All Products</span>
        </nav>

        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#5FA8E0] mb-4">
            <span class="w-8 h-px rounded-full bg-[#5FA8E0]/40"></span>
            SDSSS Security Store
          </div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-[#1D1D1F] mb-4 leading-[1.15] tracking-tight">
            Professional Security Products
          </h1>
          <p class="text-[#1D1D1F]/75 text-base md:text-lg max-w-2xl leading-relaxed">
            Professional-grade CCTV cameras, access control systems, GPS trackers, alarms, and accessories — all backed by manufacturer warranty and SDSSS installation support.
          </p>
        </div>
      </div>
    </div>

    <!-- ── Filter + Results ─────────────────────────────────────────────────── -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

      <!-- Cart Button (Mobile & Desktop) -->
      <button
        @click="showCart = !showCart"
        class="fixed top-20 right-5 sm:top-24 sm:right-8 z-40 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3b82f6] text-white font-semibold text-sm hover:bg-[#2563eb] transition-all shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <span v-if="getTotalItems() > 0" class="bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{{ getTotalItems() }}</span>
        <span v-else>Cart</span>
      </button>

      <!-- Cart Panel -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div v-if="showCart" class="fixed top-0 right-0 w-full sm:w-96 h-screen bg-white shadow-2xl z-50 overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-[#0f172a]">Shopping Cart</h2>
              <button @click="showCart = false" class="text-[#6E6E73] hover:text-[#0f172a]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div v-if="cartItems.length === 0" class="text-center py-12">
              <p class="text-[#6E6E73]">Your cart is empty</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="item in cartItems" :key="item.name" class="border border-[#C5DEF5] rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p class="font-semibold text-[#0f172a]">{{ item.name }}</p>
                  <p class="text-[#3b82f6] font-bold">{{ item.price }}</p>
                  <p class="text-sm text-[#6E6E73]">Qty: {{ item.quantity }}</p>
                </div>
                <button
                  @click="removeFromCart(item.name)"
                  class="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>

              <div class="border-t border-[#C5DEF5] pt-4 mt-6">
                <p class="text-lg font-bold text-[#0f172a]">Total Items: {{ getTotalItems() }}</p>
              </div>

              <button
                class="w-full bg-[#3b82f6] text-white font-semibold rounded-lg py-3 hover:bg-[#2563eb] transition-all mt-6"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Cart Overlay -->
      <div v-if="showCart" @click="showCart = false" class="fixed inset-0 bg-black/30 z-40 sm:hidden"></div>

      <!-- Mobile toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7 lg:hidden">
        <div class="flex items-center gap-3">
          <button
            @click="mobileFiltersOpen = !mobileFiltersOpen"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C5DEF5] bg-white text-[#1D1D1F] font-semibold text-sm hover:border-[#5FA8E0] hover:bg-[#E8F1FA] transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#5FA8E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Filters
            <span class="ml-1 px-2 py-0.5 text-[10px] bg-[#5FA8E0] text-white rounded-full font-extrabold">
              {{ selectedCategories.length + (inStockOnly ? 1 : 0) }}
            </span>
          </button>
          <span class="text-sm text-[#6E6E73]">
            Showing <b class="text-[#1D1D1F]">{{ products.length }}</b> of <b class="text-[#1D1D1F]">205</b> products
          </span>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-[#6E6E73] font-semibold whitespace-nowrap">Sort by:</label>
          <select v-model="sortBy" class="rounded-xl border border-[#C5DEF5] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/20 focus:border-[#5FA8E0]/60 shadow-sm">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div class="flex gap-6 md:gap-8 lg:gap-10">

        <!-- ── Sidebar ───────────────────────────────────────────────────────── -->
        <aside :class="['lg:block lg:w-[260px] lg:flex-shrink-0', mobileFiltersOpen ? 'block' : 'hidden']">
          <div class="lg:sticky lg:top-28 space-y-5">

            <!-- Mobile close -->
            <div class="flex items-center justify-between lg:hidden">
              <h3 class="font-extrabold text-[#1D1D1F] text-lg">Filters</h3>
              <button @click="mobileFiltersOpen = false" class="p-2 rounded-lg text-[#6E6E73] hover:bg-[#E8F1FA] hover:text-[#5FA8E0]" aria-label="Close filters">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Categories -->
            <div class="bg-white border border-[#C5DEF5] rounded-2xl p-5 shadow-sm">
              <h4 class="text-[12px] font-extrabold tracking-wider uppercase text-[#5FA8E0] mb-4 pb-3 border-b border-[#E8F4FC]">
                Product Categories
              </h4>
              <div class="space-y-1">
                <label v-for="c in categories" :key="c.id"
                  class="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-xl hover:bg-[#E8F1FA] transition-colors"
                >
                  <span class="relative flex-shrink-0 flex items-center justify-center">
                    <input type="checkbox" :value="c.id" v-model="selectedCategories" class="sr-only peer" />
                    <span class="w-5 h-5 rounded-md border-2 border-[#C5DEF5] peer-checked:bg-[#5FA8E0] peer-checked:border-[#5FA8E0] flex items-center justify-center transition-colors group-hover:border-[#5FA8E0]/70 shadow-inner">
                      <svg v-if="selectedCategories.includes(c.id)" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                  </span>
                  <span :class="['text-sm flex-1 transition-colors', selectedCategories.includes(c.id) ? 'text-[#1D1D1F] font-bold' : 'text-[#6E6E73] group-hover:text-[#1D1D1F] font-medium']">
                    {{ c.label }}
                  </span>
                  <span class="text-[11px] text-[#6E6E73] font-bold bg-[#E8F1FA] rounded-full px-2 py-0.5">{{ c.count }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="bg-white border border-[#C5DEF5] rounded-2xl p-5 shadow-sm">
              <h4 class="text-[12px] font-extrabold tracking-wider uppercase text-[#5FA8E0] mb-4 pb-3 border-b border-[#E8F4FC]">
                Price Range
              </h4>
              <div class="px-1">
                <div class="flex items-center justify-between mb-3 text-sm">
                  <span class="text-[#6E6E73] font-medium">PKR 0</span>
                  <span class="font-extrabold text-white bg-[#5FA8E0] px-3 py-1 rounded-lg text-xs">{{ displayPrice }}</span>
                  <span class="text-[#6E6E73] font-medium">PKR 200k</span>
                </div>
                <input type="range" min="0" max="100" v-model.number="priceRange" :style="priceTrackStyle"
                  class="w-full h-2 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>

            <!-- Availability -->
            <div class="bg-white border border-[#C5DEF5] rounded-2xl p-5 shadow-sm">
              <h4 class="text-[12px] font-extrabold tracking-wider uppercase text-[#5FA8E0] mb-4 pb-3 border-b border-[#E8F4FC]">
                Availability
              </h4>
              <label class="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-xl hover:bg-[#E8F1FA] transition-colors">
                <span class="relative flex-shrink-0 flex items-center justify-center">
                  <input type="checkbox" v-model="inStockOnly" class="sr-only peer" />
                  <span class="w-5 h-5 rounded-md border-2 border-[#C5DEF5] peer-checked:bg-[#5FA8E0] peer-checked:border-[#5FA8E0] flex items-center justify-center transition-colors group-hover:border-[#5FA8E0]/70 shadow-inner">
                    <svg v-if="inStockOnly" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                </span>
                <span class="text-sm text-[#6E6E73] font-semibold group-hover:text-[#1D1D1F] transition-colors">In Stock Only</span>
                <span class="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]"></span>
              </label>
            </div>

            <div class="flex flex-col gap-2">
              <button class="w-full text-sm font-bold text-[#6E6E73] bg-white border border-[#C5DEF5] hover:bg-[#E8F1FA] hover:text-[#5FA8E0] rounded-xl py-2.5 transition-colors shadow-sm">
                Clear All Filters
              </button>
              <button class="w-full lg:hidden bg-[#5FA8E0] text-white font-semibold rounded-xl py-2.5 text-sm hover:bg-[#2E86D8] transition-colors"
                @click="mobileFiltersOpen = false"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </aside>

        <!-- ── Product Grid ───────────────────────────────────────────────────── -->
        <main class="flex-1 min-w-0">

          <!-- Desktop toolbar -->
          <div class="hidden lg:flex items-center justify-between mb-7 pb-5 border-b border-[#C5DEF5]">
            <div class="flex items-center gap-3">
              <span class="text-sm text-[#6E6E73] font-medium">
                Showing <b class="text-[#1D1D1F]">{{ products.length }}</b> of <b class="text-[#1D1D1F]">205</b> products
              </span>
              <span class="h-4 w-px bg-[#C5DEF5] mx-1"></span>
              <div class="flex items-center gap-2 text-sm">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]"></span>
                <span class="text-[#6E6E73] font-medium"><b class="text-[#1D1D1F]">189</b> in stock</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm text-[#6E6E73] font-semibold">Sort by:</label>
              <select v-model="sortBy" class="rounded-xl border border-[#C5DEF5] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/20 focus:border-[#5FA8E0]/60 shadow-sm">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            <ProductCard
              v-for="p in products"
              :key="p.name"
              :name="p.name"
              :price="p.price"
              :tag="p.tag"
              :image="p.image"
              @add-to-cart="handleAddToCart"
            />
          </div>

          <!-- Pagination -->
          <div class="mt-12 md:mt-14 flex items-center justify-center gap-2">
            <button
              class="w-10 h-10 rounded-xl border border-[#C5DEF5] bg-white text-[#6E6E73] hover:border-[#5FA8E0] hover:text-[#5FA8E0] hover:bg-[#E8F1FA] flex items-center justify-center transition-all shadow-sm disabled:opacity-40"
              :disabled="currentPage === 1"
              @click="currentPage = Math.max(1, currentPage - 1)"
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              v-for="n in pageCount"
              :key="n"
              @click="currentPage = n"
              :class="[
                'w-10 h-10 rounded-xl border text-sm font-extrabold flex items-center justify-center transition-all shadow-sm',
                currentPage === n
                  ? 'bg-[#5FA8E0] border-[#5FA8E0] text-white shadow-[0_4px_12px_rgba(59,143,212,0.3)]'
                  : 'bg-white border-[#C5DEF5] text-[#6E6E73] hover:border-[#5FA8E0] hover:text-[#5FA8E0] hover:bg-[#E8F1FA]',
              ]"
            >
              {{ n }}
            </button>

            <button
              class="w-10 h-10 rounded-xl border border-[#C5DEF5] bg-white text-[#6E6E73] hover:border-[#5FA8E0] hover:text-[#5FA8E0] hover:bg-[#E8F1FA] flex items-center justify-center transition-all shadow-sm disabled:opacity-40"
              :disabled="currentPage === pageCount"
              @click="currentPage = Math.min(pageCount, currentPage + 1)"
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

        </main>
      </div>
    </div>
  </section>
</template>
