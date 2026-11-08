import { sendJson, setCorsHeaders, parseBody } from '../lib/utils'
import { verifyAdminKey } from '../lib/db'
import { signToken } from '../lib/jwt'

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, message: 'Metode tidak diizinkan.' })
  }

  const body = await parseBody(req)
  const { key } = body || {}

  if (!key || typeof key !== 'string' || !key.trim()) {
    return sendJson(res, 400, {
      success: false,
      message: 'Admin Access Key wajib diisi.'
    })
  }

  const isValid = await verifyAdminKey(key.trim())
  if (!isValid) {
    return sendJson(res, 401, {
      success: false,
      message: 'Access Key salah atau tidak valid.'
    })
  }

  const secret = process.env.JWT_SECRET || 'nmyc-secret-jwt-key-2026-super-secure'
  const token = signToken(
    {
      role: 'admin',
      name: 'Administrator NMYC',
      issuedAt: new Date().toISOString()
    },
    secret,
    7 * 24 * 3600
  )

  return sendJson(res, 200, {
    success: true,
    message: 'Login berhasil.',
    token,
    admin: {
      role: 'admin',
      name: 'Administrator NMYC'
    }
  })
}
