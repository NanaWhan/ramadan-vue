<!-- src/components/home/EidEvent.vue -->
<template>
  <section id="eid-event" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Eid Feeding Event</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(location, index) in locations" 
          :key="location.id"
          class="bg-white rounded-lg shadow p-8 text-center"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <h3 class="text-2xl font-bold mb-3">{{ location.city }}</h3>
          <p class="text-gray-600 mb-6">Join us for our mass feeding event in {{ location.city }}</p>
          <button 
            class="btn-primary"
            @click="openRegistrationForm(location)"
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
            @click="closeRegistrationModal" 
            class="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Success message -->
        <div v-if="registrationSuccess" class="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
          <p class="font-bold">Registration Successful!</p>
          <p>{{ successMessage }}</p>
          <button 
            @click="closeRegistrationModal" 
            class="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Close
          </button>
        </div>

        <!-- Error message -->
        <div v-else-if="registrationError" class="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          <p class="font-bold">Registration Failed</p>
          <p>{{ errorMessage }}</p>
          <button 
            @click="registrationError = false" 
            class="mt-2 bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Try Again
          </button>
        </div>
        
        <form v-else @submit.prevent="submitRegistration">
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
                v-model.number="registrationForm.numberOfPeople"
                type="number"
                min="1"
                class="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div class="pt-4">
              <button 
                type="submit" 
                class="relative w-full bg-accent-color text-dark-color font-bold py-2 rounded-lg disabled:opacity-75"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-color" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ isSubmitting ? 'Submitting...' : 'Complete Registration' }}
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
import ApiService, { type EventRegistrationRequest } from '@/services/apiService'

// Event locations
interface EventLocation {
  id: string
  city: string
}

const locations = [
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", city: 'Tema' },
  { id: "4fa85f64-5717-4562-b3fc-2c963f66afa7", city: 'Kumasi' },
  { id: "5fa85f64-5717-4562-b3fc-2c963f66afa8", city: 'Tamale' }
]

// Registration modal state
const showRegistrationModal = ref(false)
const selectedCity = ref('')
const selectedEventId = ref('')
const isSubmitting = ref(false)
const registrationSuccess = ref(false)
const registrationError = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Registration form data
interface RegistrationFormData {
  name: string
  email: string
  phone: string
  numberOfPeople: number
}

const registrationForm = ref<RegistrationFormData>({
  name: '',
  email: '',
  phone: '',
  numberOfPeople: 1
})

// Methods
const openRegistrationForm = (location: EventLocation) => {
  selectedCity.value = location.city
  selectedEventId.value = location.id
  resetForm()
  showRegistrationModal.value = true
}

const closeRegistrationModal = () => {
  showRegistrationModal.value = false
  resetForm()
}

const resetForm = () => {
  registrationForm.value = {
    name: '',
    email: '',
    phone: '',
    numberOfPeople: 1
  }
  registrationSuccess.value = false
  registrationError.value = false
}

const submitRegistration = async () => {
  try {
    isSubmitting.value = true
    registrationError.value = false
    
    const eventRegistrationData: EventRegistrationRequest = {
      fullName: registrationForm.value.name,
      email: registrationForm.value.email,
      phoneNumber: registrationForm.value.phone,
      numberOfPeople: registrationForm.value.numberOfPeople,
      eventId: selectedEventId.value
    }
    
    const response = await ApiService.registerForEvent(eventRegistrationData)
    
    if (response && response.isSuccess) {
      registrationSuccess.value = true
      successMessage.value = response.message || `Thank you for registering for the ${selectedCity.value} Eid event! We'll contact you with more details soon.`
    } else {
      throw new Error(response.message || 'Failed to register for event')
    }
  } catch (error) {
    console.error('Error registering for event:', error)
    registrationError.value = true
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred while submitting your registration. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}

.btn-primary {
  background-color: var(--accent-color);
  color: var(--dark-color);
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #e5b129;
}
</style>