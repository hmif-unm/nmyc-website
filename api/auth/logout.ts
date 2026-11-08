import { sendJson, setCorsHeaders } from '../lib/utils'

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  return sendJson(res, 200, {
    success: true,
    message: 'Logout berhasil.'
  })
}
