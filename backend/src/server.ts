import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import fs from 'node:fs'
import './db'
import { authRoutes } from './routes/auth.routes'
import { galleryRoutes } from './routes/gallery.routes'

// Inisialisasi Fastify app
export const app = Fastify({
  logger: process.env.NODE_ENV !== 'production'
})

// Daftarkan CORS agar aman dipanggil dari frontend lokal maupun domain Vercel
app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

// Daftarkan JWT untuk autentikasi admin
app.register(jwt, {
  secret: process.env.JWT_SECRET || 'nmyc-youth-choir-secret-token-key-2026'
})

// Daftarkan modular routes API
app.get('/api/health', async () => ({ success: true, status: 'ok', timestamp: new Date().toISOString() }))
app.register(authRoutes, { prefix: '/api/auth' })
app.register(galleryRoutes, { prefix: '/api/gallery' })

// Serve Frontend dari folder dist/ jika tersedia (Production / Serve mode)
const distPath = path.resolve(process.cwd(), 'dist')

if (fs.existsSync(distPath)) {
  app.register(fastifyStatic, {
    root: distPath,
    prefix: '/',
    wildcard: false
  })

  // SPA Fallback: Rute frontend (seperti /galeri, /login) diarahkan ke index.html
  app.setNotFoundHandler(async (request, reply) => {
    if (request.raw.url && request.raw.url.startsWith('/api')) {
      return reply.status(404).send({
        success: false,
        message: `Endpoint ${request.raw.url} tidak ditemukan.`
      })
    }
    return reply.sendFile('index.html')
  })
}

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
