import { sendJson, setCorsHeaders } from './lib/utils'

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  return sendJson(res, 200, {
    name: 'Nusa Mandiri Youth Choir (NMYC) API',
    status: 'online',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/gallery',
      '/api/auth/login',
      '/api/auth/me',
      '/api/auth/logout'
    ]
  })
}
