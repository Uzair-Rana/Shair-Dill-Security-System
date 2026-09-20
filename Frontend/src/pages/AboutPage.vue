<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import ContactSection from '../components/ContactSection.vue'
import logoImg from '../assets/logo of SDSSS.png'

const headerRef  = ref<HTMLElement | null>(null)
const missionRef = ref<HTMLElement | null>(null)
const valuesRef  = ref<HTMLElement | null>(null)
const teamRef    = ref<HTMLElement | null>(null)

useScrollReveal(headerRef,  { threshold: 0.1  })
useScrollReveal(missionRef, { threshold: 0.1  })
useScrollReveal(valuesRef,  { threshold: 0.06 })
useScrollReveal(teamRef,    { threshold: 0.06 })

const stats = [
  { n: '2009', l: 'Founded' },
  { n: '10+',  l: 'Years in operation' },
  { n: '500+', l: 'Clients served' },
  { n: '250+', l: 'Trained guards' },
  { n: '6',    l: 'Service categories' },
  { n: '100%', l: 'PSQCA certified' },
]

const values = [
  {
    title: 'Integrity',
    desc:  'We operate transparently and honestly with every client, partner, and employee — no hidden charges, no compromises.',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
  },
  {
    title: 'Reliability',
    desc:  'Our guards show up on time, every time. Our systems are monitored 24/7. When you need us, we are there.',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    title: 'Professionalism',
    desc:  'Every team member — from guard to technician — is trained, certified, uniformed, and held to the highest conduct standards.',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,
  },
  {
    title: 'Innovation',
    desc:  'We continuously adopt the latest security technology — AI cameras, biometrics, ANPR — to stay ahead of evolving threats.',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>`,
  },
  {
    title: 'Compliance',
    desc:  'PSQCA government-licensed agency. All operations conform to Pakistan\'s Private Security Companies regulations.',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
  },
  {
    title: 'Community',
    desc:  'We employ locally, train rigorously, and invest back in the communities where our guards and clients live and work.',
    icon:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>`,
  },
]

const timeline = [
  { year: '2009', event: 'SDSSS founded in Lahore by a team of former law enforcement and security professionals.' },
  { year: '2011', event: 'Obtained PSQCA government license, becoming one of the first certified agencies in the region.' },
  { year: '2014', event: 'Expanded into electronic security — CCTV, access control, and alarm system installations.' },
  { year: '2017', event: 'Crossed 100 corporate clients including banks, hospitals, and manufacturing facilities.' },
  { year: '2019', event: 'Launched ANPR/LPR and GPS fleet tracking services for vehicle security management.' },
  { year: '2022', event: 'Guard force grew past 200 trained personnel deployed across Punjab and Islamabad.' },
  { year: '2024', event: 'Introduced AI-powered surveillance analytics and smart access control integrations.' },
  { year: '2026', event: 'Serving 500+ clients nationwide with a full-spectrum security portfolio.' },
]

const team = [
  {
    name: 'Muhammad Khalid',
    role: 'Founder & CEO',
    bio: 'Former police commissioner with 20+ years in law enforcement. Visionary leader driving SDSSS innovation.',
    initials: 'MK',
    department: 'Executive',
  },
  {
    name: 'Fatima Ahmed',
    role: 'Head of Operations',
    bio: 'Operations expert managing 250+ security personnel and 24/7 monitoring centers across Pakistan.',
    initials: 'FA',
    department: 'Operations',
  },
  {
    name: 'Ali Hassan',
    role: 'Chief Technology Officer',
    bio: 'Tech innovator specializing in AI surveillance, ANPR systems, and biometric access control solutions.',
    initials: 'AH',
    department: 'Technology',
  },
  {
    name: 'Sara Khan',
    role: 'Director of Training',
    bio: 'PSQCA-certified trainer ensuring all guards meet international security standards and protocols.',
    initials: 'SK',
    department: 'Training',
  },
  {
    name: 'Hassan Raza',
    role: 'Head of Security Services',
    bio: 'Senior security expert with expertise in corporate protection, VIP security, and risk management.',
    initials: 'HR',
    department: 'Services',
  },
  {
    name: 'Amira Malik',
    role: 'Client Relations Manager',
    bio: 'Dedicated to building lasting partnerships with clients and ensuring 100% satisfaction.',
    initials: 'AM',
    department: 'Client Relations',
  },
]
</script>

<template>
  <div class="overflow-x-hidden pt-[54px]">

    <!-- ── HERO ── -->
    <section class="relative bg-white overflow-hidden py-20 md:py-28">
      <div class="absolute inset-0 bg-gradient-to-br from-[#E8F1FA]/60 via-transparent to-transparent pointer-events-none" />
      <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#5FA8E0]/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-5 sm:px-8">
        <div ref="headerRef" class="reveal-up max-w-2xl">
          <img :src="logoImg" alt="SDSSS" class="h-16 w-auto object-contain mb-5" />
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5FA8E0] mb-4">About SDSSS</p>
          <h1 class="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.04] tracking-[-0.02em] text-[#1D1D1F] mb-5">
            Pakistan's trusted<br /><span class="text-[#5FA8E0]">security partner.</span>
          </h1>
          <p class="text-[1.125rem] text-[#1D1D1F]/75 leading-relaxed max-w-[520px] font-light">
            Since 2009, Sheer Dill Security & Surveillance Systems has been protecting homes, businesses, and institutions across Pakistan with integrity and professionalism.
          </p>
        </div>
      </div>
    </section>

    <!-- ── STATS STRIP ── (even = white) -->
    <section class="bg-white py-14 md:py-16">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          <div v-for="s in stats" :key="s.n" class="text-center">
            <div class="text-[2rem] md:text-[2.5rem] font-black text-[#5FA8E0] leading-none mb-1">{{ s.n }}</div>
            <div class="text-[12px] text-[#6E6E73] font-medium uppercase tracking-wide">{{ s.l }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MISSION & STORY ── -->
    <section class="bg-white py-16 md:py-24 border-t border-[#E8F1FA]">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div ref="missionRef" class="reveal-up grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-24">
          <div>
            <p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#5FA8E0] mb-4">Our Mission</p>
            <h2 class="text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[#1D1D1F] leading-tight tracking-[-0.02em] mb-6">
              Safety is not a luxury.<br />It's a right.
            </h2>
            <p class="text-[16px] text-[#1D1D1F]/75 leading-relaxed mb-6">
              Our mission is to make professional-grade security accessible to every business and household in Pakistan — not just the largest corporations. We combine trained human presence with cutting-edge technology to deliver layered protection that actually works.
            </p>
            <p class="text-[16px] text-[#1D1D1F]/75 leading-relaxed">
              Whether it's a single CCTV camera for a shop or a full guarding deployment for a hospital, we bring the same rigour, the same response time, and the same uncompromising standard.
            </p>
          </div>
          <div>
            <p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#5FA8E0] mb-4">Our Story</p>
            <h2 class="text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[#1D1D1F] leading-tight tracking-[-0.02em] mb-6">
              Built by security<br />professionals.
            </h2>
            <p class="text-[16px] text-[#1D1D1F]/75 leading-relaxed mb-6">
              SDSSS was founded in 2009 by a group of former law enforcement officers and security industry veterans who saw a gap: Pakistan's private security sector was fragmented, uncertified, and often unreliable. We set out to change that.
            </p>
            <p class="text-[16px] text-[#1D1D1F]/75 leading-relaxed">
              Today we are a PSQCA-licensed, full-spectrum security company with operations across Punjab, Islamabad, and beyond — and we're still growing.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── VALUES ── (even = white) -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-14">
          <p class="text-[13px] font-semibold text-[#5FA8E0] mb-2">What drives us</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#1D1D1F] tracking-[-0.02em]">Our core values</h2>
        </div>
        <div ref="valuesRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="(v, i) in values" :key="v.title"
            :class="['reveal-up rounded-2xl p-7 border border-[#C5DEF5] bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_12px_rgba(95,168,224,0.08)] hover:shadow-[0_8px_24px_rgba(95,168,224,0.15)]', `delay-${(i % 3) * 100}`]">
            <div class="w-11 h-11 rounded-full bg-[#E8F1FA] border border-[#C5DEF5] flex items-center justify-center text-[#5FA8E0] mb-5" v-html="v.icon" />
            <h3 class="text-[16px] font-bold text-[#1D1D1F] mb-2">{{ v.title }}</h3>
            <p class="text-[14px] text-[#6E6E73] leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── TEAM ── -->
    <section class="py-16 md:py-24 border-t border-[#e2e8f0]" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-14">
          <p class="text-[12px] font-semibold text-[#3b82f6] uppercase tracking-[0.18em] mb-2">Meet Our Team</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#0f172a] tracking-[-0.02em] mb-4">Leadership & Experts</h2>
          <p class="text-[16px] text-[#475569] max-w-2xl mx-auto">Experienced professionals dedicated to delivering the highest standards of security excellence.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="member in team" :key="member.name"
            class="team-card bg-white rounded-16px border-2 border-[#e2e8f0] p-6 hover:border-[#3b82f6] hover:shadow-[0_60px_120px_rgba(59,130,246,0.15%)] transition-all duration-300 transform-gpu hover:-translate-y-2">
            <!-- Avatar -->
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-xl mb-4 shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
              {{ member.initials }}
            </div>

            <!-- Name -->
            <h3 class="text-xl font-bold text-[#0f172a] mb-1" style="font-family: var(--font-heading);">
              {{ member.name }}
            </h3>

            <!-- Role -->
            <p class="text-[14px] font-semibold text-[#3b82f6] mb-3">{{ member.role }}</p>

            <!-- Bio -->
            <p class="text-[14px] text-[#475569] leading-relaxed mb-4">{{ member.bio }}</p>

            <!-- Department Badge -->
            <span class="inline-block text-xs font-semibold text-[#3b82f6] bg-[#eff6ff] px-3 py-1 rounded-full">{{ member.department }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── TIMELINE ── -->
    <section class="bg-white py-16 md:py-24 border-t border-[#E8F1FA]">
      <div class="max-w-[800px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-14">
          <p class="text-[12px] font-semibold text-[#5FA8E0] uppercase tracking-[0.18em] mb-2">Our journey</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#1D1D1F] tracking-[-0.02em]">15+ years of growth</h2>
        </div>
        <div ref="teamRef" class="relative">
          <!-- Vertical line -->
          <div class="absolute left-[19px] top-0 bottom-0 w-px bg-[#C5DEF5]" />
          <div class="space-y-8">
            <div v-for="(t, i) in timeline" :key="t.year"
              :class="['reveal-up flex gap-5 items-start', `delay-${(i % 4) * 100}`]">
              <!-- Dot -->
              <div class="w-10 h-10 rounded-full bg-[#5FA8E0] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                <span class="text-[11px] font-black text-white">{{ t.year.slice(2) }}</span>
              </div>
              <div class="pt-2 pb-1">
                <span class="text-[13px] font-bold text-[#5FA8E0] uppercase tracking-wider">{{ t.year }}</span>
                <p class="text-[15px] text-[#1D1D1F]/85 leading-relaxed mt-1">{{ t.event }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CONTACT ── (even = white) -->
    <ContactSection variant="white" />

  </div>
</template>

<style scoped>
.team-card {
  animation: teamCardSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

.team-card:nth-child(1) { animation-delay: 0.1s; }
.team-card:nth-child(2) { animation-delay: 0.2s; }
.team-card:nth-child(3) { animation-delay: 0.3s; }
.team-card:nth-child(4) { animation-delay: 0.4s; }
.team-card:nth-child(5) { animation-delay: 0.5s; }
.team-card:nth-child(6) { animation-delay: 0.6s; }

@keyframes teamCardSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
