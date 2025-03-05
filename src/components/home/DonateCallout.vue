<template>
  <section id="donate" class="relative py-28 text-white">
    <!-- Background image with overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-dark-color/80 to-dark-color/70 z-0"
    ></div>
    <img
      :src="bannerImage"
      class="absolute inset-0 object-cover w-full h-full z-[-1]"
      alt="Banner"
    />

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
          Make a Difference Today
        </h2>
        <div
          class="w-24 h-1 bg-accent-color mx-auto mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        ></div>
        <p
          class="text-xl text-gray-200 mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Your donation can help provide essential meals to those in need this
          Ramadan
        </p>

        <div class="space-y-6" data-aos="fade-up" data-aos-delay="300">
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-6">
            <div class="text-4xl font-bold text-accent-color mb-2">
              GHS 3,000
            </div>
            <p class="text-gray-200 mb-4">Can feed a family for the entire month.</p>

            <div class="flex flex-col md:flex-row justify-center gap-4">
              <Button
                variant="primary"
                size="large"
                @click="openDonationModal('mobile')"
              >
                <template #icon-left>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </template>
                Mobile Money
              </Button>

              <Button
                variant="primary"
                size="large"
                @click="openDonationModal('bank')"
              >
                <template #icon-left>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </template>
                Bank Transfer
              </Button>

              <Button
                variant="primary"
                size="large"
                @click="openDonationModal('card')"
              >
                <template #icon-left>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </template>
                Card Payment
              </Button>
            </div>
          </div>

          <p class="text-sm text-gray-300">
            Need a different amount?
            <a
              href="/donate"
              class="text-accent-color underline hover:text-yellow-400"
              >Visit our donation page</a
            >
            for more options.
          </p>
        </div>
      </div>
    </div>

    <!-- Payment Modals -->
    <DonationModal
      v-if="showDonationModal"
      :amount="1000"
      :initial-tab="activePaymentMethod"
      @close="showDonationModal = false"
      @donate="processDonation"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/shared/Button.vue";
import DonationModal from "@/components/shared/DonationModal.vue";
import bannerImage from "../../assets/images/banner.jpg";

const showDonationModal = ref(false);
const activePaymentMethod = ref("");

const openDonationModal = (method: string) => {
  // Map method to tab ID
  const methodMap: Record<string, string> = {
    mobile: "mobile-money",
    bank: "bank-transfer",
    card: "card-payment",
  };

  activePaymentMethod.value = methodMap[method] || "mobile-money";
  showDonationModal.value = true;
};

const processDonation = (method: string, details: any) => {
  // Process donation (you would typically call an API here)
  console.log(`Processing ${method} donation`, details);

  // Close modal
  showDonationModal.value = false;

  // Show success message
  alert(`Thank you for your donation!`);
};
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}
</style>
