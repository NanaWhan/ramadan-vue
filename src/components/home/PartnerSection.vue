<template>
  <section id="partner" class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Partner With Us</h2>
        <p class="text-lg text-gray-600 mb-8">
          Join forces with Ramadan Relief Project to create a bigger impact and support communities in need
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Partner Info -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold mb-6">Partnership Opportunities</h3>
          
          <div class="space-y-4">
            <div class="border-l-4 border-accent-color pl-4 py-2">
              <h4 class="text-lg font-bold">Corporate Sponsors</h4>
              <p class="text-gray-600">Financial support for our programs and initiatives</p>
            </div>
            
            <div class="border-l-4 border-accent-color pl-4 py-2">
              <h4 class="text-lg font-bold">Food & Supply Partners</h4>
              <p class="text-gray-600">In-kind donations of food items and essential supplies</p>
            </div>
            
            <div class="border-l-4 border-accent-color pl-4 py-2">
              <h4 class="text-lg font-bold">Logistics Partners</h4>
              <p class="text-gray-600">Transportation and distribution support for relief packages</p>
            </div>
            
            <div class="border-l-4 border-accent-color pl-4 py-2">
              <h4 class="text-lg font-bold">Media Partners</h4>
              <p class="text-gray-600">Promotion and coverage of our activities and events</p>
            </div>
          </div>
        </div>
        
        <!-- Partner Contact Form -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold mb-6">Contact Us for Partnership</h3>
          
          <form @submit.prevent="submitPartnerForm" class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-1">Organization Name</label>
              <input
                v-model="partnerForm.organization"
                type="text"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Your Organization"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Contact Person</label>
              <input
                v-model="partnerForm.contactPerson"
                type="text"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Contact Person"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Email Address</label>
              <input
                v-model="partnerForm.email"
                type="email"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Email Address"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Phone Number</label>
              <input
                v-model="partnerForm.phone"
                type="tel"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Phone Number"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Message</label>
              <textarea
                v-model="partnerForm.message"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                rows="3"
                placeholder="Tell us about your organization and how you would like to partner with us"
                required
              ></textarea>
            </div>
            
            <div class="pt-2">
              <button 
                type="submit" 
                class="bg-accent-color text-dark-color font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors w-full"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PartnerFormData {
  organization: string
  contactPerson: string
  email: string
  phone: string
  message: string
}

const partnerForm = ref<PartnerFormData>({
  organization: '',
  contactPerson: '',
  email: '',
  phone: '',
  message: ''
})

const submitPartnerForm = () => {
  // In a real app, you would send this to an API
  console.log('Partner form submitted:', partnerForm.value)
  
  // Show success message
  alert('Thank you for your partnership inquiry! Our team will contact you soon.')
  
  // Reset form
  partnerForm.value = {
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: ''
  }
}
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.border-accent-color {
  border-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}
</style>