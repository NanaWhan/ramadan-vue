<template>
  <div class="contact-view">
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
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p class="text-lg text-white">
            Get in touch with our team for any questions or inquiries
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
          <!-- Contact Information -->
          <div class="md:col-span-5">
            <p class="text-gray-600 mb-8">Have questions? Reach out to us!</p>

            <div class="space-y-4 mb-10">
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-accent-color/10 flex items-center justify-center mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-accent-color"
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
                </div>
                <a
                  href="mailto:info@ramadanreliefghana.org"
                  class="text-gray-700 hover:text-accent-color"
                >
                  info@ramadanreliefghana.org
                </a>
              </div>

              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-accent-color/10 flex items-center justify-center mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-accent-color"
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
                </div>
                <a
                  href="tel:+233249058729"
                  class="text-gray-700 hover:text-accent-color"
                >
                  +233 249 058 729
                </a>
              </div>

              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-accent-color/10 flex items-center justify-center mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-accent-color"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span class="text-gray-700">Tema, Ghana</span>
              </div>
            </div>

            <div class="social-links flex space-x-6">
              <a href="#" class="text-gray-600 hover:text-accent-color">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-600 hover:text-accent-color">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-600 hover:text-accent-color">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-600 hover:text-accent-color">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="md:col-span-7">
            <form @submit.prevent="submitContactForm" class="space-y-4">
              <div>
                <input
                  v-model="contactForm.name"
                  type="text"
                  class="w-full bg-gray-100 border-0 rounded-lg p-3"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <input
                  v-model="contactForm.email"
                  type="email"
                  class="w-full bg-gray-100 border-0 rounded-lg p-3"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div>
                <textarea
                  v-model="contactForm.message"
                  class="w-full bg-gray-100 border-0 rounded-lg p-3"
                  rows="6"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  class="bg-accent-color text-dark-color font-bold py-2 px-6 rounded-full hover:bg-yellow-600 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="bg-gray-300 h-96 rounded-lg">
            <!-- Placeholder for map - you can integrate Google Maps here -->
            <div class="w-full h-full flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63450.76419739424!2d-0.023169745898436654!3d5.638020299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzgnMTYuOSJOIDDCsDAwJzI2LjciVw!5e0!3m2!1sen!2sus!4v1614881054945!5m2!1sen!2sus"
                class="w-full h-full rounded-lg"
                style="border: 0"
                allowfullscreen
                title="Google Maps"
                loading="lazy"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import bannerImage from "../assets/images/banner.jpg";

// Contact form
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const contactForm = ref<ContactFormData>({
  name: "",
  email: "",
  message: "",
});

// Submit form
const submitContactForm = () => {
  // In a real app, you would send this to an API
  console.log("Contact form submitted:", contactForm.value);

  // Show success message
  alert("Thank you for your message! We will get back to you soon.");

  // Reset form
  contactForm.value = {
    name: "",
    email: "",
    message: "",
  };
};

// FAQs
const faqs = ref([
  {
    question: "How can I volunteer with Ramadan Relief Project?",
    answer:
      'You can sign up to volunteer through our website by filling out the volunteer form on the "Get Involved" section. Our team will contact you with opportunities based on your skills and availability.',
    open: true,
  },
  {
    question: "How is my donation used?",
    answer:
      "Your donation goes directly to purchasing food items for Ramadan relief packages, covering logistical costs for distribution, and organizing community iftars. We maintain a transparent record of all funds received and spent.",
    open: false,
  },
  {
    question: "Do you provide services outside of Ramadan?",
    answer:
      "Yes, while our main focus is on Ramadan relief, we conduct community support programs throughout the year. This includes educational initiatives, food distribution during other Islamic holidays, and emergency relief when needed.",
    open: false,
  },
  {
    question: "How can I become a partner or sponsor?",
    answer:
      "For partnership or sponsorship opportunities, please contact us at corporate@ramadanreliefghana.org. We offer various ways for organizations to get involved, from financial support to in-kind donations and volunteer mobilization.",
    open: false,
  },
]);

// Toggle FAQ open/close
const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open;
};
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.bg-accent-color\/10 {
  background-color: rgba(244, 190, 55, 0.1);
}

.text-dark-color {
  color: var(--dark-color);
}
</style>
