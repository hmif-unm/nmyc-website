<template>
  <div class="min-h-screen bg-[#f8f9fa] font-poppins text-gray-800 antialiased selection:bg-primary selection:text-white">
    <!-- ========================================== -->
    <!-- 1. HERO SECTION & FLOATING NAVBAR          -->
    <!-- ========================================== -->
    <header id="hero" class="relative w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-3 sm:pt-5 pb-12 md:pb-20 flex justify-center">
      <!-- Full-Screen Panoramic Banner (W: up to 1860px on wide monitors, H: up to 860px) -->
      <div
        class="relative w-full max-w-[1860px] min-h-[660px] md:min-h-[760px] lg:h-[820px] xl:h-[860px] rounded-t-[60px] sm:rounded-t-[100px] md:rounded-t-[130px] lg:rounded-t-[157px] rounded-b-[24px] md:rounded-b-[40px] overflow-hidden shadow-2xl bg-dark flex flex-col justify-between border border-white/30"
      >
        <!-- Background Choir Photo (Expanded full width) -->
        <img
          :src="heroBg"
          alt="Nusa Mandiri Youth Choir"
          class="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />

        <!-- Soft Purple Gradient Overlay matching Figma exact transparency -->
        <div
          class="absolute inset-0 pointer-events-none"
          style="background: linear-gradient(90deg, rgba(109, 15, 200, 0.70) 0%, rgba(109, 15, 200, 0.38) 49%, rgba(109, 15, 200, 0.04) 85%, transparent 100%);"
        ></div>

        <!-- Floating Frosted Navbar (Group 26 style, centered & scaled) -->
        <div class="relative z-20 pt-7 sm:pt-10 px-4 sm:px-8 w-full flex justify-center">
          <Navbar />
        </div>

        <!-- Hero Content (Single Crisp Text & CTA, expanded max-w for desktop) -->
        <div class="relative z-10 px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 py-12 md:py-20 lg:py-24 max-w-4xl xl:max-w-5xl">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[62px] font-semibold text-white tracking-tight leading-[1.15]"
          >
            Menyatukan Suara<br class="hidden sm:inline" />
            Menghidupkan Harmoni
          </h1>

          <p class="mt-5 lg:mt-7 text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-2xl leading-relaxed font-normal">
            <span class="font-bold text-white">Nusa Mandiri Youth Choir</span> adalah organisasi paduan suara di
            Universitas Nusa Mandiri, wadah mahasiswa untuk menyalurkan kecintaan terhadap musik dan seni vokal.
          </p>

          <div class="mt-8 sm:mt-10 lg:mt-12">
            <a
              href="#kontak"
              class="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white text-primary font-semibold text-sm sm:text-base lg:text-lg shadow-xl hover:bg-light hover:text-dark hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        <!-- Bottom Base Spacer -->
        <div class="relative z-10 h-6"></div>
      </div>
    </header>

    <!-- ========================================== -->
    <!-- 2. ABOUT SECTION ("Apa Itu NMYC?")         -->
    <!-- ========================================== -->
    <section id="about" class="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa] relative overflow-hidden">
      <div class="relative max-w-5xl mx-auto text-center flex flex-col items-center">
        <!-- Center Title -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-4 lg:mb-6">
          Apa Itu NMYC?
        </h2>

        <!-- Quotation Icon (Group 24.png) -->
        <div class="mb-5 lg:mb-6 flex justify-center">
          <img :src="quoteImg" alt="Quote Accent" class="h-6 lg:h-8 object-contain" />
        </div>

        <!-- Description Text -->
        <p class="text-secondary text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-normal max-w-4xl">
          Nusa Mandiri Youth Choir (NMYC) merupakan organisasi paduan suara di Universitas Nusa Mandiri yang menjadi
          wadah bagi mahasiswa untuk menyalurkan kecintaan terhadap musik dan seni vokal.
        </p>

        <!-- Lilac Accent Bar -->
        <div class="mt-8 w-28 h-2 rounded-full bg-light"></div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 3. VISI & MISI SECTION                     -->
    <!-- ========================================== -->
    <section id="visi-misi" class="py-20 md:py-32 px-4 sm:px-8 lg:px-14 bg-primary text-white relative overflow-hidden">
      <div class="relative max-w-6xl xl:max-w-7xl mx-auto space-y-12 lg:space-y-16">
        <!-- CARD 1: Visi -->
        <div
          class="rounded-[24px] md:rounded-[36px] border border-white/20 bg-white/5 backdrop-blur-sm p-8 sm:p-12 md:p-16 lg:p-20 shadow-xl"
        >
          <h3 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-6 lg:mb-8 tracking-wide">
            Visi
          </h3>
          <p class="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl text-center max-w-5xl mx-auto leading-relaxed font-normal">
            “Mewujudkan Nusa Mandiri Youth Choir yang unggul dalam mewadahi minat dan bakat mahasiswa serta membentuk
            paduan suara yang berkualitas, berkembang, dan berprestasi.”
          </p>
        </div>

        <!-- CARD 2: Misi (Sesuai Gambar 1: Tanpa Inner Card, Bersih & Elegan) -->
        <div
          class="rounded-[24px] md:rounded-[36px] border border-white/20 bg-white/5 backdrop-blur-sm p-8 sm:p-12 md:p-16 lg:p-20 shadow-xl"
        >
          <h3 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-12 lg:mb-16 tracking-wide">
            Misi
          </h3>

          <!-- Grid of 4 Mission Statements (01 - 04) - Clean Layout matching Gambar 1 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">
            <div
              v-for="(item, idx) in missions"
              :key="idx"
              class="flex flex-col items-center px-2"
            >
              <!-- Large Number -->
              <span class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 lg:mb-6 block tracking-tight">
                {{ item.number }}
              </span>
              <!-- Statement Text -->
              <p class="text-white text-sm sm:text-base lg:text-[16px] xl:text-[17px] leading-relaxed font-normal text-center">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 4. STRUKTUR ORGANISASI SECTION             -->
    <!-- ========================================== -->
    <section id="struktur" class="py-20 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa] relative overflow-hidden">
      <!-- Radial Gradient Blur Background Elements -->
      <div
        class="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-light/35 blur-[120px] pointer-events-none"
      ></div>
      <div
        class="absolute top-1/2 right-0 w-[560px] h-[560px] rounded-full bg-secondary/20 blur-[140px] pointer-events-none"
      ></div>
      <div
        class="absolute bottom-10 left-1/4 w-[480px] h-[480px] rounded-full bg-light/30 blur-[120px] pointer-events-none"
      ></div>

      <div class="relative max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-4">
            Struktur Organisasi
          </h2>
          <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-primary/80 leading-relaxed">
            Pengurus NMYC periode 2026 - 2027 yang bertugas menggerakkan seluruh kegiatan organisasi, dengan pembagian
            peran dan tanggung jawab yang jelas di setiap bidang.
          </p>
        </div>

        <!-- Hierarchical Cross-Tree Layout matching landing-page full.png -->
        <div class="flex flex-col items-center">
          <!-- 1. KETUA UMUM (Center Top) -->
          <div class="w-full max-w-[408px] z-10">
            <div class="w-full rounded-[16px] bg-[#f8f9fa] border-4 border-primary p-5 shadow-lg relative transition-all duration-300 hover:shadow-xl">
              <!-- Star Icon & Divider -->
              <div class="flex items-center gap-2 mb-2">
                <img :src="starImg" alt="Star" class="w-5 h-5 object-contain" />
              </div>
              <div class="h-0.5 w-full bg-light/60 mb-4"></div>

              <!-- Content -->
              <div class="flex items-center justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <h4 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {{ leader.name }}
                  </h4>
                  <p class="text-base sm:text-lg font-medium text-[#817e85] mt-0.5">
                    {{ leader.role }}
                  </p>
                </div>
                <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden shadow-md bg-white">
                  <img :src="leader.avatar" :alt="leader.name" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <!-- Vertical Connector Line: Ketua -> Wakil -->
          <div class="w-1 h-14 bg-primary"></div>

          <!-- 2. WAKIL KETUA UMUM (Center Middle) -->
          <div class="w-full max-w-[408px] z-10">
            <div class="w-full rounded-[16px] bg-[#f8f9fa] border-4 border-primary p-5 shadow-lg relative transition-all duration-300 hover:shadow-xl">
              <!-- Star Icon & Divider -->
              <div class="flex items-center gap-2 mb-2">
                <img :src="starImg" alt="Star" class="w-5 h-5 object-contain" />
              </div>
              <div class="h-0.5 w-full bg-light/60 mb-4"></div>

              <!-- Content -->
              <div class="flex items-center justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <h4 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {{ viceLeader.name }}
                  </h4>
                  <p class="text-base sm:text-lg font-medium text-[#817e85] mt-0.5">
                    {{ viceLeader.role }}
                  </p>
                </div>
                <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden shadow-md bg-white">
                  <img :src="viceLeader.avatar" :alt="viceLeader.name" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <!-- Vertical Connector Line from Wakil downwards -->
          <div class="w-1 h-14 bg-primary"></div>

          <!-- 3. LEVEL 3: SEKRETARIS 1 (Left) & SEKRETARIS 2 (Right) with Connecting Crossbar -->
          <!-- Desktop Tree Layout -->
          <div class="hidden lg:block relative w-full max-w-[1000px] mx-auto">
            <!-- Full Horizontal Crossbar from Left Card to Right Card -->
            <div class="absolute left-[380px] right-[380px] top-1/2 -translate-y-1/2 h-1 bg-primary z-0"></div>

            <!-- Central Vertical Trunk running straight down between them -->
            <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-primary z-0"></div>

            <div class="flex items-center justify-between relative z-10">
              <!-- Sekretaris 1 -->
              <div class="w-full max-w-[408px]">
                <div class="w-full rounded-[16px] bg-[#f8f9fa] border-4 border-primary p-5 shadow-lg relative transition-all duration-300 hover:shadow-xl">
                  <div class="flex items-center gap-2 mb-2">
                    <img :src="starImg" alt="Star" class="w-5 h-5 object-contain" />
                  </div>
                  <div class="h-0.5 w-full bg-light/60 mb-4"></div>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex-1 min-w-0">
                      <h4 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                        {{ secretary1.name }}
                      </h4>
                      <p class="text-base sm:text-lg font-medium text-[#817e85] mt-0.5">
                        {{ secretary1.role }}
                      </p>
                    </div>
                    <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden shadow-md bg-white">
                      <img :src="secretary1.avatar" :alt="secretary1.name" class="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sekretaris 2 -->
              <div class="w-full max-w-[408px]">
                <div class="w-full rounded-[16px] bg-[#f8f9fa] border-4 border-primary p-5 shadow-lg relative transition-all duration-300 hover:shadow-xl">
                  <div class="flex items-center gap-2 mb-2">
                    <img :src="starImg" alt="Star" class="w-5 h-5 object-contain" />
                  </div>
                  <div class="h-0.5 w-full bg-light/60 mb-4"></div>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex-1 min-w-0">
                      <h4 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                        {{ secretary2.name }}
                      </h4>
                      <p class="text-base sm:text-lg font-medium text-[#817e85] mt-0.5">
                        {{ secretary2.role }}
                      </p>
                    </div>
                    <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden shadow-md bg-white">
                      <img :src="secretary2.avatar" :alt="secretary2.name" class="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile / Tablet Stacked Cards for Sekretaris 1 & 2 -->
          <div class="lg:hidden w-full flex flex-col items-center">
            <!-- Sekretaris 1 -->
            <div class="w-full max-w-[408px]">
              <div class="w-full rounded-[16px] bg-[#f8f9fa] border-4 border-primary p-5 shadow-lg relative">
                <div class="flex items-center gap-2 mb-2">
                  <img :src="starImg" alt="Star" class="w-5 h-5 object-contain" />
                </div>
                <div class="h-0.5 w-full bg-light/60 mb-4"></div>
                <div class="flex items-center justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {{ secretary1.name }}
                    </h4>
                    <p class="text-base sm:text-lg font-medium text-[#817e85] mt-0.5">
                      {{ secretary1.role }}
                    </p>
                  </div>
                  <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden shadow-md bg-white">
                    <img :src="secretary1.avatar" :alt="secretary1.name" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div class="w-1 h-12 bg-primary"></div>

            <!-- Sekretaris 2 -->
            <div class="w-full max-w-[408px]">
              <div class="w-full rounded-[16px] bg-[#f8f9fa] border-4 border-primary p-5 shadow-lg relative">
                <div class="flex items-center gap-2 mb-2">
                  <img :src="starImg" alt="Star" class="w-5 h-5 object-contain" />
                </div>
                <div class="h-0.5 w-full bg-light/60 mb-4"></div>
                <div class="flex items-center justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {{ secretary2.name }}
                    </h4>
                    <p class="text-base sm:text-lg font-medium text-[#817e85] mt-0.5">
                      {{ secretary2.role }}
                    </p>
                  </div>
                  <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden shadow-md bg-white">
                    <img :src="secretary2.avatar" :alt="secretary2.name" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Vertical Connector Line to Bendahara -->
          <div class="w-1 h-14 bg-primary"></div>

          <!-- 4. BENDAHARA (Center Bottom) -->
          <div class="w-full max-w-[408px] z-10">
            <div class="w-full rounded-[16px] bg-[#f8f9fa] border-4 border-primary p-5 shadow-lg relative transition-all duration-300 hover:shadow-xl">
              <!-- Star Icon & Divider -->
              <div class="flex items-center gap-2 mb-2">
                <img :src="starImg" alt="Star" class="w-5 h-5 object-contain" />
              </div>
              <div class="h-0.5 w-full bg-light/60 mb-4"></div>

              <!-- Content -->
              <div class="flex items-center justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <h4 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {{ treasurer.name }}
                  </h4>
                  <p class="text-base sm:text-lg font-medium text-[#817e85] mt-0.5">
                    {{ treasurer.role }}
                  </p>
                </div>
                <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary overflow-hidden shadow-md bg-white">
                  <img :src="treasurer.avatar" :alt="treasurer.name" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 5. FOOTER SECTION                          -->
    <!-- ========================================== -->
    <footer id="kontak" class="pt-16 md:pt-24 pb-10 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-r from-dark to-primary text-white rounded-t-[40px] sm:rounded-t-[60px] relative overflow-hidden shadow-2xl">
      <!-- Ambient light effect -->
      <div class="absolute -bottom-24 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative max-w-[1800px] mx-auto">
        <!-- 4 Columns Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-14 border-b border-white/15">
          <!-- Column 1: Brand Info & Social Media -->
          <div class="space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-md">
                <img :src="logoImg" alt="NMYC Logo" class="w-full h-full object-contain" />
              </div>
              <span class="text-2xl font-bold tracking-wider text-white">NMYC</span>
            </div>

            <p class="text-white/80 text-sm leading-relaxed max-w-xs font-normal">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
                <a href="#hero" class="hover:text-light transition-colors duration-200">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#about" class="hover:text-light transition-colors duration-200">
                  Tentang NMYC
                </a>
              </li>
              <li>
                <a href="#visi-misi" class="hover:text-light transition-colors duration-200">
                  Visi & Misi
                </a>
              </li>
              <li>
                <a href="#struktur" class="hover:text-light transition-colors duration-200">
                  Struktur Organisasi
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3: Kontak Info -->
          <div>
            <h4 class="text-lg font-bold text-white mb-5 tracking-wide">Kontak</h4>
            <ul class="space-y-4 text-sm text-white/80">
              <li class="flex items-start gap-2.5">
                <span>[ Alamat ]</span>
              </li>
              <li class="flex items-center gap-2.5">
                <a href="mailto:email@email.com" class="hover:text-light transition-colors">
                  [ email@email.com ]
                </a>
              </li>
              <li class="flex items-center gap-2.5">
                <a href="tel:0812345678" class="hover:text-light transition-colors">
                  [ 0812345678 ]
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 4: Ada Pertanyaan? / CTA -->
          <div class="space-y-4">
            <h4 class="text-lg font-bold text-white tracking-wide">Ada Pertanyaan?</h4>
            <p class="text-white/80 text-sm leading-relaxed">
              Silahkan Hubungi kami melalui tombol di bawah ini
            </p>
            <div class="pt-2">
              <a
                href="mailto:email@email.com"
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
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'

// Assets import
import heroBg from '@/assets/landing-assets/hero-bg.jpg'
import defaultAvatar from '@/assets/landing-assets/ellipse-20.png'
import starImg from '@/assets/landing-assets/star.png'
import quoteImg from '@/assets/landing-assets/Group 24.png'
import logoImg from '@/assets/landing-assets/logo.png'

// Misi Points (01 - 04) - Exact Text from Figma Gambar 1
const missions = [
  {
    number: '01',
    text: 'Memberikan materi yang berkualitas pada saat latihan untuk meningkatkan musikalitas penyanyi.'
  },
  {
    number: '02',
    text: 'Mengikuti kompetisi kelompok paduan suara pada tingkat regional, nasional, dan internasional.'
  },
  {
    number: '03',
    text: 'Menanamkan nilai kekeluargaan kepada anggota, alumni, pembina, dan pelatih serta menjalin hubungan yang baik dengan seluruh unit kegiatan mahasiswa baik internal maupun eksternal.'
  },
  {
    number: '04',
    text: 'Menciptakan paduan suara yang profesional, berkualitas, dikenal baik, dan berprestasi di kancah nasional dan internasional.'
  }
]

// Structure Members
const leader = {
  name: 'Agil Alexander',
  role: 'Ketua Umum',
  avatar: defaultAvatar
}

const viceLeader = {
  name: 'Agil Alexander',
  role: 'Wakil Ketua Umum',
  avatar: defaultAvatar
}

const secretary1 = {
  name: 'Agil Alexander',
  role: 'Sekretaris 1',
  avatar: defaultAvatar
}

const secretary2 = {
  name: 'Agil Alexander',
  role: 'Sekretaris 2',
  avatar: defaultAvatar
}

const treasurer = {
  name: 'Agil Alexander',
  role: 'Bendahara',
  avatar: defaultAvatar
}

// Social Links
const socialLinks = [
  { name: 'TikTok', url: 'https://tiktok.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'YouTube', url: 'https://youtube.com' }
]
</script>
