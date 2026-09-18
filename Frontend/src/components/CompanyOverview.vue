<script setup lang="ts">
const pillars = [
  {
    badge: '10+',
    title: 'Years of Excellence',
    description: 'Over a decade of trusted security solutions across Pakistan',
  },
  {
    badge: '500+',
    title: 'Satisfied Clients',
    description: 'Corporate, residential, and institutional facilities nationwide',
  },
  {
    badge: '250+',
    title: 'Certified Guards',
    description: 'Trained, PSQCA-licensed security professionals on standby',
  },
  {
    badge: '24/7',
    title: 'Always On',
    description: 'Round-the-clock monitoring and emergency response teams',
  },
]
</script>

<template>
  <section class="w-full py-20 md:py-28 border-y border-[#e2e8f0]" style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);">
    <div class="max-w-[1400px] mx-auto px-5 sm:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-[#0f172a]" style="font-family: var(--font-heading);">
          Trusted by Leading Organizations
        </h2>
        <p class="text-lg text-[#475569] max-width: 2xl mx-auto font-medium">
          SDSSS is Pakistan's premier security and surveillance provider, delivering comprehensive solutions with unwavering commitment to excellence.
        </p>
      </div>

      <!-- Pillars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(pillar, index) in pillars" :key="pillar.title" class="pillar-card" :style="{ '--delay': `${index * 100}ms` }">
          <!-- Card Container -->
          <div class="h-full bg-white rounded-16px p-8 border-2 border-[#e2e8f0] shadow-[0_50px_100px_rgba(0,0,0,8%)] hover:border-[#3b82f6] hover:shadow-[0_60px_120px_rgba(59,130,246,15%)] transition-all duration-300 transform-gpu hover:-translate-y-2 flex flex-col items-center text-center" style="transform-style: preserve-3d; transform: rotateX(3deg) rotateY(-3deg) translateZ(15px);">

            <!-- Badge -->
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white text-3xl font-black mb-6 shadow-[0_4px_20px_rgba(59,130,246,0.35)] transform-gpu hover:scale-110 transition-transform duration-300" style="transform-style: preserve-3d; transform: translateZ(25px);">
              {{ pillar.badge }}
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-[#0f172a] mb-3" style="font-family: var(--font-heading); transform-style: preserve-3d; transform: translateZ(15px);">
              {{ pillar.title }}
            </h3>

            <!-- Description -->
            <p class="text-[#475569] text-sm leading-relaxed" style="transform-style: preserve-3d; transform: translateZ(12px);">
              {{ pillar.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pillar-card {
  animation: cardSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--delay);
  opacity: 0;
}

@keyframes cardSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px) rotateX(15deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) rotateX(0deg);
  }
}
</style>
