<template>
  <section id="donation-counter" class="bg-gray-100 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all hover:shadow-xl">
          <h3 class="text-2xl font-bold mb-6">Help Us Reach Our Goal</h3>
          
          <div class="text-5xl font-bold text-accent-color mb-3" data-aos="fade-up">
            GHS {{ formatNumber(totalDonations) }}
          </div>
          
          <div class="text-gray-600 mb-6" data-aos="fade-up" data-aos-delay="100">
            of GHS {{ formatNumber(donationGoal) }} goal
          </div>
          
          <div class="h-3 bg-gray-200 rounded-full mb-8 relative overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <div 
              class="h-full bg-accent-color rounded-full transition-all duration-1500 ease-out" 
              :style="{ width: progressPercentage + '%' }"
              role="progressbar"
              :aria-valuenow="progressPercentage"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          
          <div class="grid grid-cols-3 gap-4 mb-8" data-aos="fade-up" data-aos-delay="300">
            <div class="donation-stat p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-dark-color">{{ totalDonors }}</div>
              <div class="text-gray-600">Donors</div>
            </div>
            <div class="donation-stat p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-dark-color">{{ daysLeft }}</div>
              <div class="text-gray-600">Days Left</div>
            </div>
            <div class="donation-stat p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-dark-color">{{ mealsServed }}</div>
              <div class="text-gray-600">Meals Served</div>
            </div>
          </div>
          
          <div class="flex justify-center" data-aos="fade-up" data-aos-delay="400">
            <RouterLink to="/donate" class="bg-accent-color text-dark-color rounded-full px-8 py-3 font-bold hover:bg-yellow-600 transition-colors shadow-md">
              Donate Now
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Donation notification toast -->
    <div 
      class="fixed bottom-5 right-5 z-50 bg-dark-color text-white py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-500 flex items-center"
      :class="showNotification ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="w-8 h-8 bg-accent-color rounded-full flex items-center justify-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-dark-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      {{ notificationMessage }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// State
const totalDonations = ref(148765)
const donationGoal = ref(300000)
const totalDonors = ref(324)
const daysLeft = ref(28)
const mealsServed = ref(5642)
const showNotification = ref(false)
const notificationMessage = ref('')

// Computed
const progressPercentage = computed(() => {
  return Math.min(100, Math.round((totalDonations.value / donationGoal.value) * 100))
})

// Methods
const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

const showDonationNotification = (amount: number) => {
  notificationMessage.value = `New donation: GHS ${formatNumber(amount)}!`
  showNotification.value = true
  
  setTimeout(() => {
    showNotification.value = false
  }, 4000)
}

const simulateNewDonation = () => {
  // Random donation between GHS 50 and GHS 2000
  const randomAmount = Math.floor(Math.random() * 1950) + 50
  
  // Increase counters
  totalDonations.value += randomAmount
  totalDonors.value += 1
  mealsServed.value += Math.floor(randomAmount / 50) // Roughly calculate meals served
  
  // Show notification
  showDonationNotification(randomAmount)
}

let donationSimulator: number | null = null

onMounted(() => {
  // Simulate occasional donations (between 30-120 seconds)
  donationSimulator = window.setInterval(() => {
    if (Math.random() > 0.5) { // 50% chance of donation in each interval
      simulateNewDonation()
    }
  }, Math.floor(Math.random() * 90000) + 30000)
})

onUnmounted(() => {
  if (donationSimulator) {
    clearInterval(donationSimulator)
  }
})

// Method to call from parent component to register a donation
const makeDonation = (amount: number) => {
  totalDonations.value += amount
  totalDonors.value += 1
  mealsServed.value += Math.floor(amount / 50)
  showDonationNotification(amount)
}

// Expose makeDonation method to parent components
defineExpose({
  makeDonation
})
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.bg-dark-color {
  background-color: var(--dark-color);
}

.text-dark-color {
  color: var(--dark-color);
}

.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
</style>