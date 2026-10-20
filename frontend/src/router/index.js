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
    { path: '/tentang', name: 'about', component: AboutView },
    { path: '/visi-misi', name: 'vision', component: VisionView },
    { path: '/struktur', name: 'organization', component: OrgView },
    { path: '/galeri', name: 'gallery', component: GalleryView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/admin/dashboard', name: 'dashboard', component: DashboardView },
    // Menangkap semua URL yang tidak terdaftar dan diarahkan ke 404
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ]
})

export default router