import type { FastifyRequest, FastifyReply } from 'fastify'
import { galleryStore } from '../data/gallery.store'
import type { GalleryCategory } from '../types'

interface GetGalleryQuery {
  category?: string
  search?: string
}

interface GalleryParams {
  id: string
}

interface GalleryBody {
  title: string
  category: GalleryCategory
  image: string
  description: string
  fullDescription?: string
  createdAt?: string
}

// Otomatis ubah link GitHub (blob / web view) menjadi direct image URL
function normalizeGitHubUrl(url?: string): string {
  if (!url || typeof url !== 'string') return ''
  const cleanUrl = url.trim()

  const githubBlobRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i
  const matchBlob = cleanUrl.match(githubBlobRegex)
  if (matchBlob) {
    return `https://raw.githubusercontent.com/${matchBlob[1]}/${matchBlob[2]}/${matchBlob[3]}/${matchBlob[4]}`
  }

  const githubRawRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)$/i
  const matchRaw = cleanUrl.match(githubRawRegex)
  if (matchRaw) {
    return `https://raw.githubusercontent.com/${matchRaw[1]}/${matchRaw[2]}/${matchRaw[3]}/${matchRaw[4]}`
  }

  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('/')) {
    return `https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/${cleanUrl}`
  }

  return cleanUrl
}

export async function getGalleriesHandler(
  request: FastifyRequest<{ Querystring: GetGalleryQuery }>,
  reply: FastifyReply
) {
  const { category, search } = request.query
  const items = galleryStore.getAll(category, search)

  return reply.send({
    success: true,
    total: items.length,
    data: items
  })
}

export async function getGalleryByIdHandler(
  request: FastifyRequest<{ Params: GalleryParams }>,
  reply: FastifyReply
) {
  const id = parseInt(request.params.id, 10)
  if (isNaN(id)) {
    return reply.status(400).send({
      success: false,
      message: 'ID galeri harus berupa angka valid.'
    })
  }

  const item = galleryStore.getById(id)
  if (!item) {
    return reply.status(404).send({
      success: false,
      message: 'Data galeri tidak ditemukan.'
    })
  }

  return reply.send({
    success: true,
    data: item
  })
}

export async function createGalleryHandler(
  request: FastifyRequest<{ Body: GalleryBody }>,
  reply: FastifyReply
) {
  const { title, category, image, description, fullDescription, createdAt } = request.body || {}

  if (!title || !category || !image || !description) {
    return reply.status(400).send({
      success: false,
      message: 'Field title, category, image, dan description wajib diisi.'
    })
  }

  const validCategories: GalleryCategory[] = ['Lomba', 'Penampilan', 'Latihan', 'Kegiatan']
  if (!validCategories.includes(category)) {
    return reply.status(400).send({
      success: false,
      message: `Kategori tidak valid. Pilihan: ${validCategories.join(', ')}`
    })
  }

  const newItem = galleryStore.create({
    title: title.trim(),
    category,
    image: normalizeGitHubUrl(image),
    description: description.trim(),
    fullDescription: (fullDescription || description).trim(),
    ...(createdAt ? { createdAt } : {})
  })

  return reply.status(201).send({
    success: true,
    message: 'Data galeri berhasil ditambahkan.',
    data: newItem
  })
}

export async function updateGalleryHandler(
  request: FastifyRequest<{ Params: GalleryParams; Body: Partial<GalleryBody> }>,
  reply: FastifyReply
) {
  const id = parseInt(request.params.id, 10)
  if (isNaN(id)) {
    return reply.status(400).send({
      success: false,
      message: 'ID galeri harus berupa angka valid.'
    })
  }

  const payload = { ...request.body }
  if (payload.image) {
    payload.image = normalizeGitHubUrl(payload.image)
  }

  const updatedItem = galleryStore.update(id, payload)
  if (!updatedItem) {
    return reply.status(404).send({
      success: false,
      message: 'Data galeri tidak ditemukan untuk diperbarui.'
    })
  }

  return reply.send({
    success: true,
    message: 'Data galeri berhasil diperbarui.',
    data: updatedItem
  })
}

export async function deleteGalleryHandler(
  request: FastifyRequest<{ Params: GalleryParams }>,
  reply: FastifyReply
) {
  const id = parseInt(request.params.id, 10)
  if (isNaN(id)) {
    return reply.status(400).send({
      success: false,
      message: 'ID galeri harus berupa angka valid.'
    })
  }

  const isDeleted = galleryStore.delete(id)
  if (!isDeleted) {
    return reply.status(404).send({
      success: false,
      message: 'Data galeri tidak ditemukan untuk dihapus.'
    })
  }

  return reply.send({
    success: true,
    message: `Galeri #${id} berhasil dihapus.`
  })
}
