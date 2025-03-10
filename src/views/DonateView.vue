<template>
  <div class="donate-view">
    <!-- Payment Processing Modal (shown when returning from payment gateway) -->
    <div v-if="isProcessingCallback" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl max-w-md w-full text-center">
        <svg class="animate-spin h-12 w-12 text-accent-color mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 class="text-xl font-bold mb-2">Verifying Payment</h3>
        <p class="text-gray-600">Please wait while we verify your donation...</p>
      </div>
    </div>

    <!-- Payment Error Modal -->
    <div v-if="paymentError" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl max-w-md w-full">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 class="text-xl font-bold">Payment Failed</h3>
        </div>
        <p class="text-gray-600 mb-6">{{ paymentErrorMessage }}</p>
        <div class="flex justify-end">
          <button 
            @click="dismissPaymentError" 
            class="bg-accent-color text-dark-color px-6 py-2 rounded-lg font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>

    <!-- Donation Confirmation (shows only after successful donation) -->
    <div v-else-if="showConfirmation">
      <DonationConfirmation
        :transaction-id="lastDonation.transactionId"
        :amount="lastDonation.amount"
        :date="lastDonation.date"
        :payment-method="lastDonation.method"
      />
    </div>

    <!-- Regular donation page -->
    <div v-else>
      <!-- Page Header -->
      <section class="relative py-20 text-white">
        <!-- Background image with overlay -->
        <div class="absolute inset-0 bg-dark-color/60 z-0"></div>
        <img
          :src="bannerImage"
          class="absolute inset-0 object-cover w-full h-full z-[-1]"
          alt="Banner"
        />

        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Donate</h1>
            <p class="text-lg text-white">
              Your contribution can make a real difference in someone's life
              this Ramadan
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
              <div
                v-for="(card, index) in impactCards"
                :key="card.title"
                class="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1"
                :class="{
                  'border-2 border-accent-color':
                    selectedAmount === card.amount,
                }"
                @click="selectAmount(card.amount)"
              >
                <div class="text-accent-color text-4xl font-bold mb-2">
                  GHS {{ formatNumber(card.amount) }}
                </div>
                <p class="text-gray-600 mb-4">{{ card.description }}</p>
                <button
                  class="inline-block bg-accent-color text-dark-color rounded-full px-6 py-2 font-bold hover:bg-yellow-600 transition-colors"
                  @click.stop="openDonationModal(card.amount)"
                >
                  Donate
                </button>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 class="text-xl font-bold mb-4">Custom Donation</h3>

              <div class="mb-6">
                <label class="block text-gray-700 mb-2"
                  >Donation Amount (GHS)</label
                >
                <div class="flex items-center">
                  <input
                    v-model="customAmount"
                    type="number"
                    min="10"
                    step="10"
                    class="flex-1 border rounded-lg p-3"
                    placeholder="Enter amount"
                  />
                  <button
                    class="ml-4 bg-accent-color text-dark-color font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
                    :disabled="customAmount < 10"
                    :class="{
                      'opacity-50 cursor-not-allowed': customAmount < 10,
                    }"
                    @click="openDonationModal(customAmount)"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
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
                class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <div
                  class="w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center mb-4"
                >
                  <component
                    :is="option.icon"
                    class="h-6 w-6 text-accent-color"
                  />
                </div>
                <h3 class="text-xl font-bold mb-4">{{ option.title }}</h3>
                <p class="text-gray-600 mb-6">{{ option.description }}</p>
                <button
                  class="inline-block bg-accent-color text-dark-color rounded-full px-6 py-2 font-bold hover:bg-yellow-600 transition-colors"
                  @click="openDonationModal(selectedAmount, option.method)"
                >
                  {{ option.buttonText }}
                </button>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold mb-4">Corporate Donations</h3>
              <p class="text-gray-600 mb-4">
                We welcome corporate donations and sponsorships. For more
                information on how your organization can partner with the
                Ramadan Relief Project, please contact our team.
              </p>
              <div
                class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6"
              >
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-accent-color mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>

                  <a
                    href="mailto:corporate@ramadanreliefghana.org"
                    class="text-accent-color hover:underline"
                  >
                    corporate@ramadanreliefghana.org
                  </a>
                </div>
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-accent-color mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+233249058729"
                    class="text-accent-color hover:underline"
                  >
                    +233 249 058 729
                  </a>
                </div>
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
                    <img
                      :src="testimonialsImage1"
                      alt="Testimonial"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold">Fatima Ibrahim</h4>
                    <p class="text-gray-600">Community Member</p>
                  </div>
                </div>
                <p class="text-gray-600 italic">
                  "The food package I received from the Ramadan Relief Project
                  made a huge difference for my family. As a single mother of
                  three, it helped me provide for my children during Ramadan. I
                  am truly grateful for their support."
                </p>
              </div>

              <div class="bg-white rounded-lg shadow-md p-8">
                <div class="flex items-center mb-4">
                  <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      :src="testimonialsImage2"
                      alt="Testimonial"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold">Mohammed Alhassan</h4>
                    <p class="text-gray-600">Regular Donor</p>
                  </div>
                </div>
                <p class="text-gray-600 italic">
                  "I've been donating to the Ramadan Relief Project for the past
                  three years, and I'm always impressed by their transparency
                  and the impact they make. Knowing that my contributions are
                  helping those in need during Ramadan gives me great
                  satisfaction."
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
            <h2 class="text-3xl font-bold mb-10 text-center">
              Frequently Asked Questions
            </h2>

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
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div class="p-4 pt-0 border-t" v-show="faq.open">
                  <p class="text-gray-600">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Enhanced Donation Modal -->
    <EnhancedDonationModal
      v-if="showDonationModal"
      :amount="donationAmount"
      :initial-tab="activePaymentMethod"
      @close="showDonationModal = false"
      @donate-complete="handleDonationComplete"
      @view-receipts="showReceipt"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ApiService from "@/services/apiService";
import DonationService from "@/services/donationService";
import DonationCounter from "@/components/home/DonationCounter.vue";
import EnhancedDonationModal from "@/components/shared/EnhancedDonationModal.vue";
import DonationConfirmation from "@/components/shared/DonationConfirmation.vue";
import MobileIcon from "@/components/icons/MobileIcon.vue";
import CardIcon from "@/components/icons/CardIcon.vue";
import BankIcon from "@/components/icons/BankIcon.vue";
import bannerImage from "@/assets/images/banner.jpg";
import testimonialsImage1 from "@/assets/images/testimonial1.jpg";
import testimonialsImage2 from "@/assets/images/testimonial2.jpg";

// Donation counter reference
const donationCounterRef = ref<InstanceType<typeof DonationCounter> | null>(
  null
);

// State for callback processing
const isProcessingCallback = ref(false);
const paymentError = ref(false);
const paymentErrorMessage = ref("");

// Impact cards
const impactCards = [
  {
    amount: 50,
    description: "Provides a day's meal for one person",
    title: "Daily Meal",
  },
  {
    amount: 1500,
    description: "Feeds one person for the entire month",
    title: "Monthly Package",
  },
  {
    amount: 3000,
    description: "Provides for a family of four for the month",
    title: "Family Package",
  },
];

// Donation options
const donationOptions = [
  {
    title: "Mobile Money",
    description:
      "Make a quick and secure donation using MTN Mobile Money, Telecel Cash, or AirtelTigo Money.",
    buttonText: "Donate via Mobile Money",
    method: "mobile-money",
    icon: MobileIcon,
  },
  {
    title: "Bank Transfer",
    description:
      "Make a direct bank transfer to our account. Ideal for larger donations.",
    buttonText: "Donate via Bank Transfer",
    method: "bank-transfer",
    icon: BankIcon,
  },
  {
    title: "Card Payment",
    description:
      "Use your debit or credit card to make a secure online donation.",
    buttonText: "Donate via Card",
    method: "card-payment",
    icon: CardIcon,
  },
];

// Custom donation
const customAmount = ref(100);
const selectedAmount = ref(1500); // Default selected amount

// Donation modal
const showDonationModal = ref(false);
const activePaymentMethod = ref("");
const donationAmount = ref(1500);
const showConfirmation = ref(false);
const lastDonation = ref({
  transactionId: "",
  amount: 0,
  date: new Date(),
  method: "",
});

// FAQs
const faqs = ref([
  {
    question: "How is my donation used?",
    answer:
      "Your donation goes directly to purchasing food items for Ramadan relief packages, covering logistical costs for distribution, and organizing community iftars. We maintain a transparent record of all funds received and spent.",
    open: true,
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes, the Ramadan Relief Project is a registered charity, and all donations are tax-deductible. You will receive a receipt for your donation that you can use for tax purposes.",
    open: false,
  },
  {
    question: "Can I specify how my donation is used?",
    answer:
      "Yes, you can indicate if you would like your donation to be used for a specific purpose, such as food packages, community iftars, or educational resources. Please include a note with your donation or contact us directly.",
    open: false,
  },
  {
    question: "How can I donate items instead of money?",
    answer:
      "We welcome in-kind donations of non-perishable food items, clothing, and other essential goods. Please contact us to arrange for drop-off or pickup of your donated items.",
    open: false,
  },
  {
    question: "Can I donate more than once?",
    answer:
      "Yes, you can make multiple donations throughout the year. Your continued support helps us plan our activities more effectively and ensures consistent assistance for those in need.",
    open: false,
  },
]);

// Toggle FAQ open/close
const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open;
};

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

// Select donation amount
const selectAmount = (amount: number) => {
  selectedAmount.value = amount;
};

// Open donation modal
const openDonationModal = (amount: number, method = "") => {
  donationAmount.value = amount;
  activePaymentMethod.value = method;
  showDonationModal.value = true;
};

// Handle donation completion
const handleDonationComplete = async (transactionId: string) => {
  // Get the payment method name for display
  const paymentMethod = activePaymentMethod.value 
    ? getPaymentMethodName(activePaymentMethod.value) 
    : "Online Payment";

  // Update last donation details
  lastDonation.value = {
    transactionId: transactionId,
    amount: donationAmount.value,
    date: new Date(),
    method: paymentMethod,
  };

  // Close modal - we're likely going to redirect
  showDonationModal.value = false;
};

// Show receipt
const showReceipt = () => {
  showDonationModal.value = false;
  showConfirmation.value = true;
};

// Get payment method display name
const getPaymentMethodName = (methodId: string): string => {
  const method = donationOptions.find((m) => m.method === methodId);
  return method ? method.title : "Online Payment";
};

// Dismiss payment error and return to donation page
const dismissPaymentError = () => {
  paymentError.value = false;
  paymentErrorMessage.value = "";
};

// Handle payment gateway callback
const handlePaymentCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check if this is a payment callback
  const hasCallback = urlParams.has('transaction_id') || 
                     urlParams.has('tx_ref') || 
                     urlParams.has('reference') || 
                     urlParams.has('status');
                     
  if (hasCallback) {
    isProcessingCallback.value = true;
    
    try {
      // Process the callback with DonationService
      const callbackResult = DonationService.handleDonationCallback(urlParams);
      
      // If we have a transaction ID, verify the payment status with the backend
      if (callbackResult.transactionId) {
        // This would typically call an API endpoint to verify the payment
        const verificationResult = await DonationService.verifyDonationStatus(callbackResult.transactionId);
        
        if (verificationResult.success) {
          // Payment was successful, show confirmation
          lastDonation.value = {
            transactionId: callbackResult.transactionId,
            amount: callbackResult.amount || verificationResult.amount,
            date: new Date(),
            method: getPaymentMethodForStatus(callbackResult.status)
          };
          
          // Update donation counter
          if (lastDonation.value.amount > 0 && donationCounterRef.value) {
            donationCounterRef.value.makeDonation(lastDonation.value.amount);
          }
          
          // Show confirmation page
          showConfirmation.value = true;
        } else {
          // Payment failed, show error
          paymentError.value = true;
          paymentErrorMessage.value = verificationResult.message || "Your payment could not be verified. Please try again or contact support.";
        }
      } else {
        // No transaction ID found, show generic error
        paymentError.value = true;
        paymentErrorMessage.value = "Your payment could not be processed. Please try again or use a different payment method.";
      }
    } catch (error) {
      console.error("Error handling payment callback:", error);
      paymentError.value = true;
      paymentErrorMessage.value = "An error occurred while processing your payment. Please try again later.";
    } finally {
      isProcessingCallback.value = false;
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
};

// Helper to determine payment method from status
const getPaymentMethodForStatus = (status: string): string => {
  status = status.toLowerCase();
  
  if (status.includes('mtn') || status.includes('mobile') || status.includes('momo')) {
    return 'Mobile Money';
  } else if (status.includes('card') || status.includes('visa') || status.includes('mastercard')) {
    return 'Card Payment';
  } else if (status.includes('bank') || status.includes('transfer')) {
    return 'Bank Transfer';
  }
  
  return 'Online Payment';
};

// Update donation counter with latest statistics
const updateDonationCounter = async () => {
  try {
    // Fetch latest donation statistics
    const response = await ApiService.getDonationStatistics();
    
    if (response && response.isSuccess && donationCounterRef.value) {
      // Update the counter with real data
      const stats = response.result;
      
      // This uses the component's internal update method
      if (donationCounterRef.value) {
        donationCounterRef.value.makeDonation(0); // Just trigger an update
      }
    }
  } catch (error) {
    console.error("Error updating donation counter:", error);
  }
};

// On component mount, handle any payment callbacks and initialize
onMounted(async () => {
  // Handle payment gateway callbacks
  await handlePaymentCallback();
  
  // Get latest donation statistics
  await updateDonationCounter();
  
  // Initialize with default selected amount
  donationAmount.value = selectedAmount.value;
});
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color\/10 {
  background-color: rgba(244, 190, 55, 0.1);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>