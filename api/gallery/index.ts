import { sendJson, setCorsHeaders, parseBody, normalizeGitHubUrl } from '../lib/utils.js'
import { getAllGalleries, getGalleryById, insertGallery, updateGalleryInDb, deleteGalleryFromDb, type GalleryCategory } from '../lib/db.js'
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
      const singleId = req.query?.id || url.searchParams.get('id')

      if (singleId) {
        const idNum = parseInt(String(singleId), 10)
        if (!isNaN(idNum) && idNum > 0) {
          const singleItem = await getGalleryById(idNum)
          if (!singleItem) {
            return sendJson(res, 404, { success: false, message: 'Data galeri tidak ditemukan.' })
          }
          return sendJson(res, 200, { success: true, data: singleItem })
        }
      }

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

  // 2. POST & PUT: Tambah atau Perbarui galeri (Wajib Login Admin)
  if (req.method === 'POST' || req.method === 'PUT') {
    const isAuth = authenticateRequest(req)
    if (!isAuth) {
      return sendJson(res, 401, {
        success: false,
        message: 'Akses ditolak. Silakan login sebagai admin terlebih dahulu.'
      })
    }

    try {
      const body = await parseBody(req)
      const url = new URL(req.url || '', `http://${req.headers?.host || 'localhost'}`)
      const queryId = req.query?.id || url.searchParams.get('id')
      const targetId = parseInt(String(body?.id || queryId || ''), 10)

      // A. Jika ada ID atau method adalah PUT -> UPDATE
      if ((!isNaN(targetId) && targetId > 0) || req.method === 'PUT') {
        const idToUpdate = !isNaN(targetId) && targetId > 0 ? targetId : NaN
        if (isNaN(idToUpdate)) {
          return sendJson(res, 400, {
            success: false,
            message: 'ID galeri harus disertakan untuk memperbarui data.'
          })
        }

        const payload = { ...body }
        if (payload.image) {
          payload.image = normalizeGitHubUrl(payload.image)
        }

        const updated = await updateGalleryInDb(idToUpdate, payload)
        if (!updated) {
          return sendJson(res, 404, {
            success: false,
            message: 'Data galeri tidak ditemukan untuk diperbarui.'
          })
        }

        return sendJson(res, 200, {
          success: true,
          message: 'Data galeri berhasil diperbarui.',
          data: updated
        })
      }

      // B. INSERT data baru
      const { title, category, image, imagePosition, description, fullDescription, createdAt } = body || {}

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
        imagePosition: (imagePosition || 'center').trim(),
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
        message: err.message || 'Gagal menyimpan data galeri.'
      })
    }
  }

  // 3. DELETE: Hapus data galeri
  if (req.method === 'DELETE') {
    const isAuth = authenticateRequest(req)
    if (!isAuth) {
      return sendJson(res, 401, {
        success: false,
        message: 'Akses ditolak. Silakan login sebagai admin terlebih dahulu.'
      })
    }

    try {
      const body = await parseBody(req).catch(() => ({}))
      const url = new URL(req.url || '', `http://${req.headers?.host || 'localhost'}`)
      const queryId = req.query?.id || url.searchParams.get('id')
      const targetId = parseInt(String(body?.id || queryId || ''), 10)

      if (isNaN(targetId) || targetId <= 0) {
        return sendJson(res, 400, {
          success: false,
          message: 'ID galeri harus disertakan untuk menghapus data.'
        })
      }

      const deleted = await deleteGalleryFromDb(targetId)
      if (!deleted) {
        return sendJson(res, 404, {
          success: false,
          message: 'Data galeri tidak ditemukan untuk dihapus.'
        })
      }

      return sendJson(res, 200, {
        success: true,
        message: 'Data galeri berhasil dihapus.'
      })
    } catch (err: any) {
      return sendJson(res, 500, {
        success: false,
        message: err.message || 'Gagal menghapus data galeri.'
      })
    }
  }

  return sendJson(res, 405, { success: false, message: 'Metode tidak diizinkan.' })
}
