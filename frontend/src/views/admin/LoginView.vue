<template>
  <div class="min-h-screen font-poppins flex items-center justify-center p-4 bg-gradient-to-br from-[#1e0834] via-[#3a0a70] to-[#6d0fc8] relative overflow-hidden selection:bg-primary selection:text-white">
    <!-- Dekorasi Latar Belakang -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/40">
      <!-- Logo & Header -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white shadow-md p-2 flex items-center justify-center border border-purple-100">
          <img :src="logoImg" alt="Logo NMYC" class="w-full h-full object-contain" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Ruang Pengurus</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium">Nusa Mandiri Youth Choir (NMYC)</p>
      </div>

      <!-- Alert Error -->
      <transition name="fade">
        <div
          v-if="errorMessage"
          class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs sm:text-sm"
          role="alert"
        >
          <svg class="w-5 h-5 shrink-0 text-rose-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">{{ errorMessage }}</span>
        </div>
      </transition>

      <!-- Form Login Key -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="adminKey" class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Kunci Akses Pengurus
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <input
              id="adminKey"
              v-model="accessKey"
              :type="showKey ? 'text' : 'password'"
              placeholder="Ketik kunci akses pengurus..."
              autocomplete="current-password"
              required
              class="w-full pl-11 pr-11 py-3.5 bg-gray-50/80 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
            />
            <button
              type="button"
              @click="showKey = !showKey"
              class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              tabindex="-1"
              :aria-label="showKey ? 'Sembunyikan Kunci' : 'Tampilkan Kunci'"
            >
              <!-- Eye Off -->
              <svg v-if="showKey" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
              <!-- Eye -->
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <p class="text-[11px] text-gray-400 mt-2">
            Kunci akses khusus untuk pengurus yang bertugas mengelola dokumentasi kegiatan.
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading || !accessKey.trim()"
          class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-[#500c96] hover:to-[#892be2] text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>{{ isLoading ? 'Memeriksa...' : 'Masuk' }}</span>
        </button>
      </form>

      <!-- Navigasi Bawah -->
      <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <router-link to="/" class="hover:text-primary transition-colors flex items-center gap-1 font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </router-link>
        <router-link to="/galeri" class="hover:text-primary transition-colors font-medium">
          Lihat Galeri &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '@/assets/landing-assets/logo.png'

const router = useRouter()
const accessKey = ref('')
const showKey = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

onMounted(() => {
  const token = localStorage.getItem('nmyc_admin_token')
  if (token) {
    router.replace('/admin/dashboard')
  }
})

async function handleLogin() {
  if (!accessKey.value.trim()) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: accessKey.value.trim() })
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Kunci akses tidak cocok. Silakan periksa kembali.')
    }

    localStorage.setItem('nmyc_admin_token', data.token)
    router.push('/admin/dashboard')
  } catch (err) {
    errorMessage.value = err.message || 'Gagal terhubung. Pastikan koneksi internet aktif.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
