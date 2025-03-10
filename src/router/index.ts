import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DonateView from '../views/DonateView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import ContactView from '../views/ContactView.vue'
import PaymentCallbackView from '../views/PaymentCallbackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/donate',
      name: 'donate',
      component: () => import('../views/DonateView.vue')
    },
    {
      path: '/payment/callback',
      name: 'payment-callback',
      component: PaymentCallbackView
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/ResourcesView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to anchor if specified in hash
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    // Otherwise use saved position or go to top
    return savedPosition || { top: 0 }
  }
})

export default router