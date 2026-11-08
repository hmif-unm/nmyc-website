import type { GalleryItem } from '../types'
import {
  getAllGalleries,
  getGalleryById,
  insertGallery,
  updateGalleryInDb,
  deleteGalleryFromDb
} from '../db'

class GalleryStore {
  async getAll(category?: string, search?: string): Promise<GalleryItem[]> {
    return getAllGalleries(category, search)
  }

  async getById(id: number): Promise<GalleryItem | undefined> {
    const item = await getGalleryById(id)
    return item || undefined
  }

  async create(data: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    return insertGallery({
      title: data.title,
      category: data.category,
      image: data.image,
      description: data.description,
      fullDescription: data.fullDescription,
      createdAt: data.createdAt
    })
  }

  async update(id: number, data: Partial<Omit<GalleryItem, 'id'>>): Promise<GalleryItem | null> {
    return updateGalleryInDb(id, data)
  }

  async delete(id: number): Promise<boolean> {
    return deleteGalleryFromDb(id)
  }
}

export const galleryStore = new GalleryStore()
