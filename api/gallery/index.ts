import { sendJson, setCorsHeaders, parseBody, normalizeGitHubUrl } from '../lib/utils.js'
import { getAllGalleries, insertGallery, type GalleryCategory } from '../lib/db.js'
import { authenticateRequest } from '../lib/auth.js'

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  // 1. GET: Ambil daftar galeri
  if (req.method === 'GET') {
    try {
      const url = new URL(req.url || '', `http://${req.headers?.host || 'localhost'}`)
      const category = req.query?.category || url.searchParams.get('category') || undefined
      const search = req.query?.search || url.searchParams.get('search') || undefined

      const items = await getAllGalleries(category, search)
      return sendJson(res, 200, {
        success: true,
        total: items.length,
        data: items
      })
    } catch (err: any) {
      return sendJson(res, 500, {
        success: false,
        message: err.message || 'Gagal mengambil data galeri.'
      })
    }
  }

  // 2. POST: Tambah galeri baru (Wajib Login Admin)
  if (req.method === 'POST') {
    const isAuth = authenticateRequest(req)
    if (!isAuth) {
      return sendJson(res, 401, {
        success: false,
        message: 'Akses ditolak. Silakan login sebagai admin terlebih dahulu.'
      })
    }

    try {
      const body = await parseBody(req)
      const { title, category, image, description, fullDescription, createdAt } = body || {}

      if (!title || !category || !image || !description) {
        return sendJson(res, 400, {
          success: false,
          message: 'Kolom judul, kategori, tautan foto, dan deskripsi singkat wajib diisi.'
        })
      }

      const validCategories: GalleryCategory[] = ['Lomba', 'Penampilan', 'Latihan', 'Kegiatan']
      if (!validCategories.includes(category)) {
        return sendJson(res, 400, {
          success: false,
          message: `Kategori tidak valid. Pilihan: ${validCategories.join(', ')}`
        })
      }

      const newItem = await insertGallery({
        title: title.trim(),
        category,
        image: normalizeGitHubUrl(image),
        description: description.trim(),
        fullDescription: (fullDescription || description).trim(),
        ...(createdAt ? { createdAt } : {})
      })

      return sendJson(res, 201, {
        success: true,
        message: 'Data galeri berhasil ditambahkan.',
        data: newItem
      })
    } catch (err: any) {
      return sendJson(res, 500, {
        success: false,
        message: err.message || 'Gagal menambahkan data galeri.'
      })
    }
  }

  return sendJson(res, 405, { success: false, message: 'Metode tidak diizinkan.' })
}
