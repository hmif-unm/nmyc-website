<template>
  <div class="min-h-screen bg-[#f8f9fa] text-gray-800 antialiased font-poppins selection:bg-primary selection:text-white overflow-x-hidden">
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
</script>

<style>
/* Smooth scrolling for anchor navigation */
html {
  scroll-behavior: smooth;
}

/* Smooth, flicker-free page fade transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
