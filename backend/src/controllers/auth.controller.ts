import type { FastifyRequest, FastifyReply } from 'fastify'
import { userStore } from '../data/user.store'

interface LoginBody {
  username?: string
  password?: string
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) {
  const { username, password } = request.body || {}

  if (!username || !password) {
    return reply.status(400).send({
      success: false,
      message: 'Username dan password wajib diisi.'
    })
  }

  const user = userStore.verifyCredentials(username.trim(), password)
  if (!user) {
    return reply.status(401).send({
      success: false,
      message: 'Username atau password salah.'
    })
  }

  // Buat JWT Token berlaku selama 7 hari
  const token = await reply.jwtSign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    { expiresIn: '7d' }
  )

  return reply.send({
    success: true,
    message: 'Login berhasil.',
    token,
    user
  })
}

export async function meHandler(request: FastifyRequest, reply: FastifyReply) {
  const jwtPayload = request.user as { id: string; username: string; role: string }
  const admin = userStore.getAdmin()

  return reply.send({
    success: true,
    user: {
      ...admin,
      ...jwtPayload
    }
  })
}
