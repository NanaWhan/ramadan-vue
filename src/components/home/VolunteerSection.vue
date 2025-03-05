<template>
  <section id="volunteer" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Volunteer With Us</h2>
        <p class="text-lg text-gray-600 mb-8">
          Join our team of dedicated volunteers and make a real difference in the lives of those in need this Ramadan
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Volunteer Opportunities -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold mb-6">How You Can Help</h3>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-accent-color/10 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold mb-1">Food Package Assembly</h4>
                <p class="text-gray-600">Help prepare and package food items for distribution to families in need.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-accent-color/10 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold mb-1">Community Outreach</h4>
                <p class="text-gray-600">Identify families in need and coordinate with community leaders.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-accent-color/10 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold mb-1">Distribution & Logistics</h4>
                <p class="text-gray-600">Help transport and distribute relief packages to various communities.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-accent-color/10 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold mb-1">Event Organization</h4>
                <p class="text-gray-600">Help organize and manage community iftars and Eid celebrations.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Volunteer Form -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold mb-6">Sign Up to Volunteer</h3>
          
          <form @submit.prevent="submitVolunteerForm" class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-1">Full Name</label>
              <input
                v-model="volunteerForm.name"
                type="text"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Your Name"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Email Address</label>
              <input
                v-model="volunteerForm.email"
                type="email"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Your Email"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Phone Number</label>
              <input
                v-model="volunteerForm.phone"
                type="tel"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                placeholder="Your Phone"
                required
              />
            </div>
            
            <div>
              <label class="block text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                v-model="volunteerForm.message"
                class="w-full bg-gray-100 border-0 rounded-lg p-3"
                rows="3"
                placeholder="Tell us about your skills or any additional information"
              ></textarea>
            </div>
            
            <div class="pt-2">
              <button 
                type="submit" 
                class="bg-accent-color text-dark-color font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors w-full"
              >
                Sign Up to Volunteer
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

const submitVolunteerForm = () => {
  // In a real app, you would send this to an API
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
.bg-accent-color\/10 {
  background-color: rgba(244, 190, 55, 0.1);
}

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