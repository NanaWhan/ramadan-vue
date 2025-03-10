<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="fixed bottom-0.5 right-2 z-50 w-12 h-12 rounded-full bg-accent-color text-dark-color shadow-md hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center"
    aria-label="Scroll to top"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
  // Show button when page is scrolled down 300px
  showButton.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}
</style>