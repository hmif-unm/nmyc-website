<template>
  <div class="w-full flex flex-col items-center">

    <!-- ============================================ -->
    <!-- MOBILE Navbar: White pill (logo | NMYC | ☰) -->
    <!-- ============================================ -->
    <nav
      class="md:hidden w-full max-w-[360px] h-[56px] rounded-full px-4 shadow-xl flex items-center justify-between bg-white text-dark"
    >
      <!-- Logo kiri -->
      <a href="#hero" class="shrink-0 flex items-center group">
        <div class="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center p-0.5 shadow-sm overflow-hidden transition-transform group-hover:scale-105">
          <img :src="logoImg" alt="NMYC Logo" class="w-full h-full object-contain" />
        </div>
      </a>

      <!-- Nama tengah -->
      <span class="text-base font-bold tracking-widest text-dark select-none">NMYC</span>

      <!-- Hamburger kanan -->
      <button
        @click="isOpen = !isOpen"
        class="p-2 rounded-lg focus:outline-none text-dark"
        aria-label="Toggle Menu"
      >
        <svg v-if="!isOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- ============================================ -->
    <!-- DESKTOP Navbar: Frosted Glass Pill           -->
    <!-- ============================================ -->
    <nav
      class="hidden md:flex w-full max-w-[897px] lg:max-w-[980px] xl:max-w-[1040px] h-[72px] md:h-[78px] lg:h-[82px] rounded-full px-8 md:px-10 shadow-lg items-center justify-between border border-white/30 backdrop-blur-md text-white transition-all duration-300"
      style="background: rgba(255, 255, 255, 0.16); box-shadow: 0 4px 28px rgba(0, 0, 0, 0.12);"
    >
      <!-- Logo Badge -->
      <a href="#hero" class="shrink-0 flex items-center group">
        <div class="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-md overflow-hidden transition-transform group-hover:scale-105">
          <img :src="logoImg" alt="NMYC Logo" class="w-full h-full object-contain" />
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <ul class="flex items-center gap-6 lg:gap-10 text-sm lg:text-[15px] xl:text-base font-medium tracking-wide">
        <li>
          <a
            href="#hero"
            :class="['transition-colors pb-1', activeSection === 'hero' ? 'font-semibold text-white border-b-2 border-white' : 'text-white/90 hover:text-white']"
            @click="activeSection = 'hero'"
          >Beranda</a>
        </li>
        <li>
          <a
            href="#about"
            :class="['transition-colors pb-1', activeSection === 'about' ? 'font-semibold text-white border-b-2 border-white' : 'text-white/90 hover:text-white']"
            @click="activeSection = 'about'"
          >Tentang NMYC</a>
        </li>
        <li>
          <a
            href="#visi-misi"
            :class="['transition-colors pb-1', activeSection === 'visi-misi' ? 'font-semibold text-white border-b-2 border-white' : 'text-white/90 hover:text-white']"
            @click="activeSection = 'visi-misi'"
          >Visi &amp; Misi</a>
        </li>
        <li>
          <a
            href="#struktur"
            :class="['transition-colors pb-1', activeSection === 'struktur' ? 'font-semibold text-white border-b-2 border-white' : 'text-white/90 hover:text-white']"
            @click="activeSection = 'struktur'"
          >Struktur Organisasi</a>
        </li>
        <li>
          <router-link to="/galeri" class="text-white/90 hover:text-white transition-colors pb-1">
            Galeri Kegiatan
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isOpen"
        class="md:hidden mt-2 mx-auto w-[95%] max-w-[360px] rounded-2xl bg-dark/95 backdrop-blur-xl border border-white/20 p-5 shadow-2xl text-white space-y-3 z-50"
      >
        <a href="#hero"      @click="isOpen = false; activeSection = 'hero'"      class="block py-2 px-3 rounded-lg hover:bg-primary/50 font-semibold">Beranda</a>
        <a href="#about"     @click="isOpen = false; activeSection = 'about'"     class="block py-2 px-3 rounded-lg hover:bg-primary/50 text-white/90">Tentang NMYC</a>
        <a href="#visi-misi" @click="isOpen = false; activeSection = 'visi-misi'" class="block py-2 px-3 rounded-lg hover:bg-primary/50 text-white/90">Visi &amp; Misi</a>
        <a href="#struktur"  @click="isOpen = false; activeSection = 'struktur'"  class="block py-2 px-3 rounded-lg hover:bg-primary/50 text-white/90">Struktur Organisasi</a>
        <router-link to="/galeri" @click="isOpen = false" class="block py-2 px-3 rounded-lg hover:bg-primary/50 text-white/90">Galeri Kegiatan</router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logoImg from '@/assets/landing-assets/logo.png'

const isOpen = ref(false)
const activeSection = ref('hero')
</script>
