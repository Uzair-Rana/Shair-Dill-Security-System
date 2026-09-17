<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

withDefaults(defineProps<Props>(), {
  align: 'left',
  light: false,
})
</script>

<template>
  <div
    :class="[
      'mb-10 md:mb-12',
      align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left',
    ]"
  >
    <p
      v-if="eyebrow"
      :class="[
        'inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-3',
      ]"
    >
      <span
        class="inline-block w-8 h-px rounded-full"
        :class="light ? 'bg-accent-400' : 'bg-accent-500'"
      ></span>
      <span :class="light ? 'text-accent-400' : 'text-accent-600'">
        {{ eyebrow }}
      </span>
      <span
        class="inline-block w-8 h-px rounded-full"
        :class="light ? 'bg-accent-400' : 'bg-accent-500'"
        v-if="align === 'center'"
      ></span>
    </p>
    <h2
      :class="[
        'text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold mb-4 leading-[1.15]',
        light ? 'text-white' : 'text-navy-800',
      ]"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      :class="[
        'text-base md:text-lg leading-relaxed',
        light ? 'text-white/75' : 'text-text-muted',
      ]"
    >
      {{ subtitle }}
    </p>
    <div
      :class="[
        'mt-6 h-1 w-16 rounded-full',
        align === 'center' ? 'mx-auto' : '',
        light ? 'bg-gradient-to-r from-accent-400 to-accent-600' : 'bg-gradient-to-r from-accent-500 to-accent-600',
      ]"
    />
  </div>
</template>
