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
        <div v-if="activeTabId === 'mobile-money'">
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

          <button
            @click="$emit('close')"
            class="w-full bg-accent-color text-dark-color font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
          >
            I've Completed My Transfer
          </button>
        </div>

        <div v-else-if="activeTabId === 'card-payment'">
          <form @submit.prevent="submitCardForm">
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
              <label class="block text-gray-700 mb-1 text-sm font-medium">Cardholder Name</label>
              <input
                v-model="cardForm.name"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-color focus:border-transparent"
                placeholder="Your name as it appears on the card"
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

// Props and emits
const props = defineProps<{
  amount: number;
  initialTab?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "donate", method: string, details: any): void;
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
  amount: props.amount,
});

const cardForm = ref({
  number: "",
  expiry: "",
  cvv: "",
  name: "",
  amount: props.amount,
});

// Form submissions
const submitMobileMoneyForm = () => {
  emit("donate", "mobile-money", mobileMoneyForm.value);
};

const submitCardForm = () => {
  emit("donate", "card-payment", cardForm.value);
};

onMounted(() => {
  // Set amount from props
  mobileMoneyForm.value.amount = props.amount;
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