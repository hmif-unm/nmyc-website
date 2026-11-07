import type { FastifyPluginAsync } from 'fastify'
import { loginHandler, meHandler, logoutHandler } from '../controllers/auth.controller'
import { verifyAdmin } from '../middleware/auth'

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Public: Login admin dengan key
  fastify.post('/login', loginHandler)

  // Public/Protected: Logout
  fastify.post('/logout', logoutHandler)

  // Protected: Profil / validasi token admin yang sedang login
  fastify.get('/me', { preHandler: [verifyAdmin] }, meHandler)
}
