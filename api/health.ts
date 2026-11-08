import { sendJson, setCorsHeaders } from './lib/utils'
import { isCloudflareD1Configured } from './lib/db'

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  return sendJson(res, 200, {
    success: true,
    status: 'ok',
    database: isCloudflareD1Configured() ? 'Cloudflare D1' : 'SQLite Lokal',
    timestamp: new Date().toISOString()
  })
}
