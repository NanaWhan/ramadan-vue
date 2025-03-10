<!-- src/components/shared/Button.vue -->
<template>
  <button
    :class="[
      'font-bold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 relative',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="absolute left-4 top-1/2 transform -translate-y-1/2">
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    
    <!-- Main content - add padding when loading is active to account for spinner -->
    <span :class="{ 'pl-8': loading }">
      <slot></slot>
    </span>
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
  },
  loading: {
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