export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'

export type UserEducation = {
  level: string
  employmentStatus: string
  sector: string
  duration: string
  officeEmail: string
  monthlyIncome: string
  loanRepayment: number
}

export type UserSocials = {
  twitter: string
  facebook: string
  instagram: string
}

export type UserGuarantor = {
  fullName: string
  phoneNumber: number
  email: string
  relationship: string
}

export type UserAccount = {
  accountNumber: number
  accountBalance: string
  bankName: string
}

export type UserRecord = {
  id: string
  orgName: string
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  bvn: string
  gender: string
  maritalStatus: string
  children: string
  residenceType: string
  createdAt: string
  status: UserStatus
  education: UserEducation
  socials: UserSocials
  guarantor: UserGuarantor
  account: UserAccount
  tier: number
}
