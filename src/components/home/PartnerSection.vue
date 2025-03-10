<!-- src/components/home/PartnerSection.vue -->
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
          
          <!-- Success message -->
          <div v-if="formSuccess" class="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
            <p class="font-bold">Registration Successful!</p>
            <p>{{ successMessage }}</p>
            <button 
              @click="resetForm" 
              class="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Register Another Partner
            </button>
          </div>

          <!-- Error message -->
          <div v-else-if="formError" class="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            <p class="font-bold">Registration Failed</p>
            <p>{{ errorMessage }}</p>
            <button 
              @click="formError = false" 
              class="mt-2 bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
          
          <form v-else @submit.prevent="submitPartnerForm" class="space-y-4">
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
              <label class="block text-gray-700 mb-1">City</label>
              <input
                v-model="partnerForm.city"
                type="text"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="City"
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
                class="relative bg-accent-color text-dark-color font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors w-full disabled:opacity-75"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-color" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ isSubmitting ? 'Submitting...' : 'Submit Inquiry' }}
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
import ApiService, { type PartnerRegistrationRequest } from '@/services/apiService'

interface PartnerFormData {
  organization: string
  contactPerson: string
  email: string
  phone: string
  city: string
  message: string
}

const partnerForm = ref<PartnerFormData>({
  organization: '',
  contactPerson: '',
  email: '',
  phone: '',
  city: '',
  message: ''
})

// Form state
const isSubmitting = ref(false);
const formSuccess = ref(false);
const formError = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const submitPartnerForm = async () => {
  try {
    isSubmitting.value = true;
    formError.value = false;
    
    const partnerData: PartnerRegistrationRequest = {
      organizationName: partnerForm.value.organization,
      contactPerson: partnerForm.value.contactPerson,
      email: partnerForm.value.email,
      phone: partnerForm.value.phone,
      city: partnerForm.value.city,
      message: partnerForm.value.message
    };
    
    const response = await ApiService.registerPartner(partnerData);
    
    if (response && response.isSuccess) {
      formSuccess.value = true;
      successMessage.value = response.message || 'Thank you for your partnership inquiry! Our team will contact you soon.';
    } else {
      throw new Error(response.message || 'Failed to submit partnership inquiry');
    }
  } catch (error) {
    console.error('Error submitting partnership inquiry:', error);
    formError.value = true;
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred while submitting your inquiry. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}

const resetForm = () => {
  partnerForm.value = {
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  };
  formSuccess.value = false;
  formError.value = false;
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