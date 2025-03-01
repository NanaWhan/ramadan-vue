<template>
  <section id="about" class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Mission & Vision</h2>
        <p class="text-lg text-gray-600">
          Providing essential food and relief packages to underprivileged
          Muslim communities in Ghana to ensure a dignified Ramadan experience.
        </p>
      </div>
      
      <div class="bg-gray-100 rounded-lg p-8 md:p-12">
        <h3 class="text-2xl font-bold text-center mb-10">Our Core Team</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMemberCard 
            v-for="member in teamMembers" 
            :key="member.name"
            :member="member"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TeamMemberCard from '@/components/shared/TeamMemberCard.vue'

interface TeamMember {
  name: string
  role: string
  organization: string
  image: string
}

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
  }
])
</script>