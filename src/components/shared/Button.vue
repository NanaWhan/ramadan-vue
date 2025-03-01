<template>
  <button
    :class="[
      'font-bold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const variantClasses = computed(() => {
  const classes = {
    primary: 'bg-accent-color text-dark-color hover:bg-yellow-600',
    secondary: 'bg-secondary-color text-dark-color hover:bg-gray-300',
    outline: 'bg-transparent border border-accent-color text-accent-color hover:bg-accent-color hover:text-dark-color',
    text: 'bg-transparent text-accent-color hover:text-yellow-600 underline'
  }
  
  return classes[props.variant as keyof typeof classes]
})

const sizeClasses = computed(() => {
  const classes = {
    small: 'px-4 py-1 text-sm',
    medium: 'px-6 py-2',
    large: 'px-8 py-3 text-lg'
  }
  
  return classes[props.size as keyof typeof classes]
})
</script>

<style scoped>
.bg-accent-color {
  background-color: var(--accent-color);
}

.text-accent-color {
  color: var(--accent-color);
}

.border-accent-color {
  border-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}

.bg-secondary-color {
  background-color: var(--secondary-color);
}
</style>