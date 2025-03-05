<template>
  <section id="get-involved" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16">Get Involved</h2>
      
      <!-- Donation Options - Full Width -->
      <div class="max-w-3xl mx-auto">
        <h3 class="text-2xl font-bold mb-8 text-center">Donate Today</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div 
            v-for="option in donationOptions" 
            :key="option.title"
            class="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <h4 class="text-xl font-bold mb-2">{{ option.title }}</h4>
            <p class="text-gray-600 mb-4">{{ option.price }}</p>
            <button 
              class="bg-yellow-500 hover:bg-yellow-600 text-dark-color rounded-full px-6 py-2 font-bold transition-colors"
              @click="openDonationModal(option.amount)"
            >
              Donate
            </button>
          </div>
        </div>
        
        <!-- Other Ways to Get Involved -->
        <div class="bg-gray-100 rounded-lg p-8 text-center">
          <h3 class="text-2xl font-bold mb-4">Other Ways to Help</h3>
          <p class="text-gray-600 mb-6">
            Besides donations and volunteering, there are many other ways you can support our mission:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h4 class="font-bold text-lg mb-2">Spread the Word</h4>
              <p class="text-gray-600">
                Share our mission with your friends, family, and on social media to raise awareness.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h4 class="font-bold text-lg mb-2">Organize a Fundraiser</h4>
              <p class="text-gray-600">
                Host your own fundraising event to support our Ramadan Relief Project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Donation Modal -->
    <DonationModal 
      v-if="showDonationModal"
      :amount="selectedAmount"
      @close="showDonationModal = false"
      @donate="processDonation"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DonationModal from '@/components/shared/DonationModal.vue'

// Donation options
interface DonationOption {
  title: string
  price: string
  amount: number
}

const donationOptions = ref<DonationOption[]>([
  {
    title: 'Individual Meal',
    price: 'GHS 50 per person',
    amount: 50
  },
  {
    title: 'Monthly Package (Individual)',
    price: 'GHS 1,500',
    amount: 1500
  },
  {
    title: 'Monthly Package (Family)',
    price: 'GHS 3,000',
    amount: 3000
  }
])

// Donation modal
const showDonationModal = ref(false)
const selectedAmount = ref(0)

const openDonationModal = (amount: number) => {
  selectedAmount.value = amount
  showDonationModal.value = true
}

const processDonation = (method: string, details: any) => {
  // Process donation (you would typically call an API here)
  console.log(`Processing ${method} donation for GHS ${selectedAmount.value}`, details)
  
  // Close modal
  showDonationModal.value = false
  
  // Show success message
  alert(`Thank you for your donation of GHS ${selectedAmount.value}!`)
}
</script>

<style scoped>
.text-dark-color {
  color: var(--dark-color);
}
</style>