<template>
  <div class="volunteer-view">
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
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Volunteer With Us</h1>
          <p class="text-lg text-white">
            Join our team to help distribute food and manage logistics throughout Ramadan
          </p>
        </div>
      </div>
    </section>
    
    <!-- Volunteer Form Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="mb-10">
            <h2 class="text-3xl font-bold mb-4">How You Can Help</h2>
            <p class="text-gray-600 mb-4">
              The Ramadan Relief Project relies on dedicated volunteers to make our mission possible. 
              By giving your time and skills, you can make a real difference in the lives of those in need 
              during the holy month of Ramadan.
            </p>
            <p class="text-gray-600">
              We have various volunteer opportunities available, from food package preparation to 
              distribution logistics, community outreach, event coordination, and more.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <div class="w-16 h-16 mx-auto bg-accent-color/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Food Preparation</h3>
              <p class="text-gray-600">Help prepare food packages and meals for distribution to those in need.</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <div class="w-16 h-16 mx-auto bg-accent-color/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Outreach & Communication</h3>
              <p class="text-gray-600">Help with awareness campaigns and communication with beneficiaries.</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
              <div class="w-16 h-16 mx-auto bg-accent-color/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Distribution & Logistics</h3>
              <p class="text-gray-600">Assist with the distribution of food packages and manage logistics.</p>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-8">
            <h3 class="text-2xl font-bold mb-6">Volunteer Registration Form</h3>
            
            <form @submit.prevent="submitVolunteerForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-gray-700 mb-2">Full Name</label>
                  <input
                    v-model="volunteerForm.name"
                    type="text"
                    class="w-full bg-gray-100 border-0 rounded-lg p-3"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-gray-700 mb-2">Email Address</label>
                  <input
                    v-model="volunteerForm.email"
                    type="email"
                    class="w-full bg-gray-100 border-0 rounded-lg p-3"
                    placeholder="Your Email"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    v-model="volunteerForm.phone"
                    type="tel"
                    class="w-full bg-gray-100 border-0 rounded-lg p-3"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-gray-700 mb-2">City</label>
                  <select
                    v-model="volunteerForm.city"
                    class="w-full bg-gray-100 border-0 rounded-lg p-3"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Tema">Tema</option>
                    <option value="Kumasi">Kumasi</option>
                    <option value="Tamale">Tamale</option>
                    <option value="Accra">Accra</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-gray-700 mb-2">Areas of Interest</label>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="food-prep"
                        v-model="volunteerForm.interests"
                        value="Food Preparation"
                        class="mr-2"
                      />
                      <label for="food-prep">Food Preparation</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="distribution"
                        v-model="volunteerForm.interests"
                        value="Distribution"
                        class="mr-2"
                      />
                      <label for="distribution">Distribution</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="outreach"
                        v-model="volunteerForm.interests"
                        value="Outreach"
                        class="mr-2"
                      />
                      <label for="outreach">Outreach</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="logistics"
                        v-model="volunteerForm.interests"
                        value="Logistics"
                        class="mr-2"
                      />
                      <label for="logistics">Logistics</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="media"
                        v-model="volunteerForm.interests"
                        value="Media & Marketing"
                        class="mr-2"
                      />
                      <label for="media">Media & Marketing</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="admin"
                        v-model="volunteerForm.interests"
                        value="Administration"
                        class="mr-2"
                      />
                      <label for="admin">Administration</label>
                    </div>
                  </div>
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-gray-700 mb-2">Availability</label>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="weekdays"
                        v-model="volunteerForm.availability"
                        value="Weekdays"
                        class="mr-2"
                      />
                      <label for="weekdays">Weekdays</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="weekends"
                        v-model="volunteerForm.availability"
                        value="Weekends"
                        class="mr-2"
                      />
                      <label for="weekends">Weekends</label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="evenings"
                        v-model="volunteerForm.availability"
                        value="Evenings"
                        class="mr-2"
                      />
                      <label for="evenings">Evenings</label>
                    </div>
                  </div>
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-gray-700 mb-2">Additional Information</label>
                  <textarea
                    v-model="volunteerForm.message"
                    class="w-full bg-gray-100 border-0 rounded-lg p-3"
                    rows="4"
                    placeholder="Share any skills, experience, or other information that might be helpful"
                  ></textarea>
                </div>
              </div>
              
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  v-model="volunteerForm.agreement"
                  class="mr-2"
                  required
                />
                <label for="agree">I agree to be contacted by the Ramadan Relief Project team</label>
              </div>
              
              <div>
                <button
                  type="submit"
                  class="bg-accent-color text-dark-color px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Submitting...</span>
                  <span v-else>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-10 text-center">Volunteer Testimonials</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    :src="testimonialImage1"
                    alt="Testimonial"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-bold">Omar Suleiman</h4>
                  <p class="text-gray-600">Volunteer since 2021</p>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Volunteering with the Ramadan Relief Project has been one of the most rewarding experiences 
                of my life. Seeing the direct impact of our work on families during Ramadan has strengthened 
                my faith and given me a deeper sense of community connection."
              </p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    :src="testimonialImage2"
                    alt="Testimonial"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-bold">Amina Kofi</h4>
                  <p class="text-gray-600">Volunteer since 2020</p>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "I started volunteering with Ramadan Relief to give back to my community, but I've 
                received so much more than I've given. The friendships I've built and the joy of 
                helping others have been truly life-changing. I encourage everyone to volunteer!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="py-16">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import bannerImage from '../assets/images/banner.jpg'
import testimonialImage1 from '../assets/images/testimonial1.jpg'
import testimonialImage2 from '@/assets/images/testimonial2.jpg'

// Volunteer form
interface VolunteerFormData {
  name: string
  email: string
  phone: string
  city: string
  interests: string[]
  availability: string[]
  message: string
  agreement: boolean
}

const volunteerForm = ref<VolunteerFormData>({
  name: '',
  email: '',
  phone: '',
  city: '',
  interests: [],
  availability: [],
  message: '',
  agreement: false
})

const isSubmitting = ref(false)

// Submit form
const submitVolunteerForm = async () => {
  isSubmitting.value = true
  
  try {
    // In a real app, you would send this to an API
    console.log('Volunteer form submitted:', volunteerForm.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show success message
    alert('Thank you for volunteering! We will contact you shortly with more information.')
    
    // Reset form
    volunteerForm.value = {
      name: '',
      email: '',
      phone: '',
      city: '',
      interests: [],
      availability: [],
      message: '',
      agreement: false
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('There was an error submitting your form. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// FAQs
const faqs = ref([
  {
    question: "How much time do I need to commit as a volunteer?",
    answer: "We have various volunteering opportunities with different time commitments. You can volunteer for a few hours a week, specific events, or on a more regular basis. We work with your schedule to find the right fit.",
    open: true,
  },
  {
    question: "Do I need to have previous experience?",
    answer: "No previous experience is required! We provide all necessary training and guidance. Your enthusiasm and willingness to help are the most important qualifications.",
    open: false,
  },
  {
    question: "Can I volunteer if I'm not Muslim?",
    answer: "Absolutely! We welcome volunteers from all faiths and backgrounds. The Ramadan Relief Project is about helping those in need, and we value diversity in our volunteer team.",
    open: false,
  },
  {
    question: "Are there age restrictions for volunteers?",
    answer: "For most volunteer roles, volunteers should be at least 16 years old. However, we do have family-friendly volunteer opportunities where younger children can participate when accompanied by an adult.",
    open: false,
  },
  {
    question: "Will I receive training?",
    answer: "Yes, all volunteers receive appropriate training for their roles. We ensure you have the knowledge and skills needed to make your volunteer experience effective and fulfilling.",
    open: false,
  }
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