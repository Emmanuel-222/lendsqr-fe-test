import usersIcon from '../../assets/icons/user1.svg'
import guarantorsIcon from '../../assets/icons/usercheck.svg'
import loansIcon from '../../assets/icons/loan.svg'
import decisionModelsIcon from '../../assets/icons/handshake.svg'
import savingsIcon from '../../assets/icons/piggybank.svg'
import loanRequestsIcon from '../../assets/icons/sack.svg'
import whitelistIcon from '../../assets/icons/usercheck.svg'
import karmaIcon from '../../assets/icons/usertimes.svg'
import organizationIcon from '../../assets/icons/briefcase.svg'
import loanProductsIcon from '../../assets/icons/loan.svg'
import savingsProductsIcon from '../../assets/icons/bank.svg'
import feesChargesIcon from '../../assets/icons/coinmoney.svg'
import transactionsIcon from '../../assets/icons/transactionicon.svg'
import servicesIcon from '../../assets/icons/serviceicon.svg'
import serviceAccountIcon from '../../assets/icons/userserviceacct.svg'
import settlementsIcon from '../../assets/icons/scroll.svg'
import reportsIcon from '../../assets/icons/barchart.svg'
import preferencesIcon from '../../assets/icons/preferenceicon.svg'
import feesPricingIcon from '../../assets/icons/percentbadgeicon.svg'
import auditLogsIcon from '../../assets/icons/auditicon.svg'
import systemsMessagesIcon from '../../assets/icons/tireicon.svg'

export type SidebarItem = {
  label: string
  icon: string
}

export type SidebarSection = {
  title: string
  items: SidebarItem[]
}

export const sidebarSections: SidebarSection[] = [
  {
    title: 'Customers',
    items: [
      { label: 'Users', icon: usersIcon },
      { label: 'Guarantors', icon: guarantorsIcon },
      { label: 'Loans', icon: loansIcon },
      { label: 'Decision Models', icon: decisionModelsIcon },
      { label: 'Savings', icon: savingsIcon },
      { label: 'Loan Requests', icon: loanRequestsIcon },
      { label: 'Whitelist', icon: whitelistIcon },
      { label: 'Karma', icon: karmaIcon },
    ],
  },
  {
    title: 'Businesses',
    items: [
      { label: 'Organization', icon: organizationIcon },
      { label: 'Loan Products', icon: loanProductsIcon },
      { label: 'Savings Products', icon: savingsProductsIcon },
      { label: 'Fees and Charges', icon: feesChargesIcon },
      { label: 'Transactions', icon: transactionsIcon },
      { label: 'Services', icon: servicesIcon },
      { label: 'Service Account', icon: serviceAccountIcon },
      { label: 'Settlements', icon: settlementsIcon },
      { label: 'Reports', icon: reportsIcon },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Preferences', icon: preferencesIcon },
      { label: 'Fees and Pricing', icon: feesPricingIcon },
      { label: 'Audit Logs', icon: auditLogsIcon },
      { label: 'Systems Messages', icon: systemsMessagesIcon },
    ],
  },
]
