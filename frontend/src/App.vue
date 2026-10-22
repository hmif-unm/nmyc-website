<template>
  <div class="min-h-screen bg-[#f8f9fa] text-gray-800 antialiased font-poppins selection:bg-primary selection:text-white">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
/* Smooth scrolling for anchor navigation */
html {
  scroll-behavior: smooth;
}
</style>
