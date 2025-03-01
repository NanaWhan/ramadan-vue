<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
      <!-- Modal Header -->
      <div class="border-b px-6 py-4 flex justify-between items-center">
        <h3 class="text-xl font-bold">{{ activeTab.title }}</h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
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
          class="px-4 py-2 font-medium text-sm"
          :class="
            tab.id === activeTabId
              ? 'border-b-2 border-accent-color text-accent-color'
              : 'text-gray-500'
          "
          @click="activeTabId = tab.id"
        >
          {{ tab.title }}
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <div v-if="activeTabId === 'mobile-money'">
          <form @submit.prevent="submitMobileMoneyForm">
            <div class="mb-4">
              <select
                v-model="mobileMoneyForm.network"
                class="w-full p-2 border rounded"
                required
              >
                <option value="">Select Network</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="vodafone">Telecel Cash</option>
                <option value="airteltigo">AirtelTigo Money</option>
              </select>
            </div>

            <div class="mb-4">
              <input
                v-model="mobileMoneyForm.phone"
                type="tel"
                class="w-full p-2 border rounded"
                placeholder="Mobile Number"
                required
              />
            </div>

            <div class="mb-4">
              <input
                v-model="mobileMoneyForm.amount"
                type="number"
                class="w-full p-2 border rounded"
                placeholder="Amount (GHS)"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-accent-color text-dark-color font-bold py-2 rounded"
            >
              Pay Now
            </button>
          </form>
        </div>

        <div v-else-if="activeTabId === 'bank-transfer'">
          <div class="space-y-2 mb-6">
            <p><strong>Bank Name:</strong> Example Bank</p>
            <p><strong>Account Name:</strong> Ramadan Relief Project</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Branch:</strong> Main Branch</p>
            <p><strong>Swift Code:</strong> EXBKGHAC</p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg text-sm">
            <p>
              Please send GHS {{ amount.toLocaleString() }} to this account and
              send your transfer receipt to
              <a
                href="mailto:info@ramadanreliefghana.org"
                class="text-accent-color"
                >info@ramadanreliefghana.org</a
              >
            </p>
          </div>
        </div>

        <div v-else-if="activeTabId === 'card-payment'">
          <form @submit.prevent="submitCardForm">
            <div class="mb-4">
              <input
                v-model="cardForm.number"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Card Number"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <input
                v-model="cardForm.expiry"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="MM/YY"
                required
              />

              <input
                v-model="cardForm.cvv"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="CVV"
                required
              />
            </div>

            <div class="mb-4">
              <input
                v-model="cardForm.name"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Card Holder Name"
                required
              />
            </div>

            <div class="mb-4">
              <input
                v-model="cardForm.amount"
                type="number"
                class="w-full p-2 border rounded"
                placeholder="Amount (GHS)"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-accent-color text-dark-color font-bold py-2 rounded"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Props and emits
const props = defineProps<{
  amount: number;
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

const activeTabId = ref("mobile-money");

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
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.border-accent-color {
  border-color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}
</style>
