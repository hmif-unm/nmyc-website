import type { FastifyRequest, FastifyReply } from 'fastify'
import { userStore } from '../data/user.store'

interface LoginBody {
  key?: string
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) {
  const { key } = request.body || {}

  if (!key || typeof key !== 'string' || !key.trim()) {
    return reply.status(400).send({
      success: false,
      message: 'Admin Access Key wajib diisi.'
    })
  }

  const isValid = await userStore.verifyKey(key.trim())
  if (!isValid) {
    return reply.status(401).send({
      success: false,
      message: 'Access Key salah atau tidak valid.'
    })
  }

  // Buat JWT Token berlaku selama 7 hari
  const token = await reply.jwtSign(
    {
      role: 'admin',
      issuedAt: new Date().toISOString()
    },
    { expiresIn: '7d' }
  )

  return reply.send({
    success: true,
    message: 'Login berhasil.',
    token,
    admin: {
      role: 'admin',
      name: 'Administrator NMYC'
    }
  })
}

export async function meHandler(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({
    success: true,
    admin: {
      role: 'admin',
      name: 'Administrator NMYC'
    }
  })
}

export async function logoutHandler(_request: FastifyRequest, reply: FastifyReply) {
  return reply.send({
    success: true,
    message: 'Logout berhasil.'
  })
}
