<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
  >
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-transform duration-300 scale-100" @click.stop>
      <!-- Modal Header -->
      <div class="border-b px-6 py-4 flex justify-between items-center">
        <h3 class="text-xl font-bold">{{ activeTab.title }}</h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none rounded-full p-1 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Payment Method Tabs -->
      <div class="flex border-b">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="px-4 py-3 font-medium text-sm transition-colors relative flex-1"
          :class="
            tab.id === activeTabId
              ? 'text-accent-color font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          "
          @click="activeTabId = tab.id"
        >
          {{ tab.title }}
          <div v-if="tab.id === activeTabId" class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-color"></div>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <!-- Loading overlay -->
        <div v-if="isSubmitting" class="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-xl">
          <div class="flex flex-col items-center">
            <svg class="animate-spin h-10 w-10 text-accent-color mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-dark-color font-medium">Processing donation...</p>
          </div>
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          <p class="font-bold">Error</p>
          <p>{{ errorMessage }}</p>
          <button 
            @click="errorMessage = ''" 
            class="mt-2 bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Try Again
          </button>
        </div>

        <!-- Success message -->
        <div v-else-if="successResult" class="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
          <p class="font-bold">Donation Successful!</p>
          <p>{{ successMessage }}</p>
          <div class="flex space-x-3 mt-4">
            <button 
              @click="$emit('close')" 
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm"
            >
              Close
            </button>
            <button 
              @click="$emit('view-receipts')" 
              class="bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              View Receipt
            </button>
          </div>
        </div>

        <!-- Mobile Money Form -->
        <div v-else-if="activeTabId === 'mobile-money'">
          <form @submit.prevent="submitMobileMoneyForm">
            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Select Network</label>
              <select
                v-model="mobileMoneyForm.network"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                required
              >
                <option value="">Select Network</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="vodafone">Telecel Cash</option>
                <option value="airteltigo">AirtelTigo Money</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Mobile Number</label>
              <input
                v-model="mobileMoneyForm.phone"
                type="tel"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Full Name</label>
              <input
                v-model="mobileMoneyForm.name"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Email Address</label>
              <input
                v-model="mobileMoneyForm.email"
                type="email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Amount (GHS)</label>
              <input
                v-model="mobileMoneyForm.amount"
                type="number"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter donation amount"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-accent-color text-dark-color font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
            >
              Complete Donation
            </button>
          </form>
        </div>

        <!-- Bank Transfer Form -->
        <div v-else-if="activeTabId === 'bank-transfer'">
          <div class="space-y-2 mb-6">
            <div class="bg-gray-50 rounded-lg p-6 mb-4">
              <h4 class="font-semibold text-dark-color mb-4">Bank Transfer Details</h4>
              <div class="space-y-3">
                <div class="flex">
                  <span class="text-gray-600 w-36">Bank Name:</span>
                  <span class="font-medium">Example Bank</span>
                </div>
                <div class="flex">
                  <span class="text-gray-600 w-36">Account Name:</span>
                  <span class="font-medium">Ramadan Relief Project</span>
                </div>
                <div class="flex">
                  <span class="text-gray-600 w-36">Account Number:</span>
                  <span class="font-medium">1234567890</span>
                </div>
                <div class="flex">
                  <span class="text-gray-600 w-36">Branch:</span>
                  <span class="font-medium">Main Branch</span>
                </div>
                <div class="flex">
                  <span class="text-gray-600 w-36">Swift Code:</span>
                  <span class="font-medium">EXBKGHAC</span>
                </div>
              </div>
            </div>

            <div class="bg-accent-color/10 p-4 rounded-lg text-sm">
              <p class="mb-2">
                <strong>Instructions:</strong>
              </p>
              <p>
                Please send GHS {{ amount.toLocaleString() }} to this account and
                email your transfer receipt to
                <a
                  href="mailto:info@ramadanreliefghana.org"
                  class="text-accent-color font-medium hover:underline"
                >info@ramadanreliefghana.org</a>
                with subject "Bank Transfer Donation".
              </p>
            </div>
          </div>

          <form @submit.prevent="submitBankTransferForm" class="space-y-4">
            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Full Name</label>
              <input
                v-model="bankTransferForm.name"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Email Address</label>
              <input
                v-model="bankTransferForm.email"
                type="email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Phone Number</label>
              <input
                v-model="bankTransferForm.phone"
                type="tel"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Amount (GHS)</label>
              <input
                v-model="bankTransferForm.amount"
                type="number"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter donation amount"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-accent-color text-dark-color font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
            >
              Complete Donation
            </button>
          </form>
        </div>

        <!-- Card Payment Form -->
        <div v-else-if="activeTabId === 'card-payment'">
          <form @submit.prevent="submitCardForm">
            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Full Name</label>
              <input
                v-model="cardForm.name"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Your name as it appears on the card"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Email Address</label>
              <input
                v-model="cardForm.email"
                type="email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Card Number</label>
              <input
                v-model="cardForm.number"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-gray-700 mb-1 text-sm font-medium">Expiry Date</label>
                <input
                  v-model="cardForm.expiry"
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div>
                <label class="block text-gray-700 mb-1 text-sm font-medium">CVV</label>
                <input
                  v-model="cardForm.cvv"
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Phone Number</label>
              <input
                v-model="cardForm.phone"
                type="tel"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 mb-1 text-sm font-medium">Amount (GHS)</label>
              <input
                v-model="cardForm.amount"
                type="number"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Enter donation amount"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-accent-color text-dark-color font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
            >
              Complete Donation
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import DonationService from "@/services/donationService";

// Props and emits
const props = defineProps<{
  amount: number;
  initialTab?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "donate-complete", transactionId: string): void;
  (e: "view-receipts"): void;
}>();

// Tab management
interface Tab {
  id: string;
  title: string;
}

const tabs: Tab[] = [
  { id: "mobile-money", title: "Mobile Money" },
  { id: "bank-transfer", title: "Bank Transfer" },
  { id: "card-payment", title: "Card Payment" },
];

const activeTabId = ref(props.initialTab || "mobile-money");

const activeTab = computed(() => {
  return tabs.find((tab) => tab.id === activeTabId.value) || tabs[0];
});

// Form data
const mobileMoneyForm = ref({
  network: "",
  phone: "",
  name: "",
  email: "",
  amount: props.amount,
});

const bankTransferForm = ref({
  name: "",
  email: "",
  phone: "",
  amount: props.amount,
});

const cardForm = ref({
  number: "",
  expiry: "",
  cvv: "",
  name: "",
  email: "",
  phone: "",
  amount: props.amount,
});

// State management
const isSubmitting = ref(false);
const errorMessage = ref("");
const successResult = ref(false);
const successMessage = ref("");
const transactionId = ref("");

// Form submissions
const submitMobileMoneyForm = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";

    // Initiate donation with DonationService
    DonationService.initiateDonation(Number(mobileMoneyForm.value.amount), "mobile-money");
    
    // Process mobile money donation
    const response = await DonationService.processMobileMoneyDonation({
      network: mobileMoneyForm.value.network,
      phone: mobileMoneyForm.value.phone,
      name: mobileMoneyForm.value.name,
      email: mobileMoneyForm.value.email,
      amount: Number(mobileMoneyForm.value.amount),
    });

    if (response.success) {
      transactionId.value = response.transactionId || "";
      
      // If there's a payment link, redirect to it
      if (response.paymentLink) {
        // Emit the completion event with transaction ID before redirecting
        emit("donate-complete", transactionId.value);
        
        // Redirect to payment gateway
        window.location.href = response.paymentLink;
        return;
      }
      
      // Otherwise show success message
      successResult.value = true;
      successMessage.value = response.message || "Your donation has been processed successfully!";
      
      // Emit the completion event with transaction ID
      emit("donate-complete", transactionId.value);
    } else {
      throw new Error(response.message || "Failed to process mobile money payment");
    }
  } catch (error) {
    console.error("Error processing mobile money donation:", error);
    errorMessage.value = error instanceof Error ? error.message : "An error occurred while processing your donation. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

const submitBankTransferForm = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";

    // Initiate donation with DonationService
    DonationService.initiateDonation(Number(bankTransferForm.value.amount), "bank-transfer");
    
    // Process bank transfer
    const response = await DonationService.processBankTransfer({
      name: bankTransferForm.value.name,
      email: bankTransferForm.value.email,
      phone: bankTransferForm.value.phone,
      amount: Number(bankTransferForm.value.amount),
    });

    if (response.success) {
      transactionId.value = response.transactionId || "";
      
      // If there's a payment link, redirect to it
      if (response.paymentLink) {
        // Emit the completion event with transaction ID before redirecting
        emit("donate-complete", transactionId.value);
        
        // Redirect to payment gateway
        window.location.href = response.paymentLink;
        return;
      }
      
      // Otherwise show success message
      successResult.value = true;
      successMessage.value = response.message || "Your bank transfer information has been recorded!";
      
      // Emit the completion event with transaction ID
      emit("donate-complete", transactionId.value);
    } else {
      throw new Error(response.message || "Failed to process bank transfer");
    }
  } catch (error) {
    console.error("Error processing bank transfer:", error);
    errorMessage.value = error instanceof Error ? error.message : "An error occurred while processing your bank transfer. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

const submitCardForm = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";

    // Initiate donation with DonationService
    DonationService.initiateDonation(Number(cardForm.value.amount), "card-payment");
    
    // Process card payment
    const response = await DonationService.processCardPayment({
      name: cardForm.value.name,
      email: cardForm.value.email,
      phone: cardForm.value.phone,
      number: cardForm.value.number,
      expiry: cardForm.value.expiry,
      cvv: cardForm.value.cvv,
      amount: Number(cardForm.value.amount),
    });

    if (response.success) {
      transactionId.value = response.transactionId || "";
      
      // If there's a payment link, redirect to it
      if (response.paymentLink) {
        // Emit the completion event with transaction ID before redirecting
        emit("donate-complete", transactionId.value);
        
        // Redirect to payment gateway
        window.location.href = response.paymentLink;
        return;
      }
      
      // Otherwise show success message
      successResult.value = true;
      successMessage.value = response.message || "Your card payment has been processed successfully!";
      
      // Emit the completion event with transaction ID
      emit("donate-complete", transactionId.value);
    } else {
      throw new Error(response.message || "Failed to process card payment");
    }
  } catch (error) {
    console.error("Error processing card payment:", error);
    errorMessage.value = error instanceof Error ? error.message : "An error occurred while processing your card payment. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  // Set amount from props
  mobileMoneyForm.value.amount = props.amount;
  bankTransferForm.value.amount = props.amount;
  cardForm.value.amount = props.amount;
});
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.bg-accent-color\/10 {
  background-color: rgba(var(--accent-color-rgb, 244, 190, 55), 0.1);
}

.focus\:ring-accent-color:focus {
  --tw-ring-color: var(--accent-color);
}

.border-accent-color {
  border-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>