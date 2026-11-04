import type { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyAdmin(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({
      success: false,
      message: 'Akses ditolak: Token tidak valid atau sudah kadaluarsa.'
    })
  }
}
