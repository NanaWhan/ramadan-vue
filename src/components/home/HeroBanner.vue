<template>
  <section id="home" class="relative min-h-screen flex items-center text-white">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 bg-dark-color/60 z-0"></div>
    <div 
      class="absolute inset-0 bg-cover bg-center z-[-1]" 
      style="background-image: url('@/assets/images/banner.jpg');"
    ></div>
    
    <div class="container mx-auto px-4 py-20 pt-32 z-10">
      <div class="md:w-2/3 lg:w-1/2">
        <div class="my-5">
          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Welcome to Ramadan Relief Project {{ currentYear }}
          </h2>
          <p class="text-xl md:text-2xl mb-8">
            Join us in feeding 10,000 people this Ramadan. Help us spread
            kindness and support those in need.
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div v-for="(card, index) in actionCards" :key="index" 
             class="bg-dark-color/90 p-6 rounded-lg transition-all duration-300 transform hover:scale-105"
             :class="{'aos-animate': true}"
             data-aos="fade-up"
             :data-aos-delay="index * 300">
          <h3 class="text-accent-color text-xl font-bold mb-3">{{ card.title }}</h3>
          <p class="text-gray-300 mb-4">{{ card.description }}</p>
          <RouterLink :to="card.link" class="inline-block bg-accent-color text-dark-color px-5 py-2 rounded-full font-bold hover:bg-white transition-colors">
            {{ card.buttonText }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())

const actionCards = [
  {
    title: 'Donate Today',
    description: 'Support our mission to provide essential food packages to those in need during Ramadan.',
    buttonText: 'Donate Now',
    link: '/donate'
  },
  {
    title: 'Volunteer With Us',
    description: 'Join our team to help distribute food and manage logistics throughout Ramadan.',
    buttonText: 'Join Now',
    link: '/#volunteer'
  },
  {
    title: 'Partner With Us',
    description: 'Become a corporate partner or sponsor to amplify our impact this Ramadan.',
    buttonText: 'Partner Now',
    link: '/#partner'
  }
]
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}
</style>