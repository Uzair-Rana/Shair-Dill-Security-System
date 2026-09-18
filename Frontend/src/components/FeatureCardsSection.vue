<script setup lang="ts">
const cards = [
  {
    icon: '🛡️',
    label: 'PROTECT',
    title: 'Dome CCTV Systems',
    description: 'State-of-the-art surveillance with 4K resolution, night vision, and 360° coverage for comprehensive facility monitoring.',
  },
  {
    icon: '👁️',
    label: 'MONITOR',
    title: 'Biometric Access Control',
    description: 'Fingerprint and facial recognition systems with real-time alerts and comprehensive audit trails for maximum security.',
  },
  {
    icon: '🔐',
    label: 'SECURE',
    title: 'Command Center Interface',
    description: 'Centralized dashboard for real-time monitoring, threat detection, and integrated system management across all platforms.',
  },
  {
    icon: '👮',
    label: 'RELIABLE',
    title: 'On-Site Security Officers',
    description: 'Trained, certified security professionals delivering 24/7 on-ground protection and rapid incident response.',
  },
]
</script>

<template>
  <section class="w-full bg-white py-20 md:py-28">
    <div class="max-w-[1400px] mx-auto px-5 sm:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4" style="font-family: var(--font-heading);">
          SECURITY YOU CAN DEPEND ON
        </h2>
        <p class="text-lg text-[#334155] max-w-2xl mx-auto">
          <span class="font-semibold">SMART SECURITY</span> • <span class="font-semibold">TOTAL PROTECTION</span> • <span class="font-semibold">TOTAL PEACE OF MIND</span>
        </p>
      </div>

      <!-- 4-Card Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="card in cards"
          :key="card.label"
          class="bg-white border-2 border-[#C5A059] rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Icon & Label -->
          <div class="mb-6">
            <div class="text-4xl mb-3">{{ card.icon }}</div>
            <p class="text-sm font-bold text-[#C5A059] tracking-widest">{{ card.label }}</p>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-[#0F172A] mb-4" style="font-family: var(--font-heading);">
            {{ card.title }}
          </h3>

          <!-- Description -->
          <p class="text-[#334155] leading-relaxed text-sm">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
