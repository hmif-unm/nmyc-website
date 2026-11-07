import { createRouter, createWebHistory } from 'vue-router'

// Import halaman publik
import HomeView from '../views/public/HomeView.vue'
import AboutView from '../views/public/AboutView.vue'
import VisionView from '../views/public/VisionView.vue'
import OrgView from '../views/public/OrgView.vue'
import GalleryView from '../views/public/GalleryView.vue'
import NotFoundView from '../views/public/NotFoundView.vue'

// Import halaman admin
import LoginView from '../views/admin/LoginView.vue'
import DashboardView from '../views/admin/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/tentang', redirect: '/#about' },
    { path: '/visi-misi', redirect: '/#visi-misi' },
    { path: '/struktur', redirect: '/#struktur' },
    { path: '/galeri', name: 'gallery', component: GalleryView },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    // Menangkap semua URL yang tidak terdaftar dan diarahkan ke 404
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise((resolve) => {
        const check = (tries = 0) => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({ el: to.hash, behavior: 'smooth', top: 20 })
          } else if (tries < 10) {
            setTimeout(() => check(tries + 1), 60)
          } else {
            resolve({ top: 0, behavior: 'smooth' })
          }
        }
        setTimeout(() => check(0), 80)
      })
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation Guard untuk Autentikasi Admin
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('nmyc_admin_token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else if (to.name === 'login' && token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
