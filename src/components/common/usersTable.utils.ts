export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'

export type UserRowFilterTarget = {
  id: string
  org: string
  username: string
  email: string
  phone: string
  dateJoined: string
  status: UserStatus
}

export type UserFilters = {
  org: string
  username: string
  email: string
  date: string
  phone: string
  status: '' | UserStatus
}

export const defaultFilters: UserFilters = {
  org: '',
  username: '',
  email: '',
  date: '',
  phone: '',
  status: '',
}

export const buildPagination = (totalPages: number, currentPage: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages: Array<number | 'ellipsis'> = [1]
  if (currentPage <= 3) {
    pages.push(2, 3, 4, 'ellipsis', totalPages)
    return pages
  }

  if (currentPage >= totalPages - 2) {
    pages.push(
      'ellipsis',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    )
    return pages
  }

  pages.push(
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  )
  return pages
}

const normalize = (value: string) => value.trim().toLowerCase()

const digitsOnly = (value: string) => value.replace(/\D/g, '')

const getIsoDate = (dateJoined: string) => {
  const parsed = new Date(dateJoined)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }
  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const applyFiltersToUsers = (
  rows: UserRowFilterTarget[],
  filters: UserFilters,
) => {
  return rows.filter((row) => {
    if (filters.org && row.org !== filters.org) {
      return false
    }
    if (filters.status && row.status !== filters.status) {
      return false
    }
    if (filters.username && !normalize(row.username).includes(normalize(filters.username))) {
      return false
    }
    if (filters.email && !normalize(row.email).includes(normalize(filters.email))) {
      return false
    }
    if (filters.phone && !digitsOnly(row.phone).includes(digitsOnly(filters.phone))) {
      return false
    }
    if (filters.date && getIsoDate(row.dateJoined) !== filters.date) {
      return false
    }
    return true
  })
}
