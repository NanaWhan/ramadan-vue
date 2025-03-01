<template>
  <section id="donation-counter" class="bg-gray-100 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 class="text-2xl font-bold mb-4">Help Us Reach Our Goal</h3>
          
          <div class="text-4xl font-bold text-accent-color mb-2">
            GHS {{ formatNumber(totalDonations) }}
          </div>
          
          <div class="text-gray-600 mb-4">
            of GHS {{ formatNumber(donationGoal) }} goal
          </div>
          
          <div class="h-2 bg-gray-200 rounded-full mb-6 relative overflow-hidden">
            <div 
              class="h-full bg-accent-color rounded-full transition-all duration-1000" 
              :style="{ width: progressPercentage + '%' }"
              role="progressbar"
              :aria-valuenow="progressPercentage"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <div class="donation-stat">
              <div class="text-2xl font-bold">{{ totalDonors }}</div>
              <div class="text-gray-600">Donors</div>
            </div>
            <div class="donation-stat">
              <div class="text-2xl font-bold">{{ daysLeft }}</div>
              <div class="text-gray-600">Days Left</div>
            </div>
            <div class="donation-stat">
              <div class="text-2xl font-bold">{{ mealsServed }}</div>
              <div class="text-gray-600">Meals Served</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Donation notification toast -->
    <div 
      class="fixed bottom-5 right-5 z-50 bg-dark-color text-white py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300"
      :class="showNotification ? 'translate-x-0' : 'translate-x-full'"
    >
      {{ notificationMessage }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
  notificationMessage.value = `New donation: GHS ${formatNumber(amount)}`
  showNotification.value = true
  
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
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
</style>