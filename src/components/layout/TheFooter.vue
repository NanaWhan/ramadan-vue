<!-- src/components/layout/TheFooter.vue -->
<template>
  <footer class="py-16 bg-dark-color text-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <RouterLink to="/" class="inline-block mb-4">
            <img :src="logoImage" alt="Ramadan Relief Logo" class="logo max-w-[200px]" />
          </RouterLink>
          <p class="text-gray-400">
            Providing essential food and relief packages to underprivileged
            Muslim communities in Ghana.
          </p>
        </div>

        <div>
          <h5 class="text-white mb-4 font-bold">Quick Links</h5>
          <ul class="space-y-3">
            <li v-for="(link, index) in quickLinks" :key="index">
              <RouterLink
                :to="link.to"
                class="text-gray-400 hover:text-accent-color"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h5 class="text-white mb-4 font-bold">Resources</h5>
          <ul class="space-y-3">
            <li v-for="(link, index) in resourceLinks" :key="index">
              <RouterLink
                :to="link.to"
                class="text-gray-400 hover:text-accent-color"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h5 class="text-white mb-4 font-bold">Newsletter</h5>
          <p class="text-gray-400 mb-4">
            Subscribe to our newsletter for updates
          </p>
          
          <!-- Success message -->
          <div v-if="subscriptionSuccess" class="bg-green-800 text-white p-4 rounded-lg mb-4">
            <p>{{ successMessage }}</p>
          </div>

          <!-- Error message -->
          <div v-if="subscriptionError" class="bg-red-800 text-white p-4 rounded-lg mb-4">
            <p>{{ errorMessage }}</p>
          </div>
          
          <form @submit.prevent="subscribeToNewsletter" class="newsletter-form">
            <div class="flex">
              <input
                v-model="phoneNumber"
                type="tel"
                class="w-full bg-transparent text-white border border-white px-3 py-2 rounded-l"
                placeholder="Your phone number"
                required
                :disabled="isSubmitting"
              />
              <button
                type="submit"
                class="relative bg-accent-color text-dark-color px-4 py-2 rounded-r font-medium disabled:opacity-75"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <svg class="animate-spin h-4 w-4 text-dark-color" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span class="pl-4">{{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-6 mt-8">
        <div class="text-center">
          <p class="mb-1">
            &copy; {{ currentYear }} Ramadan Relief Project. All rights
            reserved.
          </p>
          <p>Designed by <a href="https://devseinty.netlify.app/" class="text-accent-color hover:underline" target="_blank">ZediTech</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import logoImage from '@/assets/images/logo2.png';
import ApiService, { type NewsletterRequest } from '@/services/apiService';

const phoneNumber = ref("");
const currentYear = computed(() => new Date().getFullYear());

// Newsletter subscription state
const isSubmitting = ref(false);
const subscriptionSuccess = ref(false);
const subscriptionError = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Impact", to: "/#impact" },
  { label: "Get Involved", to: "/#get-involved" },
];

const resourceLinks = [
  { label: "News", to: "/#news" },
  { label: "Ramadan Guide", to: "/resources" },
  { label: "Eid Event", to: "/#eid-event" },
  { label: "Contact", to: "/contact" },
];

const subscribeToNewsletter = async () => {
  if (!phoneNumber.value) return;

  try {
    isSubmitting.value = true;
    subscriptionError.value = false;
    
    const newsletterData: NewsletterRequest = {
      phoneNumber: phoneNumber.value
    };
    
    const response = await ApiService.subscribeToNewsletter(newsletterData);
    
    if (response && response.isSuccess) {
      subscriptionSuccess.value = true;
      successMessage.value = response.message || 'Thank you for subscribing! You will receive updates via SMS.';
      phoneNumber.value = "";
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        subscriptionSuccess.value = false;
      }, 5000);
    } else {
      throw new Error(response.message || 'Failed to subscribe to newsletter');
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    subscriptionError.value = true;
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred. Please try again.';
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      subscriptionError.value = false;
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}

.bg-dark-color {
  background-color: var(--dark-color);
}
</style>