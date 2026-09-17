<script setup lang="ts">
const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Security Cameras', href: '#' },
  { label: 'Smart Home', href: '#' },
  { label: 'Support Centre', href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Warranty & Returns', href: '#' },
]
</script>

<template>
  <footer class="w-full border-t border-[#e2e2df] bg-[#f4f6fc] ezviz-footer">
    <!-- Main Footer Content -->
    <div class="max-w-[1400px] mx-auto px-5 sm:px-8 py-10 md:py-12">
      <div class="footer-subscribe flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 pb-8 border-b border-[#dfe7ea]">
        <div>
          <h3 class="text-xl font-bold text-[#10242d] mb-1">Stay connected with SDSSS</h3>
          <p class="text-[#60727a] text-sm">Get product updates, smart security tips and new offers.</p>
        </div>
        <form class="flex w-full md:w-auto" @submit.prevent>
          <input aria-label="Email address" type="email" placeholder="Enter your email" class="newsletter-input" />
          <button type="submit" class="newsletter-button">Subscribe <span>→</span></button>
        </form>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-8">

        <!-- Company Info -->
        <div class="md:col-span-2">
          <h3 class="text-base font-bold text-[#0f172a] mb-2" style="font-family: 'Playfair Display', serif;">
            <span class="text-[#111111]">SDSSS</span> Ltd.
          </h3>
          <p class="text-[#475569] text-xs leading-relaxed">
            Smart security for real homes, businesses and everyday life in Pakistan.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">Quick Links</h4>
          <ul class="space-y-1.5">
            <li v-for="link in quickLinks" :key="link.label">
              <a :href="link.href" class="text-[#475569] hover:text-[#111111] transition-colors text-xs">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">Product categories</h4>
          <ul class="space-y-1.5 text-xs text-[#475569]">
            <li>Security Cameras</li>
            <li>Smart Entry</li>
            <li>Smart Sensors</li>
            <li>Business Solutions</li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">Legal</h4>
          <ul class="space-y-1.5">
            <li v-for="link in legalLinks" :key="link.label">
              <a :href="link.href" class="text-[#475569] hover:text-[#3b82f6] transition-colors text-xs">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Certifications -->
        <div>
          <h4 class="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">Stay connected</h4>
          <div class="space-y-1.5 text-xs text-[#475569]">
            <p>Product updates & smart tips</p>
            <p>hello@sdsss.com.pk</p>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <div class="border-t border-[#e2e8f0] pt-6">
        <!-- Bottom Info -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-[#64748b]">
            © {{ new Date().getFullYear() }} SDSSS (Pvt) Ltd. All rights reserved.
          </p>
          <div class="text-xs text-[#111111] font-semibold">
            Shair Dill Security System Services
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.newsletter-input { min-width: min(280px, 65vw); border: 1px solid #cbd8dd; border-right: 0; padding: .75rem 1rem; color: #10242d; background: #fff; outline: none; }
.newsletter-input:focus { border-color: #1676d2; }
.newsletter-button { border: 0; padding: .75rem 1rem; background: #2666ff; color: #fff; font-size: .8rem; font-weight: 700; cursor: pointer; }
.newsletter-button span { margin-left: .5rem; }
@media (max-width: 520px) { .newsletter-input { min-width: 0; width: 100%; } .newsletter-button { white-space: nowrap; } }
</style>
