import { describe, expect, it } from 'vitest'
import type { UserRecord } from '../../types/users'
import { filterUsersBySearch } from './dashboardSearch.utils'

const users: UserRecord[] = [
  {
    id: '1',
    orgName: 'Lendsqr',
    userName: 'grace123',
    fullName: 'Grace Effiom',
    email: 'grace@lendsqr.com',
    phoneNumber: '07060780922',
    bvn: '12345678901',
    gender: 'Female',
    maritalStatus: 'Single',
    children: 'None',
    residenceType: 'Parent Apartment',
    createdAt: 'Apr 10, 2020 10:00 AM',
    status: 'Active',
    education: {
      level: 'B.Sc',
      employmentStatus: 'Employed',
      sector: 'FinTech',
      duration: '2 years',
      officeEmail: 'grace@lendsqr.com',
      monthlyIncome: '10000-20000',
      loanRepayment: 1000,
    },
    socials: {
      twitter: '@grace',
      facebook: 'Grace',
      instagram: '@grace',
    },
    guarantor: {
      fullName: 'Debby',
      phoneNumber: 7000000000,
      email: 'debby@mail.com',
      relationship: 'Sister',
    },
    account: {
      accountNumber: 1234567890,
      accountBalance: '10000',
      bankName: 'GTB',
    },
    tier: 2,
  },
  {
    id: '2',
    orgName: 'Irorun',
    userName: 'tosin101',
    fullName: 'Tosin Dokunmu',
    email: 'tosin@mail.com',
    phoneNumber: '08060309022',
    bvn: '98765432100',
    gender: 'Male',
    maritalStatus: 'Single',
    children: 'None',
    residenceType: 'Rented',
    createdAt: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
    education: {
      level: 'B.Sc',
      employmentStatus: 'Employed',
      sector: 'FinTech',
      duration: '2 years',
      officeEmail: 'tosin@mail.com',
      monthlyIncome: '10000-20000',
      loanRepayment: 1000,
    },
    socials: {
      twitter: '@tosin',
      facebook: 'Tosin',
      instagram: '@tosin',
    },
    guarantor: {
      fullName: 'Debby',
      phoneNumber: 7000000000,
      email: 'debby@mail.com',
      relationship: 'Sister',
    },
    account: {
      accountNumber: 1234567890,
      accountBalance: '10000',
      bankName: 'GTB',
    },
    tier: 2,
  },
]

describe('filterUsersBySearch', () => {
  it('returns matching users for case-insensitive query', () => {
    expect(filterUsersBySearch(users, 'grace')).toHaveLength(1)
    expect(filterUsersBySearch(users, 'grace')[0]?.id).toBe('1')
  })

  it('matches across status and bvn fields', () => {
    expect(filterUsersBySearch(users, 'pending')).toHaveLength(1)
    expect(filterUsersBySearch(users, '987654')).toHaveLength(1)
  })

  it('returns all users for empty query and none for unknown query', () => {
    expect(filterUsersBySearch(users, '')).toHaveLength(2)
    expect(filterUsersBySearch(users, 'does-not-exist')).toHaveLength(0)
  })
})
