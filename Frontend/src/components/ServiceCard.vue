<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="group relative bg-white border border-border-card rounded-xl p-6 md:p-7 hover:border-navy-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden"
  >
    <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div
      class="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-50 to-steel-50 border border-navy-100 flex items-center justify-center mb-5 group-hover:from-navy-700 group-hover:to-steel-700 group-hover:border-navy-700 group-hover:shadow-lg transition-all duration-300 text-navy-700 group-hover:text-white flex-shrink-0 relative z-10"
    >
      <span v-html="icon" class="w-7 h-7 flex items-center justify-center" />
    </div>

    <div
      class="absolute top-7 left-7 w-14 h-14 rounded-xl bg-accent-500/0 group-hover:bg-accent-500/10 transition-all duration-500 blur-xl pointer-events-none"
    ></div>

    <h3 class="text-lg font-bold text-navy-800 mb-2.5 relative z-10">{{ title }}</h3>
    <p class="text-text-muted text-sm leading-relaxed flex-1 relative z-10">
      {{ description }}
    </p>

    <div class="mt-5 flex items-center gap-1.5 text-sm font-semibold text-navy-700 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 relative z-10">
      <span>Learn more</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>
