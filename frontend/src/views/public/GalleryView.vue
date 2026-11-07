<template>
  <div class="min-h-screen font-poppins antialiased selection:bg-primary selection:text-white gallery-page relative overflow-x-hidden">

    <!-- ===================================== -->
    <!-- BACKGROUND: Purple Gradient + Dekorasi -->
    <!-- ===================================== -->
    <div class="fixed inset-0 z-0 pointer-events-none gallery-bg">
      <!-- Musik Note Dekorasi Kiri Atas -->
      <svg class="absolute top-16 left-4 sm:left-8 opacity-20 w-10 h-10 sm:w-14 sm:h-14 text-white animate-soft-float-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <svg class="absolute top-32 left-16 sm:left-28 opacity-10 w-6 h-6 sm:w-8 sm:h-8 text-white animate-soft-float-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <!-- Notes Kanan Atas -->
      <svg class="absolute top-20 right-6 sm:right-16 opacity-20 w-8 h-8 sm:w-12 sm:h-12 text-white animate-soft-float-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <!-- Notes kiri bawah -->
      <svg class="absolute bottom-48 left-4 sm:left-12 opacity-15 w-10 h-10 sm:w-14 sm:h-14 text-white animate-soft-float-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <!-- Notes kanan bawah -->
      <svg class="absolute bottom-24 right-6 sm:right-14 opacity-20 w-12 h-12 sm:w-16 sm:h-16 text-white animate-soft-float-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 3L9 6v2l12-3V3zM5 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
      <!-- Double note dekorasi -->
      <svg class="absolute top-48 right-2 sm:right-8 opacity-15 w-12 h-12 sm:w-16 sm:h-16 text-white animate-soft-float-3" fill="currentColor" viewBox="0 0 24 24">
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
    <section class="relative z-10 text-center pt-10 sm:pt-14 pb-8 sm:pb-12 px-4 max-w-4xl lg:max-w-5xl mx-auto">
      <p class="text-white/80 text-sm sm:text-base font-medium tracking-widest uppercase mb-2 sm:mb-3">Galeri</p>
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
        Dokumentasi Kegiatan
      </h1>
      <p class="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-normal">
        Kumpulan momen dan kenangan berharga dari berbagai kegiatan Nusa Mandiri Youth Choir yang diabadikan untuk selalu dikenang.
      </p>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="selectCategory(cat.value)"
          :class="[
            'px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer active:scale-95',
            activeCategory === cat.value
              ? 'bg-white text-primary border-white shadow-lg shadow-black/15 scale-105'
              : 'bg-white/15 text-white border-white/30 hover:bg-white/25 hover:border-white/50 backdrop-blur-sm hover:scale-105'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- GALLERY CARDS LIST                     -->
    <!-- ===================================== -->
    <section class="relative z-10 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 max-w-4xl lg:max-w-5xl xl:max-w-[1040px] mx-auto">
      <div class="relative space-y-4 sm:space-y-5">
        <!-- Loading State Skeleton -->
        <div v-if="isLoading" class="space-y-4 sm:space-y-5">
          <div
            v-for="n in 3"
            :key="n"
            class="rounded-2xl sm:rounded-3xl bg-white/20 backdrop-blur-md p-6 h-52 sm:h-56 animate-pulse border border-white/30 flex items-center justify-center text-white/80"
          >
            <div class="flex items-center gap-3 text-sm font-medium">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Memuat data dokumentasi dari server...
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="isError" class="text-center py-16 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20">
          <svg class="w-16 h-16 mx-auto mb-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="text-white text-base font-medium mb-3">Gagal memuat dokumentasi kegiatan dari backend.</p>
          <button
            @click="fetchGalleries"
            class="px-6 py-2.5 rounded-full bg-white text-primary text-xs sm:text-sm font-semibold hover:bg-light transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>

        <!-- Gallery Cards List -->
        <transition-group v-else name="card-fade" tag="div" class="relative space-y-4 sm:space-y-5">
          <div
            v-for="(item, idx) in paginatedItems"
            :key="item.id"
            class="gallery-card rounded-2xl sm:rounded-3xl bg-white/95 shadow-lg hover:shadow-2xl overflow-hidden border border-white/60 group cursor-pointer hover:-translate-y-1"
            @click="openDetail(item)"
          >
            <div class="flex flex-col sm:flex-row items-stretch sm:h-52 md:h-56 lg:h-60 overflow-hidden">
              <!-- Image Side (selang-seling kiri/kanan, terkunci rapi di desktop) -->
              <div
                :class="[
                  'relative shrink-0 overflow-hidden bg-purple-950',
                  idx % 2 === 0 ? 'sm:order-last' : 'sm:order-first',
                  'w-full h-44 sm:h-full sm:w-56 md:w-64 lg:w-72'
                ]"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
              </div>

              <!-- Content Side -->
              <div class="flex-1 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-center overflow-hidden">
                <!-- Badge Kategori -->
                <div class="mb-1.5 sm:mb-2">
                  <span
                    :class="[
                      'inline-block px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider',
                      getCategoryStyle(item.category)
                    ]"
                  >
                    {{ item.category }}
                  </span>
                </div>

                <!-- Judul -->
                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-1">
                  {{ item.title }}
                </h3>

                <!-- Deskripsi -->
                <p class="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 flex-1">
                  {{ item.description }}
                </p>

                <!-- Footer Kartu: Tanggal & Read More -->
                <div class="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span class="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <svg class="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(item.createdAt) }}
                  </span>
                  <button
                    class="text-xs sm:text-sm font-semibold text-primary hover:text-secondary flex items-center gap-1.5 transition-all duration-200 group/btn cursor-pointer shrink-0"
                    @click.stop="openDetail(item)"
                  >
                    Read More
                    <svg class="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

        <!-- Empty State -->
        <div v-if="!isLoading && !isError && filteredItems.length === 0" class="text-center py-20 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20">
          <svg class="w-16 h-16 mx-auto mb-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-white text-base font-medium">Belum ada dokumentasi untuk kategori ini.</p>
          <button
            @click="selectCategory('Semua')"
            class="mt-4 px-6 py-2 rounded-full bg-white text-primary text-xs sm:text-sm font-semibold hover:bg-light transition-all"
          >
            Tampilkan Semua
          </button>
        </div>
      </div>
    </section>

    <!-- ===================================== -->
    <!-- PAGINATION PREV / NEXT                 -->
    <!-- ===================================== -->
    <div v-if="totalPages > 1" class="relative z-10 flex items-center justify-center gap-4 pb-16 sm:pb-20">
      <!-- Tombol Prev -->
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 border cursor-pointer active:scale-95',
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
      <span class="text-white font-medium text-sm px-2 tabular-nums">
        {{ currentPage }} / {{ totalPages }}
      </span>

      <!-- Tombol Next -->
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[
          'flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 border cursor-pointer active:scale-95',
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        @click.self="closeDetail"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300" @click="closeDetail"></div>

        <!-- Modal Card -->
        <div class="relative z-10 bg-white rounded-3xl shadow-2xl max-w-2xl lg:max-w-3xl w-full max-h-[90vh] overflow-y-auto modal-content">
          <!-- Close Button -->
          <button
            @click="closeDetail"
            class="absolute top-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
            aria-label="Tutup Detail"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Image -->
          <div class="h-60 sm:h-72 md:h-84 overflow-hidden rounded-t-3xl bg-gray-900">
            <img :src="selectedItem.image" :alt="selectedItem.title" class="w-full h-full object-cover" />
          </div>

          <!-- Content -->
          <div class="p-6 sm:p-8">
            <span
              :class="[
                'inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3',
                getCategoryStyle(selectedItem.category)
              ]"
            >
              {{ selectedItem.category }}
            </span>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-snug">{{ selectedItem.title }}</h2>
            <p class="text-gray-400 text-xs sm:text-sm mb-4 flex items-center gap-1.5 font-medium">
              <svg class="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(selectedItem.createdAt) }}
            </p>
            <p class="text-gray-600 text-sm sm:text-base leading-relaxed">{{ selectedItem.fullDescription }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import GalleryNavbar from '@/components/layout/GalleryNavbar.vue'

// ========================
// STATE GALERI DARI BACKEND
// ========================
const allItems = ref([])
const isLoading = ref(true)
const isError = ref(false)

async function fetchGalleries() {
  isLoading.value = true
  isError.value = false
  try {
    const res = await fetch('/api/gallery')
    if (!res.ok) throw new Error('Gagal memuat galeri dari backend')
    const json = await res.json()
    if (json.success && Array.isArray(json.data)) {
      allItems.value = json.data
    } else {
      throw new Error('Format data tidak sesuai')
    }
  } catch (err) {
    console.error('Error fetching gallery:', err)
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

// ========================
// FORMAT TANGGAL & WAKTU (WIB)
// ========================
function formatDate(dateStr) {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr

    // Format tanggal Indonesia: contoh "19 Januari 2026"
    const dateFormatted = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    }).format(d)

    // Format jam 24-jam: contoh "10:00"
    const timeFormatted = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta'
    }).format(d).replace('.', ':')

    return `${dateFormatted}, ${timeFormatted} WIB`
  } catch (err) {
    return dateStr
  }
}

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
  if (activeCategory.value === 'Semua') return allItems.value
  return allItems.value.filter(item => item.category === activeCategory.value)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / ITEMS_PER_PAGE))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredItems.value.slice(start, start + ITEMS_PER_PAGE)
})

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

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

function handleKeydown(e) {
  if (e.key === 'Escape' && selectedItem.value) {
    closeDetail()
  }
}

onMounted(() => {
  fetchGalleries()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Purple gradient background (Original Design) */
.gallery-bg,
.gallery-page {
  background: linear-gradient(160deg, #3a0a70 0%, #6d0fc8 35%, #9b30e8 65%, #b857f5 100%);
}

/* Card hover micro-interaction */
.gallery-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

/* Smooth FLIP Transition for Gallery Cards */
.card-fade-enter-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}
.card-fade-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
.card-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.98);
}
.card-fade-move {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-content {
  animation: modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-leave-active .modal-content {
  animation: modalScaleOut 0.2s ease-in;
}

@keyframes modalScaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes modalScaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* Subtle Floating Notes */
.animate-soft-float-1,
.animate-soft-float-2,
.animate-soft-float-3 {
  transform-box: fill-box;
  transform-origin: center;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
@keyframes softFloat1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
}
@keyframes softFloat2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(-4deg); }
}
@keyframes softFloat3 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(2deg); }
}
.animate-soft-float-1 {
  animation: softFloat1 5s ease-in-out infinite;
}
.animate-soft-float-2 {
  animation: softFloat2 6.5s ease-in-out infinite;
}
.animate-soft-float-3 {
  animation: softFloat3 4.5s ease-in-out infinite;
}

/* Line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
