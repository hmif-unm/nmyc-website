<template>
  <div class="h-screen h-[100dvh] overflow-hidden font-poppins bg-[#f8f9fa] text-gray-800 antialiased selection:bg-primary selection:text-white flex">
    <!-- ========================================== -->
    <!-- 1. SIDEBAR NAVIGASI (ADMIN DASHBOARD)      -->
    <!-- ========================================== -->
    <!-- Mobile Backdrop -->
    <transition name="fade">
      <div
        v-if="isMobileDrawerOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 lg:hidden"
        @click="isMobileDrawerOpen = false"
      ></div>
    </transition>

    <aside
      :class="[
        'h-full flex flex-col justify-between shrink-0 bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out',
        // Desktop styling (collapsible)
        'lg:static',
        isSidebarVisible
          ? 'lg:w-72 lg:opacity-100'
          : 'lg:w-0 lg:opacity-0 lg:overflow-hidden lg:border-r-0 lg:pointer-events-none',
        // Mobile styling (slide-over drawer)
        'fixed inset-y-0 left-0 w-72 max-w-[85vw]',
        isMobileDrawerOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Top Branding (Fixed, No Arrow Button) -->
      <div class="p-5 sm:p-6 border-b border-gray-100 flex items-center gap-3 shrink-0 bg-white">
        <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white shadow-sm p-1.5 flex items-center justify-center border border-purple-100 shrink-0">
          <img :src="logoImg" alt="Logo NMYC" class="w-full h-full object-contain" />
        </div>
        <div class="min-w-0">
          <h1 class="text-base font-bold text-gray-900 leading-tight truncate">Admin Dashboard</h1>
          <p class="text-xs text-gray-400 font-medium truncate">Nusa Mandiri Youth Choir</p>
        </div>
      </div>

      <!-- Main Navigation Menu (Scrolls independently if menu is long) -->
      <div class="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <p class="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Menu Utama
          </p>
          <nav class="space-y-1.5">
            <!-- Menu Item: Kelola Galeri Kegiatan (Tanpa Angka) -->
            <button
              type="button"
              class="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs sm:text-sm shadow-md shadow-primary/20 transition-all cursor-pointer text-left"
            >
              <svg class="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Kelola Galeri Kegiatan</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Bottom Logout Area (Permanently Fixed at Bottom, Never Cut Off) -->
      <div class="p-4 border-t border-gray-100 shrink-0 bg-white">
        <button
          @click="openLogoutModal"
          type="button"
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Keluar</span>
        </button>
      </div>
    </aside>

    <!-- ========================================== -->
    <!-- 2. MAIN CONTENT AREA (INDEPENDENT SCROLL)  -->
    <!-- ========================================== -->
    <div class="flex-1 h-full overflow-y-auto flex flex-col min-w-0 bg-[#f8f9fa]">
      <!-- Top Navbar on Main Area -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-xs shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <!-- Left: Hamburger Toggle Button (Garis 3) + Breadcrumb Title -->
          <div class="flex items-center gap-3">
            <button
              @click="toggleSidebar"
              class="p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors cursor-pointer"
              :title="isSidebarVisible ? 'Sembunyikan Menu' : 'Tampilkan Menu'"
              aria-label="Toggle Menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 leading-tight">Kelola Galeri Kegiatan</h2>
              <p class="text-xs text-gray-400 font-medium hidden sm:block">Dokumentasi & Galeri Paduan Suara</p>
            </div>
          </div>

          <!-- Right Actions: Only "Foto di GitHub" & "Keluar" -->
          <div class="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/hmif-unm/nmyc-assets"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              title="Buka Repositori Foto Dokumentasi"
            >
              <svg class="w-4 h-4 fill-current text-gray-700" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span class="hidden sm:inline">Foto di GitHub</span>
            </a>

            <button
              @click="openLogoutModal"
              type="button"
              class="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Keluar"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Body Content (Scrolls vertically, independent of navbar) -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <!-- Toast Notifikasi Sederhana -->
        <transition name="fade">
          <div
            v-if="toastMessage"
            :class="[
              'p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm shadow-md border',
              toastType === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            ]"
          >
            <div class="flex items-center gap-2.5">
              <svg v-if="toastType === 'success'" class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else class="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="font-medium">{{ toastMessage }}</span>
            </div>
            <button @click="toastMessage = ''" class="text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </transition>

        <!-- Ringkasan Statistik Kegiatan -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          <div class="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Kegiatan</p>
            <p class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">{{ allGalleries.length }}</p>
          </div>
          <div class="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <p class="text-xs font-semibold text-primary uppercase tracking-wider">Lomba</p>
            <p class="text-2xl sm:text-3xl font-extrabold text-primary mt-2">
              {{ allGalleries.filter(g => g.category === 'Lomba').length }}
            </p>
          </div>
          <div class="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <p class="text-xs font-semibold text-secondary uppercase tracking-wider">Penampilan</p>
            <p class="text-2xl sm:text-3xl font-extrabold text-secondary mt-2">
              {{ allGalleries.filter(g => g.category === 'Penampilan').length }}
            </p>
          </div>
          <div class="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <p class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Latihan & Kegiatan</p>
            <p class="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">
              {{ allGalleries.filter(g => g.category === 'Latihan' || g.category === 'Kegiatan').length }}
            </p>
          </div>
        </div>

        <!-- Bilah Pencarian, Filter & Tombol Tambah -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <!-- Pencarian & Tab Kategori -->
          <div class="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <!-- Kotak Pencarian -->
            <div class="relative flex-1 max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari nama kegiatan atau deskripsi..."
                class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>

            <!-- Kategori -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="activeCategory = cat"
                :class="[
                  'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer',
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Tombol Tambah Kegiatan -->
          <button
            @click="openAddModal"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-[#500c96] hover:to-[#892be2] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Kegiatan Baru
          </button>
        </div>

        <!-- Tabel Daftar Dokumentasi -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <!-- Sedang Memuat -->
          <div v-if="isLoading" class="p-12 text-center text-gray-400">
            <svg class="animate-spin h-8 w-8 mx-auto text-primary mb-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p class="text-sm font-medium">Memuat dokumentasi kegiatan...</p>
          </div>

          <!-- Kosong -->
          <div v-else-if="filteredGalleries.length === 0" class="p-12 text-center">
            <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-base font-bold text-gray-800">Belum ada dokumentasi kegiatan.</p>
            <p class="text-xs text-gray-400 mt-1">Gunakan tombol "Tambah Kegiatan Baru" untuk menambahkan dokumentasi.</p>
          </div>

          <!-- Tabel Kegiatan -->
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="py-4 px-6 w-16">No</th>
                  <th class="py-4 px-6 w-24">Foto</th>
                  <th class="py-4 px-6">Nama Kegiatan & Deskripsi Singkat</th>
                  <th class="py-4 px-6 w-32">Kategori</th>
                  <th class="py-4 px-6 w-48">Waktu Penambahan</th>
                  <th class="py-4 px-6 w-28 text-center">Pilihan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs sm:text-sm">
                <tr
                  v-for="(item, idx) in filteredGalleries"
                  :key="item.id"
                  class="hover:bg-purple-50/40 transition-colors"
                >
                  <!-- Nomor -->
                  <td class="py-4 px-6 font-mono font-medium text-gray-400">
                    {{ idx + 1 }}
                  </td>

                  <!-- Foto Thumbnail -->
                  <td class="py-4 px-6">
                    <div class="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      <img
                        :src="item.image"
                        :alt="item.title"
                        class="w-full h-full object-cover"
                        @error="$event.target.src = '/assets/landing-assets/ellipse-20.png'"
                        loading="lazy"
                      />
                    </div>
                  </td>

                  <!-- Judul & Deskripsi Singkat -->
                  <td class="py-4 px-6 max-w-md">
                    <p class="font-bold text-gray-900 leading-snug line-clamp-1">{{ item.title }}</p>
                    <p class="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">{{ item.description }}</p>
                  </td>

                  <!-- Kategori Badge -->
                  <td class="py-4 px-6">
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider',
                        getCategoryStyle(item.category)
                      ]"
                    >
                      {{ item.category }}
                    </span>
                  </td>

                  <!-- Tanggal Waktu -->
                  <td class="py-4 px-6 text-gray-500 text-xs font-medium">
                    {{ formatDate(item.createdAt) }}
                  </td>

                  <!-- Tombol Aksi -->
                  <td class="py-4 px-6 text-center">
                    <div class="inline-flex items-center gap-1.5">
                      <!-- Edit Button -->
                      <button
                        @click="openEditModal(item)"
                        class="p-2 rounded-xl text-gray-500 hover:text-primary hover:bg-purple-100/60 transition-colors cursor-pointer"
                        title="Ubah Data"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      <!-- Delete Button -->
                      <button
                        @click="openDeleteModal(item)"
                        class="p-2 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-100/60 transition-colors cursor-pointer"
                        title="Hapus Data"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- ========================================== -->
    <!-- 3. MODAL FORM: TAMBAH / UBAH DOKUMENTASI   -->
    <!-- (Header & Footer Terkunci Permanen)        -->
    <!-- ========================================== -->
    <transition name="modal-smooth">
      <div
        v-if="showFormModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <!-- Smooth Backdrop -->
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-xs modal-backdrop"
          @click="showFormModal = false"
        ></div>

        <!-- Modal Dialog Card (Locked Header & Footer) -->
        <div class="relative z-10 bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden modal-dialog">
          <!-- Header (Terkunci Permanen di Atas) -->
          <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
            <div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900">
                {{ isEditMode ? 'Ubah Dokumentasi Kegiatan' : 'Tambah Dokumentasi Baru' }}
              </h3>
              <p class="text-xs text-gray-400 mt-0.5">Isi rincian kegiatan paduan suara dengan lengkap.</p>
            </div>
            <button
              @click="showFormModal = false"
              type="button"
              class="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form Body (Only Middle Section Scrolls) -->
          <form @submit.prevent="handleSubmitForm" class="flex flex-col flex-1 min-h-0">
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <!-- Nama Kegiatan -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Nama Kegiatan <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  placeholder="Contoh: Lomba Peksimida - Solo Pop"
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              <!-- Kategori -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Kategori Kegiatan <span class="text-rose-500">*</span>
                </label>
                <select
                  v-model="formData.category"
                  required
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                >
                  <option value="Lomba">Lomba</option>
                  <option value="Penampilan">Penampilan</option>
                  <option value="Latihan">Latihan</option>
                  <option value="Kegiatan">Kegiatan</option>
                </select>
              </div>

              <!-- Tautan Foto (GitHub / Link Bebas) -->
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Foto Dokumentasi <span class="text-rose-500">*</span>
                  </label>
                  <a
                    href="https://github.com/hmif-unm/nmyc-assets"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    Buka Folder GitHub &rarr;
                  </a>
                </div>

                <input
                  v-model="formData.image"
                  @input="handleImageChange"
                  type="text"
                  required
                  placeholder="Tempel link foto GitHub di sini (cth: https://github.com/hmif-unm/nmyc-assets/...)"
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
                <p class="text-[11px] text-gray-400 mt-1.5">
                  Bisa tempelkan link foto dari repositori GitHub NMYC. Link otomatis disesuaikan agar foto langsung tampil.
                </p>

                <!-- Preview Image -->
                <div v-if="formData.image" class="mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3">
                  <div class="w-20 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                    <img
                      :src="previewImageUrl"
                      alt="Preview Image"
                      class="w-full h-full object-cover"
                      @error="imageLoadError = true"
                      @load="imageLoadError = false"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs font-bold text-gray-700">Preview Image</p>
                    <p class="text-[11px] text-gray-400 truncate mt-0.5">{{ formData.image }}</p>
                  </div>
                </div>
              </div>

              <!-- Deskripsi Singkat -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Deskripsi Singkat <span class="text-rose-500">*</span>
                </label>
                <textarea
                  v-model="formData.description"
                  rows="2"
                  required
                  placeholder="Deskripsi singkat yang akan muncul di kartu galeri..."
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                ></textarea>
              </div>

              <!-- Deskripsi Lengkap -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Deskripsi Lengkap
                </label>
                <textarea
                  v-model="formData.fullDescription"
                  rows="3"
                  placeholder="Cerita atau informasi lengkap kegiatan (bila dikosongkan, akan disamakan dengan deskripsi singkat)..."
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                ></textarea>
              </div>
            </div>

            <!-- Footer (Terkunci Permanen di Bawah) -->
            <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0 bg-white z-10">
              <button
                type="button"
                @click="showFormModal = false"
                class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-[#500c96] hover:to-[#892be2] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Kegiatan' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- ========================================== -->
    <!-- 4. DIALOG KONFIRMASI HAPUS                 -->
    <!-- ========================================== -->
    <transition name="modal-smooth">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-black/60 backdrop-blur-xs modal-backdrop" @click="showDeleteModal = false"></div>

        <div class="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-7 text-center modal-dialog">
          <div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <h3 class="text-lg font-bold text-gray-900">Hapus Dokumentasi Kegiatan?</h3>
          <p class="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            Apakah Anda yakin ingin menghapus dokumentasi <span class="font-bold text-gray-800">"{{ itemToDelete?.title }}"</span>? Data yang dihapus tidak dapat dikembalikan.
          </p>

          <div class="mt-6 flex items-center justify-center gap-3">
            <button
              @click="showDeleteModal = false"
              class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              @click="confirmDelete"
              :disabled="isDeleting"
              class="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <svg v-if="isDeleting" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ========================================== -->
    <!-- 5. DIALOG KONFIRMASI KELUAR (LOGOUT)       -->
    <!-- ========================================== -->
    <transition name="modal-smooth">
      <div
        v-if="showLogoutModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-black/60 backdrop-blur-xs modal-backdrop" @click="showLogoutModal = false"></div>

        <div class="relative z-10 bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 sm:p-7 text-center modal-dialog">
          <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>

          <h3 class="text-lg font-bold text-gray-900">Keluar dari Halaman Pengurus?</h3>
          <p class="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            Apakah Anda yakin ingin keluar? Anda harus memasukkan kunci akses kembali untuk mengelola galeri.
          </p>

          <div class="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              @click="showLogoutModal = false"
              class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              @click="confirmLogout"
              class="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '@/assets/landing-assets/logo.png'

const router = useRouter()

// ========================
// STATE NAVIGASI & SIDEBAR
// ========================
const isSidebarVisible = ref(true)
const isMobileDrawerOpen = ref(false)

function toggleSidebar() {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    isMobileDrawerOpen.value = !isMobileDrawerOpen.value
  } else {
    isSidebarVisible.value = !isSidebarVisible.value
  }
}

// ========================
// STATE DATA
// ========================
const allGalleries = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const activeCategory = ref('Semua')

const categories = ['Semua', 'Lomba', 'Penampilan', 'Latihan', 'Kegiatan']

// Notifikasi Toast
const toastMessage = ref('')
const toastType = ref('success')

function showToast(msg, type = 'success') {
  toastMessage.value = msg
  toastType.value = type
  setTimeout(() => {
    if (toastMessage.value === msg) {
      toastMessage.value = ''
    }
  }, 4000)
}

// ========================
// FORMAT TANGGAL INDONESIA (WIB)
// ========================
function formatDate(dateStr) {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr

    const dateFormatted = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    }).format(d)

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

function getCategoryStyle(cat) {
  const styles = {
    'Lomba': 'bg-purple-100 text-primary',
    'Penampilan': 'bg-fuchsia-100 text-secondary',
    'Latihan': 'bg-emerald-100 text-emerald-700',
    'Kegiatan': 'bg-amber-100 text-amber-700',
  }
  return styles[cat] || 'bg-gray-100 text-gray-700'
}

// ========================
// AUTO CONVERTER LINK GITHUB
// ========================
function normalizeGitHubUrl(url) {
  if (!url || typeof url !== 'string') return ''
  let cleanUrl = url.trim()

  const githubBlobRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i
  const matchBlob = cleanUrl.match(githubBlobRegex)
  if (matchBlob) {
    return `https://raw.githubusercontent.com/${matchBlob[1]}/${matchBlob[2]}/${matchBlob[3]}/${matchBlob[4]}`
  }

  return cleanUrl
}

// ========================
// FILTER & SEARCH
// ========================
const filteredGalleries = computed(() => {
  return allGalleries.value.filter(item => {
    const matchCat = activeCategory.value === 'Semua' || item.category === activeCategory.value
    const q = searchQuery.value.toLowerCase().trim()
    const matchQuery = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    return matchCat && matchQuery
  })
})

// ========================
// FETCH DATA & VERIFIKASI
// ========================
function getAuthHeader() {
  const token = localStorage.getItem('nmyc_admin_token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

async function verifyAuth() {
  const token = localStorage.getItem('nmyc_admin_token')
  if (!token) {
    router.replace('/login')
    return false
  }

  try {
    const res = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) {
      localStorage.removeItem('nmyc_admin_token')
      router.replace('/login')
      return false
    }
    return true
  } catch (err) {
    localStorage.removeItem('nmyc_admin_token')
    router.replace('/login')
    return false
  }
}

async function fetchGalleries() {
  isLoading.value = true
  try {
    const res = await fetch('/api/gallery')
    const json = await res.json()
    if (json.success && Array.isArray(json.data)) {
      allGalleries.value = json.data
    } else {
      allGalleries.value = []
    }
  } catch (err) {
    showToast('Gagal memuat daftar dokumentasi kegiatan.', 'error')
  } finally {
    isLoading.value = false
  }
}

// ========================
// LOGOUT DENGAN KONFIRMASI
// ========================
const showLogoutModal = ref(false)

function openLogoutModal() {
  showLogoutModal.value = true
}

function confirmLogout() {
  showLogoutModal.value = false
  localStorage.removeItem('nmyc_admin_token')
  router.push('/login')
}

// ========================
// MODAL STATE & BODY SCROLL LOCK
// ========================
const showFormModal = ref(false)
const isEditMode = ref(false)
const currentEditId = ref(null)
const isSubmitting = ref(false)
const imageLoadError = ref(false)

const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const isDeleting = ref(false)

// Kunci scroll halaman belakang saat salah satu modal terbuka
watch([showFormModal, showDeleteModal, showLogoutModal], ([isFormOpen, isDeleteOpen, isLogoutOpen]) => {
  if (typeof document !== 'undefined') {
    if (isFormOpen || isDeleteOpen || isLogoutOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const formData = ref({
  title: '',
  category: 'Lomba',
  image: '',
  description: '',
  fullDescription: ''
})

const previewImageUrl = computed(() => {
  return normalizeGitHubUrl(formData.value.image)
})

function handleImageChange() {
  imageLoadError.value = false
  if (formData.value.image && formData.value.image.includes('github.com')) {
    formData.value.image = normalizeGitHubUrl(formData.value.image)
  }
}

function openAddModal() {
  isEditMode.value = false
  currentEditId.value = null
  imageLoadError.value = false
  formData.value = {
    title: '',
    category: 'Lomba',
    image: '',
    description: '',
    fullDescription: ''
  }
  showFormModal.value = true
}

function openEditModal(item) {
  isEditMode.value = true
  currentEditId.value = item.id
  imageLoadError.value = false
  formData.value = {
    title: item.title,
    category: item.category,
    image: item.image,
    description: item.description,
    fullDescription: item.fullDescription || item.description
  }
  showFormModal.value = true
}

async function handleSubmitForm() {
  if (!formData.value.title.trim() || !formData.value.image.trim() || !formData.value.description.trim()) {
    showToast('Mohon lengkapi kolom yang bertanda bintang (*)', 'error')
    return
  }

  isSubmitting.value = true
  try {
    const url = isEditMode.value ? `/api/gallery/${currentEditId.value}` : '/api/gallery'
    const method = isEditMode.value ? 'PUT' : 'POST'

    const payload = {
      ...formData.value,
      image: normalizeGitHubUrl(formData.value.image)
    }

    const res = await fetch(url, {
      method,
      headers: getAuthHeader(),
      body: JSON.stringify(payload)
    })

    const json = await res.json()

    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Gagal menyimpan data kegiatan.')
    }

    showToast(isEditMode.value ? 'Dokumentasi kegiatan berhasil diperbarui!' : 'Dokumentasi kegiatan baru berhasil ditambahkan!')
    showFormModal.value = false
    await fetchGalleries()
  } catch (err) {
    showToast(err.message || 'Terjadi kendala saat menyimpan kegiatan.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

// ========================
// HAPUS KEGIATAN
// ========================
function openDeleteModal(item) {
  itemToDelete.value = item
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (!itemToDelete.value) return

  isDeleting.value = true
  try {
    const res = await fetch(`/api/gallery/${itemToDelete.value.id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    })

    const json = await res.json()

    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Gagal menghapus kegiatan.')
    }

    showToast(`Dokumentasi "${itemToDelete.value.title}" berhasil dihapus.`)
    showDeleteModal.value = false
    itemToDelete.value = null
    await fetchGalleries()
  } catch (err) {
    showToast(err.message || 'Terjadi kendala saat menghapus kegiatan.', 'error')
  } finally {
    isDeleting.value = false
  }
}

// ========================
// INISIALISASI
// ========================
onMounted(async () => {
  const isAuthed = await verifyAuth()
  if (isAuthed) {
    await fetchGalleries()
  }
})
</script>

<style scoped>
/* Transisi Halus Modal */
.modal-smooth-enter-active,
.modal-smooth-leave-active {
  transition: opacity 0.25s ease-out;
}

.modal-smooth-enter-active .modal-backdrop,
.modal-smooth-leave-active .modal-backdrop {
  transition: opacity 0.25s ease-out;
}

.modal-smooth-enter-active .modal-dialog,
.modal-smooth-leave-active .modal-dialog {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease-out;
}

.modal-smooth-enter-from,
.modal-smooth-leave-to {
  opacity: 0;
}

.modal-smooth-enter-from .modal-backdrop,
.modal-smooth-leave-to .modal-backdrop {
  opacity: 0;
}

.modal-smooth-enter-from .modal-dialog,
.modal-smooth-leave-to .modal-dialog {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
