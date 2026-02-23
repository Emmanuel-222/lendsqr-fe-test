import { describe, expect, it } from 'vitest'
import {
  applyFiltersToUsers,
  buildPagination,
  defaultFilters,
  type UserRowFilterTarget,
} from './usersTable.utils'

const rows: UserRowFilterTarget[] = [
  {
    id: '1',
    org: 'Lendsqr',
    username: 'grace123',
    email: 'grace@mail.com',
    phone: '07060780922',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Active',
  },
  {
    id: '2',
    org: 'Irorun',
    username: 'tosin101',
    email: 'tosin@mail.com',
    phone: '08060309022',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  },
]

describe('buildPagination', () => {
  it('returns full page list when total pages is small', () => {
    expect(buildPagination(5, 2)).toEqual([1, 2, 3, 4, 5])
  })

  it('returns ellipsis pagination for large page sets', () => {
    expect(buildPagination(20, 10)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20])
  })
})

describe('applyFiltersToUsers', () => {
  it('returns all rows for empty filters', () => {
    expect(applyFiltersToUsers(rows, defaultFilters)).toHaveLength(2)
  })

  it('filters by multiple criteria using AND logic', () => {
    const result = applyFiltersToUsers(rows, {
      ...defaultFilters,
      org: 'Lendsqr',
      status: 'Active',
      username: 'grace',
    })
    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('1')
  })

  it('returns no rows for non-matching filters', () => {
    const result = applyFiltersToUsers(rows, {
      ...defaultFilters,
      email: 'unknown',
    })
    expect(result).toHaveLength(0)
  })
})
