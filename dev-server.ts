import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { URL } from 'node:url'

// Import file-based serverless handlers
import healthHandler from './api/health.js'
import loginHandler from './api/auth/login.js'
import meHandler from './api/auth/me.js'
import logoutHandler from './api/auth/logout.js'
import galleryIndexHandler from './api/gallery/index.js'
import galleryItemHandler from './api/gallery/[id].js'
import apiIndexHandler from './api/index.js'

const PORT = Number(process.env.PORT) || 5000
const HOST = process.env.HOST || '0.0.0.0'
const DIST_DIR = path.resolve(process.cwd(), 'dist')

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
}

function enhanceRes(res: http.ServerResponse) {
  const enhanced = res as any
  enhanced.status = function (statusCode: number) {
    res.statusCode = statusCode
    return enhanced
  }
  enhanced.json = function (data: any) {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json')
    }
    res.end(JSON.stringify(data))
    return enhanced
  }
  return enhanced
}

function serveStatic(res: http.ServerResponse, filePath: string) {
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // SPA fallback: kirim index.html jika ada
    const indexPath = path.join(DIST_DIR, 'index.html')
    if (fs.existsSync(indexPath)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      fs.createReadStream(indexPath).pipe(res)
      return
    }
    res.statusCode = 404
    res.end('Not Found')
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  const mime = MIME_TYPES[ext] || 'application/octet-stream'
  res.setHeader('Content-Type', mime)
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer(async (req: http.IncomingMessage, rawRes: http.ServerResponse) => {
  const res = enhanceRes(rawRes)
  const reqUrl = req.url || '/'
  const parsedUrl = new URL(reqUrl, `http://${req.headers.host || 'localhost'}`)
  const pathname = parsedUrl.pathname

  // 1. RUTE API
  if (pathname === '/api/health') {
    return healthHandler(req, res)
  }
  if (pathname === '/api/auth/login') {
    return loginHandler(req, res)
  }
  if (pathname === '/api/auth/me') {
    return meHandler(req, res)
  }
  if (pathname === '/api/auth/logout') {
    return logoutHandler(req, res)
  }

  const galleryItemMatch = pathname.match(/^\/api\/gallery\/([^/]+)$/)
  if (galleryItemMatch) {
    ;(req as any).query = { ...(req as any).query, id: galleryItemMatch[1] }
    return galleryItemHandler(req, res)
  }

  if (pathname === '/api/gallery' || pathname === '/api/gallery/') {
    return galleryIndexHandler(req, res)
  }

  if (pathname === '/api' || pathname === '/api/') {
    return apiIndexHandler(req, res)
  }

  if (pathname.startsWith('/api/')) {
    res.statusCode = 404
    return res.json({ success: false, message: `Endpoint ${pathname} tidak ditemukan.` })
  }

  // 2. STATIC FILES / SPA FALLBACK (dist)
  if (fs.existsSync(DIST_DIR)) {
    const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '')
    const targetFile = safePath === '/' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, safePath)
    return serveStatic(res, targetFile)
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(`
    <h2>NMYC Website Server</h2>
    <p>Frontend belum di-build. Jalankan <code>npm run build</code> atau gunakan <code>npm run frontend:dev</code>.</p>
    <p><a href="/api/health">Cek Health API</a></p>
  `)
})

server.listen(PORT, HOST, () => {
  console.log(`\n🎵 NMYC Server (100% Native Node.js) running at http://${HOST}:${PORT}`)
  console.log(`👉 Web Frontend: http://${HOST}:${PORT}/`)
  console.log(`👉 Health check: http://${HOST}:${PORT}/api/health`)
  console.log(`👉 Gallery API : http://${HOST}:${PORT}/api/gallery`)
  console.log(`👉 Auth API    : http://${HOST}:${PORT}/api/auth/login\n`)
})

export default server
