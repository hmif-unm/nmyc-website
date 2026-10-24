<template>
  <div class="w-full flex flex-col items-center">
    <!-- Frosted Glass Pill Navbar (sama style dengan LandingPage) -->
    <nav
      class="w-full max-w-[897px] lg:max-w-[980px] xl:max-w-[1040px] h-[64px] sm:h-[72px] md:h-[78px] lg:h-[82px] rounded-full px-5 sm:px-8 md:px-10 shadow-lg flex items-center justify-between border border-white/30 backdrop-blur-md text-white"
      style="background: rgba(255, 255, 255, 0.16); box-shadow: 0 4px 28px rgba(0, 0, 0, 0.12);"
    >
      <!-- Logo Badge -->
      <a href="/#hero" @click.prevent="navigateTo('#hero')" class="shrink-0 flex items-center group cursor-pointer">
        <div class="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-md overflow-hidden transition-transform group-hover:scale-105">
          <img :src="logoImg" alt="NMYC Logo" class="w-full h-full object-contain" />
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <ul class="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-[15px] xl:text-base font-medium tracking-wide">
        <li>
          <a
            href="/#hero"
            @click.prevent="navigateTo('#hero')"
            class="transition-colors pb-1 text-white/90 hover:text-white cursor-pointer"
          >
            Beranda
          </a>
        </li>
        <li>
          <a
            href="/#about"
            @click.prevent="navigateTo('#about')"
            class="transition-colors pb-1 text-white/90 hover:text-white cursor-pointer"
          >
            Tentang NMYC
          </a>
        </li>
        <li>
          <a
            href="/#visi-misi"
            @click.prevent="navigateTo('#visi-misi')"
            class="transition-colors pb-1 text-white/90 hover:text-white cursor-pointer"
          >
            Visi &amp; Misi
          </a>
        </li>
        <li>
          <a
            href="/#struktur"
            @click.prevent="navigateTo('#struktur')"
            class="transition-colors pb-1 text-white/90 hover:text-white cursor-pointer"
          >
            Struktur Organisasi
          </a>
        </li>
        <li>
          <router-link
            to="/galeri"
            @click="handleGaleriClick"
            class="transition-colors pb-1 font-semibold text-white border-b-2 border-white cursor-pointer"
          >
            Galeri Kegiatan
          </router-link>
        </li>
      </ul>

      <!-- Mobile Menu Toggle -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden text-white p-2 rounded-lg focus:outline-none cursor-pointer"
        aria-label="Toggle Menu"
      >
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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
        class="md:hidden mt-2 mx-auto w-[95%] max-w-[897px] rounded-2xl backdrop-blur-xl border border-white/20 p-5 shadow-2xl text-white space-y-3 z-50"
        style="background: rgba(58, 10, 112, 0.92);"
      >
        <a href="/#hero" @click.prevent="navigateTo('#hero')" class="block py-2 px-3 rounded-lg hover:bg-white/10 text-white/90">
          Beranda
        </a>
        <a href="/#about" @click.prevent="navigateTo('#about')" class="block py-2 px-3 rounded-lg hover:bg-white/10 text-white/90">
          Tentang NMYC
        </a>
        <a href="/#visi-misi" @click.prevent="navigateTo('#visi-misi')" class="block py-2 px-3 rounded-lg hover:bg-white/10 text-white/90">
          Visi &amp; Misi
        </a>
        <a href="/#struktur" @click.prevent="navigateTo('#struktur')" class="block py-2 px-3 rounded-lg hover:bg-white/10 text-white/90">
          Struktur Organisasi
        </a>
        <router-link to="/galeri" @click="handleGaleriClick" class="block py-2 px-3 rounded-lg bg-white/15 font-semibold text-white">
          Galeri Kegiatan
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoImg from '@/assets/landing-assets/logo.png'

const isOpen = ref(false)
const router = useRouter()
const route = useRoute()

function navigateTo(hash) {
  isOpen.value = false
  if (route.path === '/') {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push({ path: '/', hash }).then(() => {
      // Multiple attempts to ensure the element is smoothly scrolled to even with page transition
      const tryScroll = () => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return true
        }
        return false
      }
      setTimeout(tryScroll, 100)
      setTimeout(tryScroll, 250)
      setTimeout(tryScroll, 450)
    })
  }
}

function handleGaleriClick() {
  isOpen.value = false
  if (route.path === '/galeri') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>
