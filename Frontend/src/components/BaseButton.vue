<script setup lang="ts">
interface Props {
  variant?: 'solid' | 'outline' | 'navy' | 'ghost' | 'light'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'solid',
  size: 'md',
  type: 'button',
  disabled: false,
})

defineEmits<{
  click: [e: MouseEvent]
}>()

const base =
  'inline-flex items-center justify-center font-semibold rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

const sizes = {
  sm: 'px-3.5 py-2 text-sm rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3.5 text-[15px] rounded-lg',
}

const variants = {
  solid:
    'bg-accent-500 border-accent-500 text-navy-900 hover:bg-accent-600 hover:border-accent-600 active:bg-accent-700 focus:ring-accent-500/40 shadow-sm hover:shadow-md',
  outline:
    'bg-transparent border-white/80 text-white hover:bg-white/10 hover:border-white focus:ring-white/30',
  navy:
    'bg-navy-700 border-navy-700 text-white hover:bg-navy-800 hover:border-navy-800 active:bg-navy-900 focus:ring-navy-500/40 shadow-sm hover:shadow-md',
  ghost:
    'bg-transparent border-transparent text-navy-800 hover:bg-navy-50 focus:ring-navy-200/60',
  light:
    'bg-white border-border-card text-navy-800 hover:border-navy-300 hover:shadow-sm focus:ring-navy-200/50',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[base, sizes[size], variants[variant]]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
