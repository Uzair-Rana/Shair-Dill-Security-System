<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

interface Props {
  /** 'blue' = sky-blue bg + white text | 'white' = white bg + dark text */
  variant?: 'blue' | 'white'
  bgImage?: string
}
withDefaults(defineProps<Props>(), { variant: 'white', bgImage: '' })

const formRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)
useScrollReveal(infoRef, { threshold: 0.15 })
useScrollReveal(formRef, { threshold: 0.12 })

const contactItems = [
  {
    label: '+92 300 1234567', sub: 'Mon–Sat, 9am–7pm',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>`,
  },
  {
    label: 'info@sheerdillsecurity.com', sub: 'We reply within 24 hours',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>`,
  },
  {
    label: 'Lahore, Pakistan', sub: 'Serving nationwide',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>`,
  },
]
</script>

<template>
  <section id="contact" :class="['relative overflow-hidden', variant === 'blue' ? 'bg-[#5FA8E0]' : 'bg-white']">

    <div v-if="bgImage" class="absolute inset-0 pointer-events-none">
      <img :src="bgImage" alt="" class="w-full h-full object-cover opacity-[0.12]" />
    </div>

    <div class="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-20 md:py-28">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-24 items-start">

        <!-- Info -->
        <div ref="infoRef" class="reveal-left">
          <p :class="['text-[13px] font-semibold mb-3', variant === 'blue' ? 'text-white/80' : 'text-[#5FA8E0]']">Get in touch</p>
          <h2 :class="['text-[clamp(2rem,5vw,3rem)] font-black leading-[1.04] tracking-[-0.02em] mb-5', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">
            Ready to secure<br />your premises?
          </h2>
          <p :class="['text-[17px] leading-relaxed mb-10 max-w-[380px] font-light', variant === 'blue' ? 'text-white/75' : 'text-[#6E6E73]']">
            Tell us about your security needs and we'll put together a tailored solution for you.
          </p>
          <div class="space-y-6">
            <div v-for="item in contactItems" :key="item.label" class="flex items-start gap-4">
              <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0', variant === 'blue' ? 'bg-white/20 border border-white/30 text-white' : 'bg-[#E8F1FA] border border-[#C5DEF5] text-[#5FA8E0]']" v-html="item.icon" />
              <div>
                <p :class="['text-[15px] font-medium', variant === 'blue' ? 'text-white' : 'text-[#1D1D1F]']">{{ item.label }}</p>
                <p :class="['text-[13px] mt-0.5', variant === 'blue' ? 'text-white/65' : 'text-[#6E6E73]']">{{ item.sub }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form — always white card -->
        <div ref="formRef" class="reveal-right delay-100">
          <div :class="['rounded-3xl p-7 md:p-8', variant === 'blue' ? 'bg-white shadow-[0_24px_64px_rgba(0,0,0,0.15)]' : '']">
            <form class="space-y-4" @submit.prevent>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5" for="fname">First name</label>
                  <input id="fname" type="text" placeholder="Ahmad"
                    class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
                </div>
                <div>
                  <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5" for="lname">Last name</label>
                  <input id="lname" type="text" placeholder="Raza"
                    class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
                </div>
              </div>
              <div>
                <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5" for="email">Email</label>
                <input id="email" type="email" placeholder="ahmad@company.pk"
                  class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
              </div>
              <div>
                <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5" for="service">Service needed</label>
                <select id="service"
                  class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all">
                  <option value="" disabled selected>Select a service…</option>
                  <option>Manned Guarding</option>
                  <option>CCTV Installation</option>
                  <option>Access Control</option>
                  <option>ANPR / LPR System</option>
                  <option>Alarm System</option>
                  <option>Full Security Audit</option>
                </select>
              </div>
              <div>
                <label class="block text-[12px] font-medium text-[#6E6E73] mb-1.5" for="message">Message</label>
                <textarea id="message" rows="4" placeholder="Tell us about your site and requirements…"
                  class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all resize-none" />
              </div>
              <button type="submit"
                class="w-full bg-[#5FA8E0] text-white font-semibold rounded-full py-3.5 text-[15px] hover:bg-[#2E86D8] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_16px_rgba(95,168,224,0.35)]">
                Send message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
