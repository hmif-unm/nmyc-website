import { sendJson, setCorsHeaders, parseBody, normalizeGitHubUrl } from '../lib/utils.js'
import { getGalleryById, updateGalleryInDb, deleteGalleryFromDb } from '../lib/db.js'
import { authenticateRequest } from '../lib/auth.js'

function extractId(req: any): number {
  if (req.query?.id) {
    return parseInt(String(req.query.id), 10)
  }
  const match = (req.url || '').match(/\/api\/gallery\/([^/?#]+)/)
  if (match) {
    return parseInt(match[1], 10)
  }
  return NaN
}

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  const id = extractId(req)
  if (isNaN(id) || id <= 0) {
    return sendJson(res, 400, {
      success: false,
      message: 'ID galeri harus berupa angka valid.'
    })
  }

  // 1. GET: Detail galeri berdasarkan ID
  if (req.method === 'GET') {
    try {
      const item = await getGalleryById(id)
      if (!item) {
        return sendJson(res, 404, {
          success: false,
          message: 'Data galeri tidak ditemukan.'
        })
      }

      return sendJson(res, 200, {
        success: true,
        data: item
      })
    } catch (err: any) {
      return sendJson(res, 500, {
        success: false,
        message: err.message || 'Gagal mengambil data galeri.'
      })
    }
  }

  // 2. PUT: Perbarui data galeri (Wajib Login Admin)
  if (req.method === 'PUT') {
    const isAuth = authenticateRequest(req)
    if (!isAuth) {
      return sendJson(res, 401, {
        success: false,
        message: 'Akses ditolak. Silakan login sebagai admin terlebih dahulu.'
      })
    }

    try {
      const body = await parseBody(req)
      const payload = { ...body }
      if (payload.image) {
        payload.image = normalizeGitHubUrl(payload.image)
      }

      const updated = await updateGalleryInDb(id, payload)
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
    } catch (err: any) {
      return sendJson(res, 500, {
        success: false,
        message: err.message || 'Gagal memperbarui data galeri.'
      })
    }
  }

  // 3. DELETE: Hapus data galeri (Wajib Login Admin)
  if (req.method === 'DELETE') {
    const isAuth = authenticateRequest(req)
    if (!isAuth) {
      return sendJson(res, 401, {
        success: false,
        message: 'Akses ditolak. Silakan login sebagai admin terlebih dahulu.'
      })
    }

    try {
      const isDeleted = await deleteGalleryFromDb(id)
      if (!isDeleted) {
        return sendJson(res, 404, {
          success: false,
          message: 'Data galeri tidak ditemukan untuk dihapus.'
        })
      }

      return sendJson(res, 200, {
        success: true,
        message: `Galeri #${id} berhasil dihapus.`
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
