<template>
  <section id="get-involved" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16">Get Involved</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Donation Options -->
        <div>
          <h3 class="text-2xl font-bold mb-8">Donate Today</h3>
          
          <div class="space-y-8">
            <div v-for="option in donationOptions" :key="option.title" class="mb-8">
              <h4 class="text-xl font-bold mb-2">{{ option.title }}</h4>
              <p class="text-gray-600 mb-3">{{ option.price }}</p>
              <button 
                class="bg-yellow-500 hover:bg-yellow-600 text-dark-color rounded-full px-6 py-2 font-bold transition-colors"
                @click="openDonationModal(option.amount)"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
        
        <!-- Volunteer Form -->
        <div>
          <h3 class="text-2xl font-bold mb-8">Volunteer With Us</h3>
          
          <form @submit.prevent="submitVolunteerForm" class="space-y-4">
            <div>
              <input
                v-model="volunteerForm.name"
                type="text"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Your Name"
                required
              />
            </div>
            
            <div>
              <input
                v-model="volunteerForm.email"
                type="email"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Your Email"
                required
              />
            </div>
            
            <div>
              <input
                v-model="volunteerForm.phone"
                type="tel"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Your Phone"
                required
              />
            </div>
            
            <div>
              <textarea
                v-model="volunteerForm.message"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                rows="4"
                placeholder="How would you like to help?"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="bg-yellow-500 hover:bg-yellow-600 text-dark-color rounded-full px-6 py-2 font-bold transition-colors"
            >
              Sign Up to Volunteer
            </button>
          </form>
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

// Volunteer form
interface VolunteerFormData {
  name: string
  email: string
  phone: string
  message: string
}

const volunteerForm = ref<VolunteerFormData>({
  name: '',
  email: '',
  phone: '',
  message: ''
})

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

const submitVolunteerForm = () => {
  // Process volunteer form submission (you would typically call an API here)
  console.log('Volunteer form submitted:', volunteerForm.value)
  
  // Show success message
  alert('Thank you for signing up to volunteer! We will contact you soon.')
  
  // Reset form
  volunteerForm.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
}
</script>

<style scoped>
.text-dark-color {
  color: var(--dark-color);
}
</style>