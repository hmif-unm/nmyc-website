import { verifyToken } from './jwt.js'

export function authenticateRequest(req: any): boolean {
  const authHeader = req.headers?.authorization || req.headers?.Authorization
  if (!authHeader || typeof authHeader !== 'string') return false

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return false

  const token = parts[1]
  const secret = process.env.JWT_SECRET || 'nmyc-secret-jwt-key-2026-super-secure'
  const result = verifyToken(token, secret)
  return result.valid
}
