<template>
  <section id="resources" class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ramadan Resources</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(resource, index) in resources" 
          :key="resource.title"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <h3 class="text-xl font-bold mb-4">{{ resource.title }}</h3>
          
          <ul class="space-y-2 mb-6">
            <li 
              v-for="(item, itemIndex) in resource.items" 
              :key="itemIndex"
              class="flex items-start"
            >
              <svg class="h-5 w-5 text-accent-color mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-600">{{ item }}</span>
            </li>
          </ul>
          
          <RouterLink 
            :to="resource.link" 
            class="inline-block text-accent-color font-medium hover:underline"
          >
            Learn More
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

interface Resource {
  title: string
  items: string[]
  link: string
}

const resources = ref<Resource[]>([
  {
    title: 'Fasting & Nutrition Tips',
    items: [
      'Healthy suhoor ideas',
      'Balanced iftar meals',
      'Staying hydrated',
      'Energy management'
    ],
    link: '/resources#nutrition'
  },
  {
    title: 'Islamic Teachings on Charity',
    items: [
      'Importance of Zakat',
      'Sadaqah in Ramadan',
      'Rewards of giving',
      'Community support'
    ],
    link: '/resources#charity'
  },
  {
    title: 'Daily Reflections',
    items: [
      'Ramadan wisdom',
      'Prayer times',
      'Spiritual growth',
      'Community unity'
    ],
    link: '/resources#reflections'
  }
])
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}
</style>