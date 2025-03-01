<template>
  <section id="news" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">News & Updates</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(news, index) in newsItems" 
          :key="news.title"
          class="overflow-hidden bg-white rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <div class="overflow-hidden h-48">
            <img 
              :src="getImageUrl(news.image)" 
              :alt="news.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{{ news.title }}</h3>
            <p class="text-gray-600 mb-4">{{ news.description }}</p>
            <a href="#" class="text-accent-color font-medium hover:underline">Read More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface NewsItem {
  title: string
  description: string
  image: string
}

const newsItems = ref<NewsItem[]>([
  {
    title: 'Project Milestone Reached',
    description: '5,000 food packages distributed in first week',
    image: 'news1.jpg'
  },
  {
    title: 'Volunteer Training Complete',
    description: '100 volunteers ready for distribution',
    image: 'news2.jpg'
  },
  {
    title: 'New Partnership Announced',
    description: 'Local businesses join our mission',
    image: 'news3.jpg'
  }
])

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
</style>