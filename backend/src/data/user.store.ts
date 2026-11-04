import type { AdminUser } from '../types'

export interface UserCredential {
  user: AdminUser
  passwordHash: string
}

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr_admin_1',
  username: process.env.ADMIN_USERNAME || 'admin',
  name: 'Admin NMYC',
  role: 'superadmin'
}

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'nmyc2026'

export class UserStore {
  getAdmin(): AdminUser {
    return {
      ...DEFAULT_ADMIN,
      username: process.env.ADMIN_USERNAME || 'admin'
    }
  }

  verifyCredentials(username: string, password: string): AdminUser | null {
    const adminUser = this.getAdmin()
    const validPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD

    if (username === adminUser.username && password === validPassword) {
      return adminUser
    }
    return null
  }
}

export const userStore = new UserStore()
