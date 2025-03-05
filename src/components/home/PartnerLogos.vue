<template>
  <section id="partners" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-10">
        <h3 class="text-2xl font-bold mb-4">Our Partners & Sponsors</h3>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="index in 4" 
          :key="index"
          class="flex items-center justify-center h-20 md:h-24"
        >
          <img 
            :src="getPartnerLogoUrl(index)" 
            :alt="`Partner ${index}`"
            class="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all hover:scale-105"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Method to get partner logo URLs
const getPartnerLogoUrl = (index: number): string => {
  try {
    return new URL(`../../assets/images/partners/partner${index}.jpg`, import.meta.url).href
  } catch (error) {
    console.error('Error loading partner logo:', error)
    return new URL('../../assets/images/partners/placeholder.jpg', import.meta.url).href
  }
}
</script>