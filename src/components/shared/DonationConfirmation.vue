<template>
  <div class="donation-confirmation">
    <!-- Confirmation Banner -->
    <section class="relative py-20 text-white">
      <!-- Background with overlay -->
      <div class="absolute inset-0 bg-dark-color/60 z-0"></div>
      <img 
        :src="bannerImage" 
        class="absolute inset-0 object-cover w-full h-full z-[-1]"
        alt="Banner" 
      />
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <div class="mb-6">
            <div class="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
          <p class="text-xl text-white">
            Your donation has been successfully received
          </p>
        </div>
      </div>
    </section>
    
    <!-- Donation Details -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <!-- Donation Receipt Card -->
          <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold">Donation Receipt</h2>
              <p class="text-gray-600">
                Reference ID: {{ transactionId }}
              </p>
            </div>
            
            <div class="space-y-4 mb-8">
              <div class="flex justify-between py-3 border-b">
                <span class="text-gray-600">Amount:</span>
                <span class="font-bold text-xl">GHS {{ formatNumber(amount) }}</span>
              </div>
              
              <div class="flex justify-between py-3 border-b">
                <span class="text-gray-600">Date:</span>
                <span>{{ formatDate(date) }}</span>
              </div>
              
              <div class="flex justify-between py-3 border-b">
                <span class="text-gray-600">Payment Method:</span>
                <span>{{ paymentMethod }}</span>
              </div>
              
              <div class="flex justify-between py-3 border-b">
                <span class="text-gray-600">Status:</span>
                <span class="text-green-600 font-medium">Completed</span>
              </div>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-lg mb-8">
              <div class="flex items-start">
                <div class="flex-shrink-0 text-accent-color mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Receipt</h4>
                  <p class="text-gray-600 text-sm">
                    A confirmation email has been sent to you. If you need assistance, 
                    please contact us at <a href="mailto:support@ramadanreliefghana.org" class="text-accent-color hover:underline">support@ramadanreliefghana.org</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                @click="downloadReceipt" 
                class="bg-accent-color text-dark-color rounded-full px-6 py-3 font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Receipt
              </button>
              
              <button 
                @click="printReceipt" 
                class="border border-gray-300 text-gray-700 rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Receipt
              </button>
            </div>
          </div>
          
          <!-- Impact Information -->
          <div class="bg-gray-50 rounded-lg p-8">
            <h3 class="text-2xl font-bold mb-4 text-center">Your Impact</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="bg-white rounded-lg shadow-sm p-6 text-center">
                <div class="text-5xl font-bold text-accent-color mb-2">{{ impactMetrics.meals }}</div>
                <p class="text-gray-600">Meals Provided</p>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm p-6 text-center">
                <div class="text-5xl font-bold text-accent-color mb-2">{{ impactMetrics.people }}</div>
                <p class="text-gray-600">People Helped</p>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm p-6 text-center">
                <div class="text-5xl font-bold text-accent-color mb-2">{{ impactMetrics.days }}</div>
                <p class="text-gray-600">Days of Support</p>
              </div>
            </div>
            
            <p class="text-gray-600 text-center mb-8">
              Thank you for your generosity. Your donation will make a significant difference
              in the lives of many people during Ramadan.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <RouterLink 
                to="/" 
                class="bg-dark-color text-white rounded-full px-6 py-3 font-bold hover:bg-gray-900 transition-colors text-center"
              >
                Return Home
              </RouterLink>
              
              <RouterLink 
                to="/donate" 
                class="border border-dark-color text-dark-color rounded-full px-6 py-3 font-medium hover:bg-dark-color hover:text-white transition-colors text-center"
              >
                Make Another Donation
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Share Donation -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6">Spread the Word</h2>
          <p class="text-gray-600 mb-8">
            Help us reach more people by sharing about your donation
          </p>
          
          <div class="flex flex-wrap justify-center gap-4">
            <button 
              @click="shareOnFacebook" 
              class="bg-blue-600 text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              Share on Facebook
            </button>
            
            <button 
              @click="shareOnTwitter" 
              class="bg-sky-500 text-white rounded-full px-6 py-3 font-bold hover:bg-sky-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Share on Twitter
            </button>
            
            <button 
              @click="shareViaEmail" 
              class="bg-gray-800 text-white rounded-full px-6 py-3 font-bold hover:bg-gray-900 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Share via Email
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import bannerImage from '@/assets/images/banner.jpg'

// Props
const props = defineProps<{
  transactionId: string
  amount: number
  date: Date
  paymentMethod: string
}>()

// Computed
const impactMetrics = computed(() => {
  const mealsPerPerson = 3
  const costPerMeal = 16.67 // GHS 50 / 3 meals
  const meals = Math.floor(props.amount / costPerMeal)
  const people = Math.floor(meals / mealsPerPerson)
  const days = Math.floor(people > 0 ? meals / people : 0)
  
  return {
    meals,
    people,
    days
  }
})

// Methods
const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const downloadReceipt = () => {
  // In a real implementation, this would generate a PDF receipt
  alert('Receipt download functionality would be implemented here')
}

const printReceipt = () => {
  window.print()
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`I just donated GHS ${formatNumber(props.amount)} to the Ramadan Relief Project. Join me in making a difference!`)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`I just donated GHS ${formatNumber(props.amount)} to the Ramadan Relief Project. Join me in making a difference! #RamadanRelief`)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareViaEmail = () => {
  const subject = encodeURIComponent('Join me in supporting the Ramadan Relief Project')
  const body = encodeURIComponent(`I just donated GHS ${formatNumber(props.amount)} to the Ramadan Relief Project. They're doing amazing work to support communities during Ramadan. Check them out and consider donating: ${window.location.origin}`)
  window.location.href = `mailto:?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

@media print {
  .donation-confirmation section:not(:first-of-type) {
    display: none;
  }
  
  .donation-confirmation button {
    display: none;
  }
}
</style>