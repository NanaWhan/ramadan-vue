<template>
  <header class="fixed top-0 left-0 w-full py-1 text-white z-10 transition-all" 
          :class="{ 'bg-dark-color': scrolled }">
    <nav class="container mx-auto px-3 mb-3 flex items-center justify-between">
      <RouterLink to="/" class="navbar-brand">
        <img src="../assets/images/logo2.png" alt="Ramadan Relief Logo" class="logo max-w-[200px]" />
      </RouterLink>
      
      <button class="text-white md:hidden" 
              type="button" 
              @click="isMenuOpen = !isMenuOpen">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <!-- Mobile Menu -->
      <div class="fixed inset-0 bg-dark-color z-50 md:hidden transition-transform transform"
           :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
           v-if="isMenuOpen">
        <div class="flex justify-between items-center p-4 border-b border-gray-700">
          <h5 class="text-white text-xl font-bold">Menu</h5>
          <button @click="isMenuOpen = false" class="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4">
          <ul class="space-y-4">
            <li v-for="(item, index) in navItems" :key="index">
              <RouterLink :to="item.to" class="text-gray-300 hover:text-white block py-2" 
                @click="isMenuOpen = false">
                {{ item.label }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/donate" class="bg-accent-color text-dark-color rounded-full px-4 py-2 mt-4 inline-block font-bold"
                @click="isMenuOpen = false">
                Donate Now
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center">
        <ul class="flex items-center space-x-4">
          <li v-for="(item, index) in navItems" :key="index">
            <RouterLink :to="item.to" class="text-gray-300 hover:text-white px-2 py-2 relative nav-link">
              {{ item.label }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/donate" class="bg-accent-color text-dark-color rounded-full px-6 py-2 ml-4 font-bold">
              Donate Now
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const isMenuOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Get Involved', to: '/#get-involved' },
  { label: 'Resources', to: '/resources' },
  { label: 'Eid Event', to: '/#eid-event' },
  { label: 'Contact', to: '/contact' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.bg-dark-color {
  background-color: var(--dark-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  border-bottom: 2px solid var(--accent-color);
  transition: width 0.3s ease-out;
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}
</style>