<template>
  <header class="fixed top-0 left-0 w-full text-white z-50 transition-all header-container h-14" 
          :class="{ 'bg-dark-color': scrolled }">
    <div class="w-full flex items-center justify-between h-full">
      <!-- Logo aligned to far left with no container constraints -->
      <RouterLink to="/" class="navbar-brand ml-4 md:ml-6">
        <img :src="logoImage" alt="Ramadan Relief Logo" class="logo max-h-10" />
      </RouterLink>
      
      <!-- Mobile Menu Button -->
      <button class="text-white md:hidden mr-4" 
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
              <RouterLink 
                :to="item.to" 
                class="text-gray-300 hover:text-white block py-2" 
                :class="{ 'text-accent-color font-medium': isActiveRoute(item.to) }"
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
      <div class="hidden md:flex items-center mr-6">
        <ul class="flex items-center space-x-4">
          <li v-for="(item, index) in navItems" :key="index">
            <RouterLink 
              :to="item.to" 
              class="text-gray-300 hover:text-white px-2 py-1 relative nav-link"
              :class="{ 'is-active': isActiveRoute(item.to) }"
            >
              {{ item.label }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/donate" class="bg-accent-color text-dark-color rounded-full px-5 py-1.5 ml-4 font-bold">
              Donate Now
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoImage from '@/assets/images/logo2.png'

const scrolled = ref(false)
const isMenuOpen = ref(false)
const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Get Involved', to: '/#get-involved' },
  { label: 'Resources', to: '/resources' },
  { label: 'Eid Event', to: '/#eid-event' },
  { label: 'Contact', to: '/contact' }
]

// Check if a route is active
const isActiveRoute = (path: string) => {
  // Handle hash links to sections on the home page (/#section)
  if (path.includes('#')) {
    const hashPart = path.split('#')[1]
    // Check if current hash matches
    if (window.location.hash === `#${hashPart}`) {
      return true
    }
    // If we're on home page with no hash yet, don't highlight
    if (route.path === '/' && !window.location.hash && path.startsWith('/#')) {
      return false
    }
    return false
  }
  
  // Exact match for home page
  if (path === '/' && route.path === '/' && !window.location.hash) {
    return true
  }
  
  // Regular routes (non-hash)
  if (path !== '/' && route.path.startsWith(path) && !path.includes('#')) {
    return true
  }
  
  return false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Also listen for hash changes to update active state
  window.addEventListener('hashchange', () => {
    // Force component to update
    isMenuOpen.value = isMenuOpen.value
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('hashchange', () => {})
})

</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
}

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
  bottom: -2px;
  width: 0;
  border-bottom: 2px solid var(--accent-color);
  transition: width 0.3s ease-out;
}

.nav-link:hover::after,
.nav-link.is-active::after {
  width: 100%;
}

.text-accent-color {
  color: var(--accent-color);
}
</style>