<template>
  <button
    :class="[
      'font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      roundedClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'flex items-center justify-center': $slots['icon-left'] || $slots['icon-right'] },
      mobileClasses,
      className
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    <!-- Left icon slot -->
    <slot name="icon-left"></slot>
    
    <!-- Main content -->
    <span>
      <slot></slot>
    </span>
    
    <!-- Right icon slot -->
    <slot name="icon-right"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResponsiveDonation } from '@/utils/responsiveDonation'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'text', 'success', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  },
  rounded: {
    type: String,
    default: 'full',
    validator: (value: string) => ['none', 'sm', 'md', 'lg', 'full'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  mobileFullWidth: {
    type: Boolean,
    default: false
  },
  mobileSize: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'small', 'medium', 'large'].includes(value)
  },
  className: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])

// Use responsive utilities
const { isMobile } = useResponsiveDonation()

const variantClasses = computed(() => {
  const classes = {
    primary: 'bg-accent-color text-dark-color hover:bg-yellow-600 focus:ring-yellow-500',
    secondary: 'bg-secondary-color text-dark-color hover:bg-gray-300 focus:ring-gray-400',
    outline: 'bg-transparent border border-accent-color text-accent-color hover:bg-accent-color hover:text-dark-color focus:ring-yellow-500',
    text: 'bg-transparent text-accent-color hover:text-yellow-600 underline focus:ring-transparent',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  
  return classes[props.variant as keyof typeof classes]
})

const sizeClasses = computed(() => {
  // Use mobile size if specified and on mobile device
  const effectiveSize = (props.mobileSize && isMobile.value) 
    ? props.mobileSize 
    : props.size
    
  const classes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-5 py-2 text-base',
    large: 'px-8 py-3 text-lg'
  }
  
  return classes[effectiveSize as keyof typeof classes]
})

const roundedClasses = computed(() => {
  const classes = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
  
  return classes[props.rounded as keyof typeof classes]
})

const mobileClasses = computed(() => {
  return props.mobileFullWidth && isMobile.value ? 'w-full' : ''
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

.focus\:ring-yellow-500:focus {
  --tw-ring-color: rgba(245, 158, 11, 0.5);
}

.focus\:ring-gray-400:focus {
  --tw-ring-color: rgba(156, 163, 175, 0.5);
}

.focus\:ring-green-500:focus {
  --tw-ring-color: rgba(16, 185, 129, 0.5);
}

.focus\:ring-red-500:focus {
  --tw-ring-color: rgba(239, 68, 68, 0.5);
}
</style>