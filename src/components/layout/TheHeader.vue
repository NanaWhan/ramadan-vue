<template>
  <header class="fixed top-0 left-0 w-full text-white z-50 transition-all header-container h-14" 
          :class="{ 'bg-dark-color shadow-md': scrolled }">
    <div class="w-full flex items-center justify-between h-full">
      <!-- Logo aligned to far left with no container constraints -->
      <RouterLink to="/" class="navbar-brand ml-4 md:ml-6">
        <img :src="logoImage" alt="Ramadan Relief Logo" class="logo max-h-10" />
      </RouterLink>
      
      <!-- Mobile Menu Button -->
      <button class="text-white md:hidden mr-4 hover:bg-gray-800 p-2 rounded-md transition-colors" 
              type="button" 
              @click="isMenuOpen = !isMenuOpen">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <!-- Mobile Menu Overlay -->
      <transition name="fade">
        <div v-if="isMenuOpen" 
             class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
             @click="isMenuOpen = false"></div>
      </transition>

      <!-- Mobile Menu Panel -->
      <transition name="slide">
        <div v-if="isMenuOpen" 
             class="fixed inset-y-0 right-0 max-w-xs w-full bg-dark-color z-50 md:hidden shadow-xl transform transition-transform duration-300 ease-in-out">
          
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-700">
            <RouterLink to="/" class="flex items-center" @click="isMenuOpen = false">
              <img :src="logoImage" alt="Ramadan Relief Logo" class="h-8" />
            </RouterLink>
            <button @click="isMenuOpen = false" 
                    class="text-white hover:text-gray-400 p-2 rounded-full hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Menu Items -->
          <nav class="px-4 py-6">
            <ul class="space-y-3">
              <li v-for="(item, index) in navItems" :key="index">
                <RouterLink 
                  :to="item.to" 
                  class="block py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors" 
                  :class="{ 'bg-gray-800 text-accent-color font-medium': isActiveRoute(item.to) }"
                  @click="isMenuOpen = false">
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
            
            <!-- Donate Button -->
            <div class="mt-8 px-3">
              <RouterLink to="/donate" 
                          class="w-full block bg-accent-color text-dark-color rounded-md px-4 py-3 font-bold text-center hover:bg-yellow-400 transition-colors"
                          @click="isMenuOpen = false">
                Donate Now
              </RouterLink>
            </div>
            
            <!-- Social Links -->
            <div class="flex justify-center space-x-4 mt-8 pt-4 border-t border-gray-700">
              <a href="#" class="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </transition>
      
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
            <RouterLink to="/donate" class="bg-accent-color text-dark-color rounded-full px-5 py-1.5 ml-4 font-bold hover:bg-yellow-400 transition-colors">
              Donate Now
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
  scrolled.value = window.scrollY > 50
}

// Close mobile menu when window is resized to desktop size
const handleResize = () => {
  if (window.innerWidth >= 768 && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  // Also listen for hash changes to update active state
  window.addEventListener('hashchange', () => {
    // Force component to update
    isMenuOpen.value = isMenuOpen.value
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
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

.text-accent-color {
  color: var(--accent-color);
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

/* Fade transition for overlay */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide transition for panel */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>