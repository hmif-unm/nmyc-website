import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
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

// Root & Health check endpoint
app.get('/api', async () => {
    return {
        organization: 'Nusa Mandiri Youth Choir (NMYC)',
        description: 'Official API Service',
        status: 'online',
        version: '1.0.0'
    }
})

app.get('/api/health', async () => {
    return {
        status: 'ok',
        timestamp: new Date().toISOString()
    }
})

// Daftarkan modular routes
app.register(authRoutes, { prefix: '/api/auth' })
app.register(galleryRoutes, { prefix: '/api/gallery' })

// Jalankan HTTP listener jika dijalankan langsung di lokal (bukan di Vercel serverless)
if (process.env.VERCEL !== '1') {
    const PORT = Number(process.env.PORT) || 5000
    const HOST = process.env.HOST || '0.0.0.0'

    app.listen({ port: PORT, host: HOST }, (err, address) => {
        if (err) {
        app.log.error(err)
        process.exit(1)
        }
        console.log(`\n🎵 NMYC Fastify API Server running at: ${address}`)
        console.log(`👉 Health check: ${address}/api/health`)
        console.log(`👉 Gallery API : ${address}/api/gallery`)
        console.log(`👉 Auth API    : ${address}/api/auth/login\n`)
    })
}

export default app
