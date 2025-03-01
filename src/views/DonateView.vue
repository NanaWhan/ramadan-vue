<template>
  <div class="donate-view">
    <!-- Page Header -->
    <section class="relative py-20 bg-accent-color/10">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Donate</h1>
          <p class="text-lg text-gray-600">
            Your contribution can make a real difference in someone's life this Ramadan
          </p>
        </div>
      </div>
    </section>
    
    <!-- Donation Impact Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-center">Your Impact</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <div class="text-accent-color text-4xl font-bold mb-2">GHS 50</div>
              <p class="text-gray-600">Provides a day's meal for one person</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <div class="text-accent-color text-4xl font-bold mb-2">GHS 1,500</div>
              <p class="text-gray-600">Feeds one person for the entire month</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <div class="text-accent-color text-4xl font-bold mb-2">GHS 3,000</div>
              <p class="text-gray-600">Provides for a family of four for the month</p>
            </div>
          </div>
          
          <p class="text-gray-600 mb-8 text-center">
            Every donation, no matter the size, brings us closer to our goal of supporting 
            10,000 people this Ramadan. Your generosity can help provide essential food 
            packages, organize community iftars, and ensure that no one goes hungry during 
            this holy month.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Donation Counter -->
    <DonationCounter ref="donationCounterRef" />
    
    <!-- Donation Options Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-10 text-center">How to Donate</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div 
              v-for="(option, index) in donationOptions" 
              :key="option.title"
              class="bg-white rounded-lg shadow-md p-6"
            >
              <h3 class="text-xl font-bold mb-4">{{ option.title }}</h3>
              <p class="text-gray-600 mb-6">{{ option.description }}</p>
              <Button 
                variant="primary" 
                @click="openDonationModal(option.method)"
              >
                {{ option.buttonText }}
              </Button>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-bold mb-4">Custom Donation</h3>
            
            <div class="mb-6">
              <label class="block text-gray-700 mb-2">Donation Amount (GHS)</label>
              <input
                v-model="customAmount"
                type="number"
                min="10"
                class="w-full border rounded-lg p-3"
                placeholder="Enter amount"
              />
            </div>
            
            <Button 
              variant="primary" 
              :disabled="customAmount < 10"
              @click="openDonationModal('mobile-money', customAmount)"
            >
              Donate Now
            </Button>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold mb-4">Corporate Donations</h3>
            <p class="text-gray-600 mb-4">
              We welcome corporate donations and sponsorships. For more information on how your 
              organization can partner with the Ramadan Relief Project, please contact our team.
            </p>
            <div class="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-color mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:corporate@ramadanreliefghana.org" class="text-accent-color hover:underline">
                corporate@ramadanreliefghana.org
              </a>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-color mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+233249058729" class="text-accent-color hover:underline">
                +233 249 058 729
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-10 text-center">Testimonials</h2>
          
          <div class="grid grid-cols-1 gap-8">
            <div class="bg-white rounded-lg shadow-md p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img src="../assets/images/testimonial1.jpg" alt="Testimonial" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 class="text-lg font-bold">Fatima Ibrahim</h4>
                  <p class="text-gray-600">Community Member</p>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "The food package I received from the Ramadan Relief Project made 
                a huge difference for my family. As a single mother of three, it 
                helped me provide for my children during Ramadan. I am truly grateful 
                for their support."
              </p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-8">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img src="../assets/images/testimonial2.jpg" alt="Testimonial" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 class="text-lg font-bold">Mohammed Alhassan</h4>
                  <p class="text-gray-600">Regular Donor</p>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "I've been donating to the Ramadan Relief Project for the past three years, 
                and I'm always impressed by their transparency and the impact they make. 
                Knowing that my contributions are helping those in need during Ramadan 
                gives me great satisfaction."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          
          <div class="space-y-4">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button 
                class="w-full text-left p-4 font-bold flex items-center justify-between"
                @click="toggleFaq(index)"
              >
                {{ faq.question }}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 transition-transform" 
                  :class="{ 'transform rotate-180': faq.open }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                class="p-4 pt-0 border-t"
                v-show="faq.open"
              >
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Donation Modal -->
    <DonationModal 
      v-if="showDonationModal"
      :amount="donationAmount"
      :initial-tab="activePaymentMethod"
      @close="showDonationModal = false"
      @donate="processDonation"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/shared/Button.vue'
import DonationCounter from '@/components/home/DonationCounter.vue'
import DonationModal from '@/components/shared/DonationModal.vue'

// Donation counter reference
const donationCounterRef = ref<InstanceType<typeof DonationCounter> | null>(null)

// Donation options
const donationOptions = [
  {
    title: 'Mobile Money',
    description: 'Make a quick and secure donation using MTN Mobile Money, Telecel Cash, or AirtelTigo Money.',
    buttonText: 'Donate via Mobile Money',
    method: 'mobile-money'
  },
  {
    title: 'Bank Transfer',
    description: 'Make a direct bank transfer to our account. Ideal for larger donations.',
    buttonText: 'Donate via Bank Transfer',
    method: 'bank-transfer'
  },
  {
    title: 'Card Payment',
    description: 'Use your debit or credit card to make a secure online donation.',
    buttonText: 'Donate via Card',
    method: 'card-payment'
  }
]

// Custom donation
const customAmount = ref(100)

// Donation modal
const showDonationModal = ref(false)
const activePaymentMethod = ref('')
const donationAmount = ref(1000)

// FAQs
const faqs = ref([
  {
    question: 'How is my donation used?',
    answer: 'Your donation goes directly to purchasing food items for Ramadan relief packages, covering logistical costs for distribution, and organizing community iftars. We maintain a transparent record of all funds received and spent.',
    open: true
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes, the Ramadan Relief Project is a registered charity, and all donations are tax-deductible. You will receive a receipt for your donation that you can use for tax purposes.',
    open: false
  },
  {
    question: 'Can I specify how my donation is used?',
    answer: 'Yes, you can indicate if you would like your donation to be used for a specific purpose, such as food packages, community iftars, or educational resources. Please include a note with your donation or contact us directly.',
    open: false
  },
  {
    question: 'How can I donate items instead of money?',
    answer: 'We welcome in-kind donations of non-perishable food items, clothing, and other essential goods. Please contact us to arrange for drop-off or pickup of your donated items.',
    open: false
  },
  {
    question: 'Can I set up a recurring donation?',
    answer: 'Yes, you can set up a recurring donation on a monthly or annual basis. This helps us plan our activities more effectively and ensures consistent support for those in need.',
    open: false
  }
])

// Toggle FAQ open/close
const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open
}

// Open donation modal
const openDonationModal = (method: string, amount: number = 1000) => {
  donationAmount.value = amount
  activePaymentMethod.value = method
  showDonationModal.value = true
}

// Process donation
const processDonation = (method: string, details: any) => {
  // Process donation (you would typically call an API here)
  console.log(`Processing ${method} donation for GHS ${donationAmount.value}`, details)
  
  // Update donation counter
  if (donationCounterRef.value) {
    donationCounterRef.value.makeDonation(donationAmount.value)
  }
  
  // Close modal
  showDonationModal.value = false
  
  // Show success message
  alert(`Thank you for your donation of GHS ${donationAmount.value}!`)
}
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color\/10 {
  background-color: rgba(244, 190, 55, 0.1);
}
</style>