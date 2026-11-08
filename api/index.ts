import type { IncomingMessage, ServerResponse } from 'node:http'
import app from '../backend/src/server'

// Entry point Serverless Function untuk Vercel
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Normalisasi URL jika Vercel melakukan internal rewrite
  const forwardedUrl = (req.headers['x-forwarded-uri'] || req.headers['x-matched-path']) as string | undefined
  if (forwardedUrl && typeof forwardedUrl === 'string' && (forwardedUrl.startsWith('/api') || forwardedUrl.startsWith('/auth') || forwardedUrl.startsWith('/gallery'))) {
    req.url = forwardedUrl
  } else if (req.url && (req.url.startsWith('/api/index.ts') || req.url.startsWith('/api/index'))) {
    req.url = req.url.replace(/^\/api\/index(\.ts)?/, '/api') || '/api'
  }

  await app.ready()
  app.server.emit('request', req, res)
}
