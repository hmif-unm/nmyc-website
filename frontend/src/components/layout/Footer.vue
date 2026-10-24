<template>
  <footer id="kontak" class="pt-16 md:pt-24 pb-10 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-r from-dark to-primary text-white rounded-t-[40px] sm:rounded-t-[60px] relative overflow-hidden shadow-2xl">
    <!-- Ambient light effect -->
    <div class="absolute -bottom-24 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative max-w-[1800px] mx-auto">
      <!-- 4 Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-14 border-b border-white/15">
        <!-- Column 1: Brand Info & Social Media -->
        <div class="space-y-5">
          <router-link to="/" class="flex items-center gap-3 group inline-flex">
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-md transition-transform group-hover:scale-105">
              <img :src="logoImg" alt="NMYC Logo" class="w-full h-full object-contain" />
            </div>
            <span class="text-2xl font-bold tracking-wider text-white">NMYC</span>
          </router-link>

          <p class="text-white/80 text-sm leading-relaxed max-w-xs font-normal">
            Nusa Mandiri Youth Choir (NMYC) merupakan organisasi paduan suara di Universitas Nusa Mandiri yang mewadahi talenta dan kecintaan mahasiswa terhadap seni vokal.
          </p>

          <!-- Social Media Icons (TikTok, Instagram, YouTube) -->
          <div class="flex items-center gap-3 pt-2">
            <a
              v-for="(social, sIdx) in socialLinks"
              :key="sIdx"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white text-dark flex items-center justify-center shadow-md transition-all duration-300 hover:bg-light hover:scale-110"
              :aria-label="social.name"
            >
              <svg v-if="social.name === 'TikTok'" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.33 0 .64.05.93.14V9.45a6.34 6.34 0 0 0-.93-.07A6.34 6.34 0 0 0 3 15.72 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V8.71a8.18 8.18 0 0 0 4.91 1.63v-3.65h-1z" />
              </svg>
              <svg v-else-if="social.name === 'Instagram'" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <svg v-else-if="social.name === 'YouTube'" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Navigasi Links -->
        <div>
          <h4 class="text-lg font-bold text-white mb-5 tracking-wide">Navigasi</h4>
          <ul class="space-y-3 text-sm text-white/80">
            <li>
              <router-link to="/#hero" class="hover:text-light transition-colors duration-200">
                Beranda
              </router-link>
            </li>
            <li>
              <router-link to="/#about" class="hover:text-light transition-colors duration-200">
                Tentang NMYC
              </router-link>
            </li>
            <li>
              <router-link to="/#visi-misi" class="hover:text-light transition-colors duration-200">
                Visi &amp; Misi
              </router-link>
            </li>
            <li>
              <router-link to="/#struktur" class="hover:text-light transition-colors duration-200">
                Struktur Organisasi
              </router-link>
            </li>
            <li>
              <router-link to="/galeri" class="hover:text-light transition-colors duration-200 font-semibold text-white">
                Galeri Kegiatan
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Column 3: Kontak Info -->
        <div>
          <h4 class="text-lg font-bold text-white mb-5 tracking-wide">Kontak</h4>
          <ul class="space-y-4 text-sm text-white/80">
            <li class="flex items-start gap-2.5">
              <span>Universitas Nusa Mandiri, Kampus Margonda, Jl. Margonda Raya No. 545, Depok</span>
            </li>
            <li class="flex items-center gap-2.5">
              <a href="mailto:nmyc@nusamandiri.ac.id" class="hover:text-light transition-colors">
                nmyc@nusamandiri.ac.id
              </a>
            </li>
            <li class="flex items-center gap-2.5">
              <a href="tel:0812345678" class="hover:text-light transition-colors">
                +62 812-3456-7890
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 4: Ada Pertanyaan? / CTA -->
        <div class="space-y-4">
          <h4 class="text-lg font-bold text-white tracking-wide">Ada Pertanyaan?</h4>
          <p class="text-white/80 text-sm leading-relaxed">
            Silahkan Hubungi kami melalui tombol di bawah ini atau kirim pesan langsung kepada pengurus kami.
          </p>
          <div class="pt-2">
            <a
              href="mailto:nmyc@nusamandiri.ac.id"
              class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-primary font-semibold text-sm shadow-lg hover:bg-light hover:text-dark transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright / Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/60">
        <p>© 2026 Nusa Mandiri Youth Choir (NMYC). All rights reserved.</p>
        <p>Universitas Nusa Mandiri</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logoImg from '@/assets/landing-assets/logo.png'

const socialLinks = [
  { name: 'TikTok', url: 'https://tiktok.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'YouTube', url: 'https://youtube.com' }
]
</script>
