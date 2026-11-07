import { verifyAdminKey } from '../db'

export class UserStore {
  verifyKey(key: string): boolean {
    return verifyAdminKey(key)
  }
}

export const userStore = new UserStore()
