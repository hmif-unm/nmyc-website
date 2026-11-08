import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import fs from 'node:fs'
import { ensureDatabase } from './db'
import { authRoutes } from './routes/auth.routes'
import { galleryRoutes } from './routes/gallery.routes'

// Inisialisasi Fastify app
export const app = Fastify({
  trustProxy: true
})

// Daftarkan CORS agar aman dipanggil dari frontend lokal maupun domain Vercel
app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

// Daftarkan JWT untuk autentikasi admin
app.register(jwt, {
  secret: process.env.JWT_SECRET || 'nmyc-secret-key-jwt-2026'
})

// Pastikan koneksi database (Cloudflare D1 atau SQLite) siap saat request masuk
app.addHook('onRequest', async () => {
  await ensureDatabase()
})

// Daftarkan Health Check
const healthHandler = async () => ({
  success: true,
  status: 'ok',
  database: process.env.CLOUDFLARE_DATABASE_ID ? 'Cloudflare D1' : 'SQLite Lokal',
  timestamp: new Date().toISOString()
})
app.get('/api/health', healthHandler)
app.get('/health', healthHandler)

// Daftarkan modular routes API (dengan prefix /api dan tanpa prefix agar kompatibel dengan berbagai rewrite Vercel)
app.register(authRoutes, { prefix: '/api/auth' })
app.register(authRoutes, { prefix: '/auth' })
app.register(galleryRoutes, { prefix: '/api/gallery' })
app.register(galleryRoutes, { prefix: '/gallery' })

// Serve Frontend dari folder dist/ saat dijalankan sebagai standalone server (Local / Docker)
const distPath = path.resolve(process.cwd(), 'dist')

if (process.env.VERCEL !== '1' && fs.existsSync(distPath)) {
  app.register(fastifyStatic, {
    root: distPath,
    prefix: '/',
    wildcard: false
  })
}

// 404 Handler
app.setNotFoundHandler(async (request, reply) => {
  const isApi = request.raw.url && (request.raw.url.startsWith('/api') || request.raw.url.startsWith('/auth') || request.raw.url.startsWith('/gallery'))
  
  if (isApi || process.env.VERCEL === '1' || !fs.existsSync(distPath)) {
    return reply.status(404).send({
      success: false,
      message: `Endpoint ${request.raw.url} tidak ditemukan.`
    })
  }

  // SPA Fallback untuk standalone server lokal
  return reply.sendFile('index.html')
})

// Jalankan HTTP listener jika dijalankan langsung (bukan saat di-import oleh serverless/test)
const isMainModule = typeof Bun !== 'undefined'
  ? import.meta.main
  : (Boolean(process.argv[1]) && (process.argv[1].endsWith('server.ts') || process.argv[1].endsWith('server.js')))

if (process.env.VERCEL !== '1' && isMainModule) {
  const PORT = Number(process.env.PORT) || 5000
  const HOST = process.env.HOST || '0.0.0.0'

  app.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log(`\n🎵 NMYC Web & API Server running at: ${address}`)
    console.log(`👉 Web Frontend: ${address}/`)
    console.log(`👉 Health check: ${address}/api/health`)
    console.log(`👉 Gallery API : ${address}/api/gallery`)
    console.log(`👉 Auth API    : ${address}/api/auth/login\n`)
  })
}

export default app
