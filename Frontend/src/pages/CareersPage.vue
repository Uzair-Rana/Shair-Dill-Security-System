<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

// ── Hiring process steps ────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Apply Online',
    description: 'Submit your application using the form below. Attach your CV and a brief cover note — takes less than 5 minutes.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
  },
  {
    number: '02',
    title: 'Initial Screening',
    description: 'Our HR team reviews your application within 48 hours and contacts shortlisted candidates for a brief phone screening.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>`,
  },
  {
    number: '03',
    title: 'In-Person Interview',
    description: 'Selected candidates attend a face-to-face interview at our Lahore office to assess suitability, attitude, and professional background.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>`,
  },
  {
    number: '04',
    title: 'Background Verification',
    description: 'All hires undergo a thorough background check including NADRA verification, character references, and police clearance.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
  },
  {
    number: '05',
    title: 'Training & Onboarding',
    description: 'New hires complete PSQCA-approved training covering security protocols, equipment use, emergency response, and professional conduct.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>`,
  },
  {
    number: '06',
    title: 'Deployment',
    description: 'Certified personnel are deployed to their assigned sites with full uniform, equipment, and supervisor support from day one.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>`,
  },
]

// ── Open positions ──────────────────────────────────────────────────────────
const positions = [
  { title: 'Security Guard (Male)',      type: 'Full-time', location: 'Lahore / Islamabad', dept: 'Guarding', urgent: true },
  { title: 'Security Supervisor',        type: 'Full-time', location: 'Lahore',             dept: 'Guarding', urgent: false },
  { title: 'CCTV Operator',             type: 'Full-time', location: 'Lahore',             dept: 'Control Room', urgent: true },
  { title: 'Security Systems Installer', type: 'Full-time', location: 'Nationwide',         dept: 'Technical', urgent: false },
  { title: 'ANPR/IT Technician',        type: 'Full-time', location: 'Lahore',             dept: 'Technical', urgent: false },
  { title: 'Female Security Officer',   type: 'Full-time', location: 'Lahore',             dept: 'Guarding', urgent: true },
  { title: 'Sales Executive',           type: 'Full-time', location: 'Lahore',             dept: 'Sales', urgent: false },
  { title: 'HR & Admin Officer',        type: 'Full-time', location: 'Lahore',             dept: 'HR', urgent: false },
]

// ── Benefits ────────────────────────────────────────────────────────────────
const benefits = [
  { title: 'Competitive Salary',   desc: 'Market-rate pay reviewed annually with performance bonuses.' },
  { title: 'PSQCA Certification',  desc: 'Fully funded government-approved security training and certification.' },
  { title: 'Medical Coverage',     desc: 'Group health insurance for you and your immediate family.' },
  { title: 'Career Growth',        desc: 'Clear promotion path from guard to supervisor to management.' },
  { title: 'Uniforms & Equipment', desc: 'All uniforms, PPE, and tools provided at no cost to the employee.' },
  { title: 'On-Time Payments',     desc: 'Salaries disbursed on the 1st of every month, no delays.' },
]

// ── Application form ────────────────────────────────────────────────────────
const form = ref({ name: '', phone: '', email: '', position: '', experience: '', message: '' })
const submitted = ref(false)

const headerRef  = ref<HTMLElement | null>(null)
const stepsRef   = ref<HTMLElement | null>(null)
const jobsRef    = ref<HTMLElement | null>(null)
const formRef    = ref<HTMLElement | null>(null)

useScrollReveal(headerRef,  { threshold: 0.1 })
useScrollReveal(stepsRef,   { threshold: 0.05 })
useScrollReveal(jobsRef,    { threshold: 0.05 })
useScrollReveal(formRef,    { threshold: 0.1 })

const handleSubmit = () => { submitted.value = true }
</script>

<template>
  <div class="overflow-x-hidden">

    <!-- ── HERO BANNER ──────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden pt-[80px] md:pt-[100px]" style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);">
      <div class="absolute inset-0 bg-gradient-to-br from-[#87CEEB]/40 via-transparent to-transparent pointer-events-none" />
      <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#3b82f6]/8 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-80 h-80 border border-[#e2e8f0] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div class="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div ref="headerRef" class="reveal-up max-w-2xl">
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3b82f6] mb-4">Join Our Team</p>
          <h1 class="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.04] tracking-[-0.02em] mb-5 text-[#0f172a]">
            Build a career in<br />
            professional security
          </h1>
          <p class="text-[1.125rem] text-[#475569] leading-relaxed max-w-[500px] mb-8 font-light">
            Join Pakistan's trusted PSQCA-licensed security agency. We hire, train, and grow professionals at every level.
          </p>
          <a href="#apply"
            class="inline-flex items-center gap-2 bg-[#3b82f6] text-white font-semibold rounded-full px-7 py-3 text-[15px] hover:bg-[#2563eb] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(59,130,246,0.35)]">
            Apply Now
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ── WHY JOIN US ────────────────────────────────────────────────────── -->
    <section class="py-16 md:py-20" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-12">
          <p class="text-[13px] font-semibold text-[#5FA8E0] mb-2">Benefits</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#1D1D1F] tracking-[-0.02em]">Why work at SDSSS?</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="b in benefits" :key="b.title"
            class="rounded-2xl p-6 border border-[#C5DEF5] bg-white hover:-translate-y-1 transition-transform duration-300 shadow-[0_2px_12px_rgba(95,168,224,0.08)] hover:shadow-[0_8px_24px_rgba(95,168,224,0.15)]">
            <div class="w-10 h-10 rounded-full bg-[#E8F1FA] border border-[#C5DEF5] flex items-center justify-center text-[#5FA8E0] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <h3 class="text-[15px] font-semibold text-[#1D1D1F] mb-1">{{ b.title }}</h3>
            <p class="text-[13px] text-[#6E6E73] leading-relaxed">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── HIRING PROCESS ─────────────────────────────────────────────────── -->
    <section class="py-16 md:py-24 border-t border-[#e2e8f0]" style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-14">
          <p class="text-[13px] font-semibold text-[#5FA8E0] mb-2">How It Works</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#1D1D1F] tracking-[-0.02em]">Our hiring process</h2>
          <p class="text-[16px] text-[#6E6E73] mt-3 max-w-[480px] mx-auto">Transparent, fair, and fast — from application to deployment in as little as 2 weeks.</p>
        </div>

        <div ref="stepsRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(step, i) in steps" :key="step.number"
            :class="['reveal-up bg-white rounded-2xl p-7 border border-[#C5DEF5] shadow-[0_2px_12px_rgba(95,168,224,0.08)]', `delay-${(i % 3) * 100}`]">
            <!-- Step number + icon -->
            <div class="flex items-center gap-3 mb-5">
              <span class="text-[2rem] font-black text-[#C5DEF5] leading-none">{{ step.number }}</span>
              <div class="w-10 h-10 rounded-xl bg-[#5FA8E0] flex items-center justify-center text-white" v-html="step.icon" />
            </div>
            <h3 class="text-[16px] font-bold text-[#1D1D1F] mb-2">{{ step.title }}</h3>
            <p class="text-[13px] text-[#6E6E73] leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OPEN POSITIONS ─────────────────────────────────────────────────── -->
    <section class="py-16 md:py-24" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);">
      <div class="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-12">
          <p class="text-[13px] font-semibold text-[#5FA8E0] mb-2">Vacancies</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#1D1D1F] tracking-[-0.02em]">Open positions</h2>
        </div>

        <div ref="jobsRef" class="space-y-3">
          <div v-for="pos in positions" :key="pos.title"
            class="reveal-up group flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-[#C5DEF5] rounded-2xl px-6 py-5 hover:border-[#5FA8E0] hover:shadow-[0_8px_24px_rgba(95,168,224,0.12)] transition-all duration-300">

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <h3 class="text-[16px] font-semibold text-[#1D1D1F]">{{ pos.title }}</h3>
                <span v-if="pos.urgent" class="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  Urgent
                </span>
              </div>
              <div class="flex items-center gap-3 flex-wrap">
                <span class="inline-flex items-center gap-1 text-[12px] text-[#6E6E73]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#5FA8E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                  </svg>
                  {{ pos.location }}
                </span>
                <span class="text-[#C5DEF5]">·</span>
                <span class="text-[12px] text-[#6E6E73]">{{ pos.type }}</span>
                <span class="text-[#C5DEF5]">·</span>
                <span class="inline-flex items-center text-[12px] font-medium text-[#5FA8E0] bg-[#E8F1FA] px-2.5 py-0.5 rounded-full">
                  {{ pos.dept }}
                </span>
              </div>
            </div>

            <a href="#apply"
              class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5FA8E0] border border-[#5FA8E0] rounded-full px-4 py-2 hover:bg-[#5FA8E0] hover:text-white transition-all duration-200 flex-shrink-0">
              Apply
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── APPLICATION FORM ───────────────────────────────────────────────── -->
    <section id="apply" class="py-16 md:py-24 relative overflow-hidden border-t border-[#e2e8f0]" style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);">
      <div class="absolute inset-0 bg-gradient-to-br from-[#87CEEB]/40 via-transparent to-transparent pointer-events-none" />
      <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#3b82f6]/8 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div class="relative max-w-[720px] mx-auto px-5 sm:px-8">
        <div class="text-center mb-10">
          <p class="text-[12px] font-semibold text-[#5FA8E0] uppercase tracking-[0.18em] mb-3">Apply Now</p>
          <h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#1D1D1F] tracking-[-0.02em]">Start your application</h2>
          <p class="text-[15px] text-[#6E6E73] mt-3">Fill in the form below and our HR team will get back to you within 48 hours.</p>
        </div>

        <!-- Success state -->
        <div v-if="submitted" class="bg-white rounded-3xl p-10 text-center border border-[#C5DEF5] shadow-xl">
          <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
          </div>
          <h3 class="text-[20px] font-bold text-[#1D1D1F] mb-2">Application received!</h3>
          <p class="text-[15px] text-[#6E6E73]">Thank you for applying. Our HR team will review your application and contact you within 48 hours.</p>
        </div>

        <!-- Form -->
        <div v-else ref="formRef" class="reveal-up bg-white rounded-3xl p-8 md:p-10 border border-[#C5DEF5] shadow-[0_24px_64px_rgba(95,168,224,0.12)]">
          <form @submit.prevent="handleSubmit" class="space-y-5">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-[12px] font-semibold text-[#6E6E73] mb-1.5 uppercase tracking-wide" for="c-name">Full Name *</label>
                <input id="c-name" v-model="form.name" type="text" required placeholder="Ahmad Raza"
                  class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
              </div>
              <div>
                <label class="block text-[12px] font-semibold text-[#6E6E73] mb-1.5 uppercase tracking-wide" for="c-phone">Phone Number *</label>
                <input id="c-phone" v-model="form.phone" type="tel" required placeholder="+92 300 0000000"
                  class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
              </div>
            </div>

            <div>
              <label class="block text-[12px] font-semibold text-[#6E6E73] mb-1.5 uppercase tracking-wide" for="c-email">Email Address</label>
              <input id="c-email" v-model="form.email" type="email" placeholder="ahmad@email.com"
                class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all" />
            </div>

            <div>
              <label class="block text-[12px] font-semibold text-[#6E6E73] mb-1.5 uppercase tracking-wide" for="c-position">Position Applying For *</label>
              <select id="c-position" v-model="form.position" required
                class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all">
                <option value="" disabled>Select a position…</option>
                <option v-for="pos in positions" :key="pos.title" :value="pos.title">{{ pos.title }}</option>
                <option value="other">Other / General Application</option>
              </select>
            </div>

            <div>
              <label class="block text-[12px] font-semibold text-[#6E6E73] mb-1.5 uppercase tracking-wide" for="c-exp">Years of Experience</label>
              <select id="c-exp" v-model="form.experience"
                class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all">
                <option value="" disabled>Select…</option>
                <option>No experience (fresher)</option>
                <option>Less than 1 year</option>
                <option>1–2 years</option>
                <option>3–5 years</option>
                <option>5+ years</option>
              </select>
            </div>

            <div>
              <label class="block text-[12px] font-semibold text-[#6E6E73] mb-1.5 uppercase tracking-wide" for="c-msg">Cover Note</label>
              <textarea id="c-msg" v-model="form.message" rows="4"
                placeholder="Briefly tell us about yourself — your background, skills, and why you want to join SDSSS…"
                class="w-full rounded-xl border border-[#C5DEF5] bg-[#F5F8FC] px-4 py-3 text-[15px] text-[#1D1D1F] placeholder:text-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#5FA8E0]/30 focus:border-[#5FA8E0] transition-all resize-none" />
            </div>

            <button type="submit"
              class="w-full bg-[#5FA8E0] text-white font-semibold rounded-full py-3.5 text-[15px] hover:bg-[#2E86D8] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_16px_rgba(95,168,224,0.35)]">
              Submit Application
            </button>

            <p class="text-[12px] text-[#8E8E93] text-center">
              We respect your privacy. Your information will only be used for recruitment purposes.
            </p>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>
