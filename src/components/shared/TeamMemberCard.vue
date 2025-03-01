<template>
  <div class="bg-white p-6 rounded-lg shadow-sm h-full text-center transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
    <div class="mb-4 flex justify-center">
      <div class="w-24 h-24 rounded-full overflow-hidden border-4" :class="borderClass">
        <img 
          :src="getImageUrl(member.image)" 
          :alt="member.name"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    
    <h4 class="text-xl font-bold mb-2">{{ member.name }}</h4>
    <p class="text-accent-color font-medium mb-2">{{ member.role }}</p>
    <p class="text-gray-500 text-sm">{{ member.organization }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TeamMember {
  name: string
  role: string
  organization: string
  image: string
}

const props = defineProps<{
  member: TeamMember
  variant?: 'primary' | 'secondary'
}>()

// Computed styles
const borderClass = computed(() => {
  return props.variant === 'secondary' 
    ? 'border-secondary-color' 
    : 'border-accent-color'
})

// Method to get the correct image URL
const getImageUrl = (filename: string): string => {
  try {
    // Use dynamic import to get the image URL
    return new URL(`../../assets/images/team/${filename}`, import.meta.url).href
  } catch (error) {
    console.error('Error loading image:', error)
    return new URL('../../assets/images/team/placeholder.jpg', import.meta.url).href
  }
}
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.border-accent-color {
  border-color: var(--accent-color);
}

.border-secondary-color {
  border-color: var(--secondary-color);
}
</style>