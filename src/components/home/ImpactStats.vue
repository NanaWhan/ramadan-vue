<template>
  <section id="impact" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in impactStats" 
          :key="stat.value"
          class="text-center"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <h3 class="text-4xl font-bold mb-2">{{ stat.value }}</h3>
          <p class="text-gray-600">{{ stat.label }}</p>
        </div>
      </div>
      
      <div class="max-w-3xl mx-auto mt-16">
        <div class="bg-white p-8 rounded-lg shadow-sm text-center">
          <blockquote class="text-lg md:text-xl italic text-gray-600 mb-4">
            "This project has been a blessing to our community, ensuring
            we have food during Ramadan."
          </blockquote>
          <footer class="text-gray-500">Community Leader</footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ImpactStat {
  value: string
  label: string
}

const impactStats = ref<ImpactStat[]>([
  {
    value: '10,000+',
    label: 'Beneficiaries'
  },
  {
    value: '50+',
    label: 'Communities Served'
  },
  {
    value: '100+',
    label: 'Volunteers Engaged'
  },
  {
    value: '3',
    label: 'Cities Covered'
  }
])
</script>