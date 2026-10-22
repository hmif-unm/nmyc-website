<template>
  <div class="min-h-screen font-poppins antialiased selection:bg-primary selection:text-white gallery-page relative overflow-x-hidden">

    <!-- ===================================== -->
    <!-- BACKGROUND: Purple Gradient + Decorasi -->
    <!-- ===================================== -->
    <div class="fixed inset-0 z-0 pointer-events-none gallery-bg">
      <!-- Musik Note Dekorasi Kiri Atas -->
      <svg class="absolute top-16 left-4 sm:left-8 opacity-20 w-10 h-10 sm:w-14 sm:h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <svg class="absolute top-32 left-16 sm:left-28 opacity-10 w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <!-- Notes Kanan Atas -->
      <svg class="absolute top-20 right-6 sm:right-16 opacity-20 w-8 h-8 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <!-- Notes kiri bawah -->
      <svg class="absolute bottom-48 left-4 sm:left-12 opacity-15 w-10 h-10 sm:w-14 sm:h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <!-- Notes kanan bawah -->
      <svg class="absolute bottom-24 right-6 sm:right-14 opacity-20 w-12 h-12 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 3L9 6v2l12-3V3zM5 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
      <!-- Double note dekorasi -->
      <svg class="absolute top-48 right-2 sm:right-8 opacity-15 w-12 h-12 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 6v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V10l12-3V6L9 6z"/>
      </svg>
    </div>

    <!-- ===================================== -->
    <!-- NAVBAR                                 -->
    <!-- ===================================== -->
    <div class="relative z-30 pt-6 sm:pt-8 px-4 flex justify-center">
      <GalleryNavbar />
    </div>

    <!-- ===================================== -->
    <!-- HEADER SECTION                         -->
    <!-- ===================================== -->
    <section class="relative z-10 text-center pt-10 sm:pt-14 pb-6 sm:pb-10 px-4">
      <p class="text-white/80 text-sm sm:text-base font-medium tracking-widest uppercase mb-2 sm:mb-3">Galeri</p>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
        Dokumentasi Kegiatan
      </h1>
      <p class="mt-3 sm:mt-4 text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
        Kumpulan momen dan kenangan berharga dari berbagai kegiatan Nusa Mandiri Youth Choir yang diabadikan untuk selalu dikenang.
      </p>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="selectCategory(cat.value)"
          :class="[
            'px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border',
            activeCategory === cat.value
              ? 'bg-white text-primary border-white shadow-lg shadow-white/20 scale-105'
              : 'bg-white/15 text-white border-white/30 hover:bg-white/25 hover:border-white/50 backdrop-blur-sm'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- GALLERY CARDS LIST                     -->
    <!-- ===================================== -->
    <section class="relative z-10 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 max-w-4xl xl:max-w-5xl mx-auto">
      <div class="space-y-4 sm:space-y-5">
        <transition-group name="card-fade" tag="div" class="space-y-4 sm:space-y-5">
          <div
            v-for="(item, idx) in paginatedItems"
            :key="item.id"
            class="gallery-card rounded-2xl sm:rounded-3xl bg-white/95 shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden border border-white/60 group cursor-pointer"
            @click="openDetail(item)"
          >
            <div class="flex flex-col sm:flex-row items-stretch" style="min-height: 160px; max-height: 240px;">
              <!-- Image Side (selang-seling kiri/kanan) -->
              <div
                :class="[
                  'relative shrink-0 overflow-hidden',
                  idx % 2 === 0 ? 'sm:order-last' : 'sm:order-first',
                  'w-full h-40 sm:h-auto sm:w-52 md:w-64'
                ]"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
              </div>

              <!-- Content Side -->
              <div class="flex-1 p-4 sm:p-6 flex flex-col justify-center overflow-hidden">
                <!-- Badge Kategori -->
                <div class="mb-2">
                  <span
                    :class="[
                      'inline-block px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider',
                      getCategoryStyle(item.category)
                    ]"
                  >
                    {{ item.category }}
                  </span>
                </div>
                <h3 class="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
                  {{ item.title }}
                </h3>
                <p class="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 flex-1">
                  {{ item.description }}
                </p>
                <div class="mt-3 sm:mt-4 flex items-center justify-between">
                  <span class="text-xs text-gray-400 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ item.date }}
                  </span>
                  <button
                    class="text-xs sm:text-sm font-semibold text-primary hover:text-secondary flex items-center gap-1.5 transition-all duration-200 group/btn"
                    @click.stop="openDetail(item)"
                  >
                    Read More
                    <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

        <!-- Empty State -->
        <div v-if="filteredItems.length === 0" class="text-center py-20">
          <svg class="w-16 h-16 mx-auto mb-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-white/60 text-base font-medium">Belum ada dokumentasi untuk kategori ini.</p>
        </div>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- PAGINATION PREV / NEXT                 -->
    <!-- ===================================== -->
    <div v-if="totalPages > 1" class="relative z-10 flex items-center justify-center gap-4 pb-14 sm:pb-20">
      <!-- Tombol Prev -->
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        :class="[
          'flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border',
          currentPage === 1
            ? 'bg-white/10 text-white/30 border-white/15 cursor-not-allowed'
            : 'bg-white/20 text-white border-white/40 hover:bg-white hover:text-primary hover:border-white shadow-md hover:shadow-lg hover:-translate-x-0.5'
        ]"
        aria-label="Halaman sebelumnya"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Sebelumnya
      </button>

      <!-- Indikator Halaman -->
      <span class="text-white/80 text-sm font-medium px-2 tabular-nums">
        {{ currentPage }} / {{ totalPages }}
      </span>

      <!-- Tombol Next -->
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        :class="[
          'flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border',
          currentPage === totalPages
            ? 'bg-white/10 text-white/30 border-white/15 cursor-not-allowed'
            : 'bg-white/20 text-white border-white/40 hover:bg-white hover:text-primary hover:border-white shadow-md hover:shadow-lg hover:translate-x-0.5'
        ]"
        aria-label="Halaman berikutnya"
      >
        Berikutnya
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- ===================================== -->
    <!-- MODAL DETAIL                           -->
    <!-- ===================================== -->
    <transition name="modal-fade">
      <div
        v-if="selectedItem"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeDetail"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="closeDetail"></div>

        <!-- Modal Card -->
        <div class="relative z-10 bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Close Button -->
          <button
            @click="closeDetail"
            class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Image -->
          <div class="h-56 sm:h-72 overflow-hidden rounded-t-3xl">
            <img :src="selectedItem.image" :alt="selectedItem.title" class="w-full h-full object-cover" />
          </div>

          <!-- Content -->
          <div class="p-6 sm:p-8">
            <span
              :class="[
                'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3',
                getCategoryStyle(selectedItem.category)
              ]"
            >
              {{ selectedItem.category }}
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{{ selectedItem.title }}</h2>
            <p class="text-gray-400 text-xs mb-4 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ selectedItem.date }}
            </p>
            <p class="text-gray-600 text-sm leading-relaxed">{{ selectedItem.fullDescription }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GalleryNavbar from '@/components/layout/GalleryNavbar.vue'

// Import asset foto dokumentasi
import fotoLatihan from '@/assets/dokumentasi-assets/Foto Latihan.jpg'
import fotoLiwetan from '@/assets/dokumentasi-assets/Liwetan bersama seluruh anggota NMYC.jpg'
import fotoPeksimida from '@/assets/dokumentasi-assets/Lomba Peksimida - Solo Pop.jpg'
import fotoSoloPria from '@/assets/dokumentasi-assets/Penampilan Solo Pria di Wisuda ke 40.jpg'
import fotoSoloWanita from '@/assets/dokumentasi-assets/Penampilan Solo Wanita di wisuda ke 40.jpg'
import fotoVocalGrub from '@/assets/dokumentasi-assets/Penampilan Vocal Grub di wisuda ke 37.jpg'
import fotoSertijab from '@/assets/dokumentasi-assets/Sertijab.jpg'
import fotoSerasi2025 from '@/assets/dokumentasi-assets/Tampil Pada saat Serasi 2025.jpg'
import fotoJIF from '@/assets/dokumentasi-assets/Tampil di JIF sebelum Wisuda.jpg'
import fotoSerasi2026 from '@/assets/dokumentasi-assets/Tampil di Serasi 2026.jpg'
import fotoEvent from '@/assets/dokumentasi-assets/Tampil pada saat event.jpg'

// ========================
// DATA GALERI
// ========================
const allItems = [
  {
    id: 1,
    title: 'Lomba Peksimida - Solo Pop',
    category: 'Lomba',
    date: '2024',
    image: fotoPeksimida,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 2,
    title: 'Lomba Seleksi Daerah',
    category: 'Lomba',
    date: '2024',
    image: fotoSertijab,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 3,
    title: 'Lomba di Kota Depok',
    category: 'Lomba',
    date: '2025',
    image: fotoVocalGrub,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 4,
    title: 'Lomba Tingkat Depok',
    category: 'Lomba',
    date: '2025',
    image: fotoSoloPria,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 5,
    title: 'Tampil di Serasi 2025',
    category: 'Penampilan',
    date: '2025',
    image: fotoSerasi2025,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 6,
    title: 'Tampil di Serasi 2026',
    category: 'Penampilan',
    date: '2026',
    image: fotoSerasi2026,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 7,
    title: 'Penampilan di JIF Sebelum Wisuda',
    category: 'Penampilan',
    date: '2024',
    image: fotoJIF,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 8,
    title: 'Liwetan bersama Seluruh Anggota NMYC',
    category: 'Kegiatan',
    date: '2025',
    image: fotoLiwetan,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 9,
    title: 'Lomba Seleksi Daerah',
    category: 'Lomba',
    date: '2026',
    image: fotoSoloWanita,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 10,
    title: 'Foto Latihan Rutin',
    category: 'Latihan',
    date: '2025',
    image: fotoLatihan,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    id: 11,
    title: 'Tampil Pada Saat Event',
    category: 'Penampilan',
    date: '2024',
    image: fotoEvent,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    fullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
]

// ========================
// FILTER KATEGORI
// ========================
const categories = [
  { value: 'Semua', label: 'Semua' },
  { value: 'Lomba', label: 'Lomba' },
  { value: 'Penampilan', label: 'Penampilan' },
  { value: 'Latihan', label: 'Latihan' },
  { value: 'Kegiatan', label: 'Kegiatan' },
]

const activeCategory = ref('Semua')

function selectCategory(val) {
  activeCategory.value = val
  currentPage.value = 1
}

// Warna badge per kategori
function getCategoryStyle(cat) {
  const styles = {
    'Lomba': 'bg-primary text-white',
    'Penampilan': 'bg-secondary text-white',
    'Latihan': 'bg-emerald-500 text-white',
    'Kegiatan': 'bg-amber-500 text-white',
  }
  return styles[cat] || 'bg-gray-400 text-white'
}

// ========================
// FILTER & PAGINATION
// ========================
const ITEMS_PER_PAGE = 5
const currentPage = ref(1)

const filteredItems = computed(() => {
  if (activeCategory.value === 'Semua') return allItems
  return allItems.filter(item => item.category === activeCategory.value)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / ITEMS_PER_PAGE))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredItems.value.slice(start, start + ITEMS_PER_PAGE)
})

// ========================
// MODAL DETAIL
// ========================
const selectedItem = ref(null)

function openDetail(item) {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

function closeDetail() {
  selectedItem.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
/* Purple gradient background */
.gallery-bg,
.gallery-page {
  background: linear-gradient(160deg, #3a0a70 0%, #6d0fc8 35%, #9b30e8 65%, #b857f5 100%);
}

/* Card styling */
.gallery-card {
  position: relative;
  overflow: hidden;
}

/* Animasi card */
.card-fade-enter-active,
.card-fade-leave-active {
  transition: all 0.35s ease;
}
.card-fade-enter-from,
.card-fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

/* Animasi modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Line clamp */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
