import type { FastifyPluginAsync } from 'fastify'
import {
  getGalleriesHandler,
  getGalleryByIdHandler,
  createGalleryHandler,
  updateGalleryHandler,
  deleteGalleryHandler
} from '../controllers/gallery.controller'
import { verifyAdmin } from '../middleware/auth'

export const galleryRoutes: FastifyPluginAsync = async (fastify) => {
  // Public: Ambil semua data galeri (support query ?category=...&search=...)
  fastify.get('/', getGalleriesHandler)

  // Public: Ambil detail 1 item galeri berdasarkan ID
  fastify.get('/:id', getGalleryByIdHandler)

  // Protected: Tambah galeri baru (harus login admin)
  fastify.post('/', { preHandler: [verifyAdmin] }, createGalleryHandler)

  // Protected: Update data galeri (harus login admin)
  fastify.put('/:id', { preHandler: [verifyAdmin] }, updateGalleryHandler)

  // Protected: Hapus galeri (harus login admin)
  fastify.delete('/:id', { preHandler: [verifyAdmin] }, deleteGalleryHandler)
}
