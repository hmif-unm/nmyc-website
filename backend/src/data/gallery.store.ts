import type { GalleryItem } from '../types'
import {
  getAllGalleries,
  getGalleryById,
  insertGallery,
  updateGalleryInDb,
  deleteGalleryFromDb
} from '../db'

class GalleryStore {
  getAll(category?: string, search?: string): GalleryItem[] {
    return getAllGalleries(category, search)
  }

  getById(id: number): GalleryItem | undefined {
    const item = getGalleryById(id)
    return item || undefined
  }

  create(data: Omit<GalleryItem, 'id'>): GalleryItem {
    return insertGallery({
      title: data.title,
      category: data.category,
      image: data.image,
      description: data.description,
      fullDescription: data.fullDescription,
      createdAt: data.createdAt
    })
  }

  update(id: number, data: Partial<Omit<GalleryItem, 'id'>>): GalleryItem | null {
    return updateGalleryInDb(id, data)
  }

  delete(id: number): boolean {
    return deleteGalleryFromDb(id)
  }
}

export const galleryStore = new GalleryStore()
