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
          <form @submit.prevent="subscribeToNewsletter" class="newsletter-form">
            <div class="flex">
              <input
                v-model="email"
                type="email"
                class="w-full bg-transparent text-white border border-white px-3 py-2 rounded-l"
                placeholder="Your email"
                required
              />
              <button
                type="submit"
                class="bg-accent-color text-dark-color px-4 py-2 rounded-r font-medium"
              >
                Subscribe
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
          <p>Designed by ZediTech</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import logoImage from '@/assets/images/logo2.png'

const email = ref("");
const currentYear = computed(() => new Date().getFullYear());

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

const subscribeToNewsletter = () => {
  // Handle newsletter subscription
  alert(`Thank you for subscribing with ${email.value}!`);
  email.value = "";
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
