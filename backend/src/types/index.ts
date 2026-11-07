export type GalleryCategory = 'Lomba' | 'Penampilan' | 'Latihan' | 'Kegiatan'

export interface GalleryItem {
  id: number
  title: string
  category: GalleryCategory
  image: string
  description: string
  fullDescription: string
  createdAt?: string
  updatedAt?: string
}

export interface AdminUser {
  id: string
  username: string
  name: string
  role: 'admin' | 'superadmin'
}
