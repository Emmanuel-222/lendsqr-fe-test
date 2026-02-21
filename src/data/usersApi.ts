import type { UserRecord } from '../types/users'

const USERS_URL = '/users.json'
let cachedUsers: UserRecord[] | null = null

export const fetchUsers = async (): Promise<UserRecord[]> => {
  if (cachedUsers) {
    return cachedUsers
  }

  const response = await fetch(USERS_URL)
  if (!response.ok) {
    throw new Error(`Failed to load users (${response.status})`)
  }

  const data = (await response.json()) as UserRecord[]
  cachedUsers = data
  return data
}

export const clearUsersCache = () => {
  cachedUsers = null
}
