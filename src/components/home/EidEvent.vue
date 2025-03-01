<template>
  <section id="eid-event" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Eid Feeding Event</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(location, index) in locations" 
          :key="location.city"
          class="bg-white rounded-lg shadow p-8 text-center"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <h3 class="text-2xl font-bold mb-3">{{ location.city }}</h3>
          <p class="text-gray-600 mb-6">Join us for our mass feeding event in {{ location.city }}</p>
          <button 
            class="btn-primary"
            @click="openRegistrationForm(location.city)"
          >
            Register
          </button>
        </div>
      </div>
    </div>
    
    <!-- Registration Modal -->
    <div 
      v-if="showRegistrationModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Register for {{ selectedCity }} Event</h3>
          <button 
            @click="showRegistrationModal = false" 
            class="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitRegistration">
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-1">Full Name</label>
              <input
                v-model="registrationForm.name"
                type="text"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Email</label>
              <input
                v-model="registrationForm.email"
                type="email"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Phone Number</label>
              <input
                v-model="registrationForm.phone"
                type="tel"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Number of People</label>
              <input
                v-model="registrationForm.numberOfPeople"
                type="number"
                min="1"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div class="pt-4">
              <button 
                type="submit" 
                class="w-full bg-accent-color text-dark-color font-bold py-2 rounded-lg"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Event locations
const locations = [
  { city: 'Tema' },
  { city: 'Kumasi' },
  { city: 'Tamale' }
]

// Registration modal state
const showRegistrationModal = ref(false)
const selectedCity = ref('')

// Registration form data
interface RegistrationForm {
  name: string
  email: string
  phone: string
  numberOfPeople: number
}

const registrationForm = ref<RegistrationForm>({
  name: '',
  email: '',
  phone: '',
  numberOfPeople: 1
})

// Methods
const openRegistrationForm = (city: string) => {
  selectedCity.value = city
  showRegistrationModal.value = true
}

const submitRegistration = () => {
  // In a real app, you would send this to an API
  console.log(`Registration for ${selectedCity.value} event:`, registrationForm.value)
  
  // Show success message
  alert(`Thank you for registering for the ${selectedCity.value} Eid event! We'll contact you with more details soon.`)
  
  // Reset form and close modal
  registrationForm.value = {
    name: '',
    email: '',
    phone: '',
    numberOfPeople: 1
  }
  showRegistrationModal.value = false
}
</script>

<style scoped>
.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}
</style>