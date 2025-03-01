<template>
  <section id="donate" class="relative py-28 text-white">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 bg-dark-color/70 z-0"></div>
    <img 
      :src="bannerImage" 
      class="absolute inset-0 object-cover w-full h-full z-[-1]"
      alt="Banner" 
    />
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Make a Difference Today</h2>
        <p class="text-xl text-gray-300 mb-10">
          Your donation can help provide essential meals to those in need
          this Ramadan
        </p>
        
        <div class="flex flex-col md:flex-row justify-center gap-4">
          <Button 
            variant="primary" 
            size="large" 
            @click="openDonationModal('mobile')"
          >
            Mobile Money
          </Button>
          
          <Button 
            variant="primary" 
            size="large" 
            @click="openDonationModal('bank')"
          >
            Bank Transfer
          </Button>
          
          <Button 
            variant="primary" 
            size="large" 
            @click="openDonationModal('card')"
          >
            Card Payment
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Payment Modals -->
    <DonationModal 
      v-if="showDonationModal"
      :amount="1000"
      :initial-tab="activePaymentMethod"
      @close="showDonationModal = false"
      @donate="processDonation"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/shared/Button.vue'
import DonationModal from '@/components/shared/DonationModal.vue'
import bannerImage from '../../assets/images/banner.jpg'

const showDonationModal = ref(false)
const activePaymentMethod = ref('')

const openDonationModal = (method: string) => {
  // Map method to tab ID
  const methodMap: Record<string, string> = {
    'mobile': 'mobile-money',
    'bank': 'bank-transfer',
    'card': 'card-payment'
  }
  
  activePaymentMethod.value = methodMap[method] || 'mobile-money'
  showDonationModal.value = true
}

const processDonation = (method: string, details: any) => {
  // Process donation (you would typically call an API here)
  console.log(`Processing ${method} donation`, details)
  
  // Close modal
  showDonationModal.value = false
  
  // Show success message
  alert(`Thank you for your donation!`)
}
</script>
