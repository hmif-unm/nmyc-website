import { sendJson, setCorsHeaders } from '../lib/utils'
import { authenticateRequest } from '../lib/auth'

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  const isAuthenticated = authenticateRequest(req)
  if (!isAuthenticated) {
    return sendJson(res, 401, {
      success: false,
      message: 'Sesi login tidak valid atau telah berakhir.'
    })
  }

  return sendJson(res, 200, {
    success: true,
    admin: {
      role: 'admin',
      name: 'Administrator NMYC'
    }
  })
}
