<script setup lang="ts">
// Section 2: Minimalist brand anchor with golden lion watermark
</script>

<template>
  <section class="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
    <!-- Background: Charcoal Slate -->
    <div class="absolute inset-0 bg-[#12141D]" />

    <!-- Golden Lion Watermark (8-12% opacity, centered, oversized, bleeds edges) -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        class="w-[120%] h-[120%] opacity-[0.10]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Lion head silhouette (simplified geometric form) -->
        <g fill="#D4AF37">
          <!-- Mane -->
          <circle cx="100" cy="70" r="45" />

          <!-- Face -->
          <ellipse cx="100" cy="100" rx="28" ry="32" />

          <!-- Left ear -->
          <ellipse cx="75" cy="65" rx="12" ry="18" />

          <!-- Right ear -->
          <ellipse cx="125" cy="65" rx="12" ry="18" />

          <!-- Nose -->
          <circle cx="100" cy="95" r="6" />

          <!-- Left eye -->
          <circle cx="92" cy="90" r="4" />

          <!-- Right eye -->
          <circle cx="108" cy="90" r="4" />
        </g>
      </svg>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8 text-center">

      <!-- Top Divider with Star Glyph -->
      <div class="flex items-center justify-center gap-3 mb-12">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
        <svg class="w-5 h-5 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <div class="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
      </div>

      <!-- Eyebrow Label -->
      <p class="eyebrow mb-6">
        Your Partner in Protection
      </p>

      <!-- Main Heading -->
      <h2 class="font-display text-[clamp(2.5rem,7vw,4rem)] text-[#E5E7EB] leading-tight mb-8">
        Sheer Dill Security
      </h2>

      <!-- Optional Subheading (muted) -->
      <p class="text-[#A0A6B8] text-[1.0625rem] leading-relaxed max-w-[600px] mx-auto font-light">
        Protecting what matters most with unwavering vigilance, precision expertise, and commitment to excellence.
      </p>

      <!-- Bottom Divider -->
      <div class="flex items-center justify-center gap-3 mt-12">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/20" />
        <div class="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
        <div class="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/20" />
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Smooth fade-in animation for watermark */
@keyframes watermark-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.1;
  }
}

section {
  animation: watermark-fade-in 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
}
</style>
