import type { FastifyPluginAsync } from 'fastify'
import { loginHandler, meHandler } from '../controllers/auth.controller'
import { verifyAdmin } from '../middleware/auth'

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Public: Login admin
  fastify.post('/login', loginHandler)

  // Protected: Profil admin yang sedang login
  fastify.get('/me', { preHandler: [verifyAdmin] }, meHandler)
}
