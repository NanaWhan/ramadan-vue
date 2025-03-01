<template>
  <div class="about-view">
    <!-- Page Header -->
    <section class="relative py-20 bg-accent-color/10">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p class="text-lg text-gray-600">
            Learn more about our mission to support the underprivileged during Ramadan
          </p>
        </div>
      </div>
    </section>
    
    <!-- Mission Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
          <p class="text-gray-600 mb-4">
            The Ramadan Relief Project is dedicated to providing essential food and relief packages 
            to underprivileged Muslim communities in Ghana, ensuring a dignified Ramadan experience 
            for those in need.
          </p>
          <p class="text-gray-600 mb-4">
            We believe that no one should go hungry during the holy month of Ramadan. Our mission is 
            to reach out to the most vulnerable members of our community, offering support, compassion, 
            and practical assistance when they need it most.
          </p>
          <p class="text-gray-600">
            Through our network of volunteers and partners, we aim to distribute food packages, 
            organize community iftars, and provide educational resources to promote the true spirit 
            of Ramadan - giving, sharing, and caring for others.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Vision Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6">Our Vision</h2>
          <p class="text-gray-600 mb-4">
            We envision a Ghana where every Muslim can observe Ramadan with dignity, regardless 
            of their economic situation. A society where the spirit of giving and community 
            support extends beyond Ramadan into everyday life.
          </p>
          <p class="text-gray-600">
            Our long-term vision includes expanding our reach to more communities across Ghana, 
            establishing sustainable food security programs, and building partnerships with other 
            organizations to maximize our impact.
          </p>
        </div>
      </div>
    </section>
    
    <!-- History Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6">Our History</h2>
          <p class="text-gray-600 mb-4">
            The Ramadan Relief Project began in 2018 as a small community initiative by a group 
            of friends who noticed the increasing hardship faced by many families during Ramadan. 
            What started as distributing food packages to 100 families in Tema has now grown into 
            a comprehensive relief program reaching thousands across multiple cities in Ghana.
          </p>
          <p class="text-gray-600 mb-4">
            Over the years, we have expanded our services, refined our approach, and built strong 
            relationships with community leaders, businesses, and other humanitarian organizations. 
            Our growth has been fueled by the dedication of our volunteers and the generosity of 
            our donors.
          </p>
          <p class="text-gray-600">
            Today, the Ramadan Relief Project stands as a testament to what can be achieved when 
            communities come together with a shared vision of helping others.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Team Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Our Team</h2>
          <p class="text-gray-600">
            Meet the dedicated individuals behind the Ramadan Relief Project
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMemberCard 
            v-for="member in teamMembers" 
            :key="member.name"
            :member="member"
          />
        </div>
      </div>
    </section>
    
    <!-- Values Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-10 text-center">Our Values</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Compassion</h3>
              <p class="text-gray-600">
                We approach our work with a deep sense of empathy and understanding 
                for those we serve, recognizing their dignity and worth.
              </p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Community</h3>
              <p class="text-gray-600">
                We believe in the power of community and work to foster connections 
                and solidarity among diverse groups of people.
              </p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Integrity</h3>
              <p class="text-gray-600">
                We are committed to transparency, accountability, and ethical practices 
                in all aspects of our work.
              </p>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Inclusivity</h3>
              <p class="text-gray-600">
                We serve all those in need regardless of their background, beliefs, 
                or circumstances, promoting a culture of respect and acceptance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Join Us CTA -->
    <section class="py-16 bg-accent-color">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6 text-dark-color">Join Our Mission</h2>
          <p class="text-dark-color mb-8">
            Be part of our journey to make a difference in the lives of those in need 
            during Ramadan. Whether through donations, volunteering, or partnerships, 
            your contribution matters.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <RouterLink to="/donate" class="bg-dark-color text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
              Donate Now
            </RouterLink>
            <RouterLink to="/#volunteer" class="bg-white text-dark-color px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Volunteer
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import TeamMemberCard from '@/components/shared/TeamMemberCard.vue'
import type { TeamMember } from '@/types'

const teamMembers = ref<TeamMember[]>([
  {
    name: 'Minkaila Odonkor',
    role: 'Project Coordinator',
    organization: 'Operations Manager at Exeleos Ltd',
    image: 'minkaila.jpg'
  },
  {
    name: 'Abdul-Jeleel Mohammed',
    role: 'Operations & Logistics',
    organization: 'CEO of Hafin Logistics & More',
    image: 'mohammed.jpg'
  },
  {
    name: 'Hudu Odonkor',
    role: 'Finance & Fundraising Manager',
    organization: 'HuudAutos Ltd',
    image: 'hudu.jpg'
  },
  {
    name: 'Samira Abdul',
    role: 'Media & Communications Lead',
    organization: 'Journalist at GTV',
    image: 'samira.jpg'
  },
  {
    name: 'Nafisa Labaran',
    role: 'Monitoring & Evaluation',
    organization: 'Quality Control Officer at Promosideur Ltd',
    image: 'nafisa.jpg'
  },
  {
    name: 'Ahmed Rahmani',
    role: 'Community Outreach Coordinator',
    organization: 'Social Worker',
    image: 'placeholder.jpg'
  }
])
</script>

<style scoped>
.bg-accent-color {
  background-color: var(--accent-color);
}

.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color\/10 {
  background-color: rgba(244, 190, 55, 0.1);
}

.text-dark-color {
  color: var(--dark-color);
}
</style>