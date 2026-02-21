import type { UserRecord } from '../types/users'

const STORAGE_KEY = 'userDetails'

const readStore = (): Record<string, UserRecord> => {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {}
    }
    const parsed = JSON.parse(raw) as Record<string, UserRecord>
    return parsed ?? {}
  } catch {
    return {}
  }
}

const writeStore = (store: Record<string, UserRecord>) => {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export const getUser = (id: string): UserRecord | null => {
  if (!id) {
    return null
  }
  const store = readStore()
  return store[id] ?? null
}

export const setUser = (user: UserRecord) => {
  if (!user?.id) {
    return
  }
  const store = readStore()
  store[user.id] = user
  writeStore(store)
}
