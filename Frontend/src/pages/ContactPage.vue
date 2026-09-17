<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const headerRef = ref<HTMLElement | null>(null)
const formRef   = ref<HTMLElement | null>(null)
useScrollReveal(headerRef, { threshold: 0.1 })
useScrollReveal(formRef,   { threshold: 0.1 })

const form = ref({
  firstName: '', lastName: '', email: '', phone: '',
  service: '', subject: '', message: '',
})
const submitted = ref(false)
const handleSubmit = () => { submitted.value = true }

const offices = [
  {
    city:    'Lahore (Head Office)',
    address: '123 Gulberg III, Lahore, Punjab',
    phone:   '+92 42 111 000 111',
    email:   'lahore@sheerdillsecurity.com',
    hours:   'Mon–Sat 9am–7pm',
  },
  {
    city:    'Islamabad',
    address: 'G-10 Markaz, Islamabad',
    phone:   '+92 51 111 000 111',
    email:   'islamabad@sheerdillsecurity.com',
    hours:   'Mon–Sat 9am–6pm',
  },
]

const faqs = [
  { q: 'How quickly can guards be deployed?', a: 'We can deploy uniformed guards within 24–48 hours for standard assignments. Emergency deployments are assessed case-by-case.' },
  { q: 'Are your guards PSQCA licensed?', a: 'Yes. Every guard undergoes PSQCA-approved training and our company holds a valid government security license.' },
  { q: 'Do you offer CCTV maintenance contracts?', a: 'Absolutely. We offer monthly and annual AMC packages covering preventive maintenance, remote health checks, and on-site repairs.' },
  { q: 'What areas do you cover?', a: 'We primarily serve Lahore, Islamabad, Rawalpindi, Faisalabad, and surrounding areas. Nationwide deployments are available on request.' },
  { q: 'Can I get a free site survey?', a: 'Yes — we offer a free on-site security assessment for all new clients before proposing any solution.' },
]

const expandedFaq = ref<number | null>(null)
const toggleFaq   = (i: number) => { expandedFaq.value = expandedFaq.value === i ? null : i }
</script>

<template>
  <div class="overflow-x-hidden pt-[44px] md:pt-[48px]">

    <!-- ── HERO ── -->
    <section class="relative bg-white overflow-hidden py-20 md:py-24">
      <div class="absolute inset-0 bg-gradient-to-br from-[#E8F1FA]/60 via-transparent to-transparent pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-5 sm:px-8">
        <div ref="headerRef" class="reveal-up max-w-xl">
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5FA8E0] mb-4">Get in Touch</p>
          <h1 class="text-[clamp(2.25rem,5.5vw,3.75rem)] font-black leading-[1.04] tracking-[-0.02em] text-[#1D1D1F] mb-5">
            Let's secure your<br /><span class="text-[#5FA8E0]">premises together.</span>
          </h1>
          <p class="text-[1.125rem] text-[#1D1D1F]/75 leading-relaxed font-light">
            Tell us what you need — we'll respond within 24 hours with a tailored proposal and a free site assessment.
          </p>
        </div>
      </div>
    </section>

    <!-- ── CONTACT FORM + OFFICES ── (even = white) -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20">

          <!-- Left: offices + quick contact -->
          <div class="reveal-left">
            <p class="text-[13px] font-semibold text-[#5FA8E0] mb-3">Our Offices</p>
            <h2 class="text-[clamp(1.75rem,4vw,2.25rem)] font-black text-[#1D1D1F] tracking-[-0.02em] mb-8">
              Always reachable.<br />Always ready.
            </h2>

            <div class="space-y-6 mb-10">
              <div v-for="o in offices" :key="o.city" class="rounded-2xl border border-[#C5DEF5] p-6 bg-white shadow-[0_2px_12px_rgba(95,168,224,0.08)]">
                <h3 class="text-[16px] font-bold text-[#1D1D1F] mb-3">{{ o.city }}</h3>
                <div class="space-y-2">
                  <div class="flex items-start gap-3">
                    <svg class="w-4 h-4 text-[#5FA8E0] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                    <span class="text-[14px] text-[#6E6E73]">{{ o.address }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <svg class="w-4 h-4 text-[#5FA8E0] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                    <span class="text-[14px] text-[#6E6E73]">{{ o.phone }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <svg class="w-4 h-4 text-[#5FA8E0] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                    <span class="text-[14px] text-[#6E6E73]">{{ o.email }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <svg class="w-4 h-4 text-[#5FA8E0] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span class="text-[14px] text-[#6E6E73]">{{ o.hours }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Emergency line -->
            <div class="rounded-2xl bg-[#5FA8E0] p-6 text-white">
              <p class="text-[12px] font-semibold uppercase tracking-wider text-white/70 mb-1">24/7 Emergency Line</p>
              <p class="text-[2rem] font-black tracking-tight">+92 300 111 0000</p>
              <p class="text-[14px] text-white/70 mt-1">For active security incidents only</p>
            </div>
          </div>

          <!-- Right: form -->
          <div ref="formRef" class="reveal-right delay-100">

            <div v-if="submitted" class="h-full flex flex-col items-center justify-center text-center py-16">
              <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                <svg class="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
              </div>
              <h3 class="text-[22px] font-bold text-[#1D1D1F] mb-2">Message sent!</h3>
              <p class="text-[15px] text-[#6E6E73]">Our team will get back to you within 24 hours.</p>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-4">
              <h3 class="text-[18px] font-bold text-[#1D1D1F] mb-6">Send us a message</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5">First name *</label>
                  <input v-model="form.firstName" type="text" required placeholder="Ahmad"
                    class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
                </div>
                <div>
                  <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5">Last name *</label>
                  <input v-model="form.lastName" type="text" required placeholder="Raza"
                    class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5">Email *</label>
                  <input v-model="form.email" type="email" required placeholder="ahmad@company.pk"
                    class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
                </div>
                <div>
                  <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5">Phone</label>
                  <input v-model="form.phone" type="tel" placeholder="+92 300 0000000"
                    class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
                </div>
              </div>
              <div>
                <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5">Service needed *</label>
                <select v-model="form.service" required
                  class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all">
                  <option value="" disabled>Select a service…</option>
                  <option>Manned Guarding</option>
                  <option>CCTV Installation</option>
                  <option>Access Control</option>
                  <option>ANPR / LPR System</option>
                  <option>GPS Tracking</option>
                  <option>Alarm System</option>
                  <option>Full Security Audit</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5">Message *</label>
                <textarea v-model="form.message" rows="5" required placeholder="Tell us about your site, requirements, and any specific concerns…"
                  class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all resize-none" />
              </div>
              <button type="submit"
                class="w-full bg-[#5FA8E0] text-white font-semibold rounded-full py-3.5 text-[15px] hover:bg-[#2E86D8] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_16px_rgba(95,168,224,0.35)]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FAQ ── -->
    <section class="bg-white py-16 md:py-24 border-t border-[#E8F1FA]">
      <div class="max-w-[760px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-12">
          <p class="text-[12px] font-semibold text-[#5FA8E0] uppercase tracking-[0.18em] mb-2">Common Questions</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#1D1D1F] tracking-[-0.02em]">Frequently asked</h2>
        </div>
        <div class="space-y-3">
          <div v-for="(faq, i) in faqs" :key="i"
            class="bg-white border border-[#C5DEF5] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(95,168,224,0.08)]">
            <button @click="toggleFaq(i)"
              class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
              <span class="text-[15px] font-semibold text-[#1D1D1F]">{{ faq.q }}</span>
              <svg :class="['w-5 h-5 text-[#5FA8E0] flex-shrink-0 transition-transform duration-200', expandedFaq === i ? 'rotate-180' : '']"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
              </svg>
            </button>
            <div v-if="expandedFaq === i" class="px-6 pb-5">
              <p class="text-[14px] text-[#6E6E73] leading-relaxed">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
