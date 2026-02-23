import type { UserRecord } from '../../types/users'

const normalize = (value: string) => value.trim().toLowerCase()

const matchesSearch = (user: UserRecord, query: string) => {
  const term = normalize(query)
  if (!term) {
    return true
  }

  const fields = [
    user.orgName,
    user.userName,
    user.fullName,
    user.email,
    user.phoneNumber,
    user.bvn,
    user.status,
  ]

  return fields.some((field) => normalize(String(field)).includes(term))
}

export const filterUsersBySearch = (users: UserRecord[], query: string) => {
  return users.filter((user) => matchesSearch(user, query))
}
