import { verifyAdminKey } from '../db'

export class UserStore {
  async verifyKey(key: string): Promise<boolean> {
    return verifyAdminKey(key)
  }
}

export const userStore = new UserStore()
