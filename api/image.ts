import { setCorsHeaders } from './lib/utils.js'

export default async function handler(req: any, res: any) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : res.end()
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status ? res.status(405).end() : res.end()
  }

  const urlObj = new URL(req.url || '', `http://${req.headers?.host || 'localhost'}`)
  const rawTargetUrl = req.query?.url || urlObj.searchParams.get('url')
  const width = Math.min(Math.max(parseInt(req.query?.w || urlObj.searchParams.get('w') || '800', 10), 100), 2000)
  const quality = Math.min(Math.max(parseInt(req.query?.q || urlObj.searchParams.get('q') || '80', 10), 20), 100)

  if (!rawTargetUrl || typeof rawTargetUrl !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ success: false, message: 'Parameter url wajib disertakan.' }))
  }

  const targetUrl = rawTargetUrl.trim()
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ success: false, message: 'URL gambar tidak valid.' }))
  }

  // 1. Optimasi Gambar via Cloudflare Edge Resizer (WebP + kompresi ukuran drastis)
  try {
    const optimizerUrl = `https://wsrv.nl/?url=${encodeURIComponent(targetUrl)}&w=${width}&output=webp&q=${quality}`
    const upstreamRes = await fetch(optimizerUrl)

    if (upstreamRes.ok) {
      const buffer = Buffer.from(await upstreamRes.arrayBuffer())
      res.statusCode = 200
      res.setHeader('Content-Type', 'image/webp')
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      return res.end(buffer)
    }
  } catch (err) {
    console.warn('Image optimizer upstream failed, falling back to direct fetch:', err)
  }

  // 2. Fallback Transparan jika layanan optimasi tidak dapat dijangkau (misal saat offline dev)
  try {
    const directRes = await fetch(targetUrl)
    if (directRes.ok) {
      const contentType = directRes.headers.get('content-type') || 'image/jpeg'
      const buffer = Buffer.from(await directRes.arrayBuffer())
      res.statusCode = 200
      res.setHeader('Content-Type', contentType)
      res.setHeader('Cache-Control', 'public, max-age=86400')
      return res.end(buffer)
    }
  } catch (fallbackErr) {
    console.error('Direct image fetch error:', fallbackErr)
  }

  res.statusCode = 502
  res.end('Gagal mengambil gambar dari sumber.')
}
