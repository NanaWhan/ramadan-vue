<template>
  <div class="app-container">
    <TheHeader />
    <main>
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
</script>

<style>

/* Base styles that will apply site-wide */
:root {
  --accent-color: #F4BE37;
  --secondary-color: #E2EAF1;
  --dark-color: #092035;
  --grey-color: #E2EAF1;
  --body-text-color: #7C8990;
  --light-text-color: #9CA5AD;
  --link-color: #092035;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--dark-color);
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>