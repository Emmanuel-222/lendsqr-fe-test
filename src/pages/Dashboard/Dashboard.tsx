import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import logo from '../../assets/images/logo.svg'
import briefcaseIcon from '../../assets/icons/briefcase.svg'
import arrowDownIcon from '../../assets/icons/arrowdown.svg'
import homeIcon from '../../assets/icons/home.svg'
import usersIcon from '../../assets/icons/user1.svg'
import activeUsersIcon from '../../assets/icons/activeusers.svg'
import usersWithLoansIcon from '../../assets/icons/userswithloans.svg'
import usersWithSavingsIcon from '../../assets/icons/userswithsavings.svg'
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
import logoutIcon from '../../assets/icons/logout.svg'
import searchIcon from '../../assets/icons/searchicon.svg'
import notificationBellIcon from '../../assets/icons/notifcationbellicon.svg'
import profilePic from '../../assets/images/profilepics.png'
import UsersTable from '../../components/common/UsersTable'

const stats = [
  { label: 'Users', value: '2,453', icon: usersIcon, tone: 'pink' },
  {
    label: 'Active Users',
    value: '2,453',
    icon: activeUsersIcon,
    tone: 'purple',
  },
  {
    label: 'Users with Loans',
    value: '12,453',
    icon: usersWithLoansIcon,
    tone: 'orange',
  },
  {
    label: 'Users with Savings',
    value: '102,453',
    icon: usersWithSavingsIcon,
    tone: 'red',
  },
]

const users = [
  {
    org: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phone: '08079807321',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Inactive',
  },
  {
    org: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby@irorun.com',
    phone: '08107680928',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  },
  {
    org: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phone: '07063578921',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  },
  {
    org: 'Lendsqr',
    username: 'Toisin Dokunmu',
    email: 'toisin@lendsqr.com',
    phone: '08068789000',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  },
  {
    org: 'Lendsqr',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phone: '07067380922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  {
    org: 'Lendsqr',
    username: 'Toisin Dokunmu',
    email: 'toisin@lendsqr.com',
    phone: '07068708900',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  },
  {
    org: 'Lendsqr',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phone: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Inactive',
  },
  {
    org: 'Lendsqr',
    username: 'Toisin Dokunmu',
    email: 'toisin@lendsqr.com',
    phone: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
]

const sidebarSections = [
  {
    title: 'Customers',
    items: [
      { label: 'Users', icon: usersIcon, isActive: true },
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

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('Users')

  const sectionItems = useMemo(() => {
    return sidebarSections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        isActive: item.label === activeItem,
      })),
    }))
  }, [activeItem])

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.logoRow}>
          <img className={styles.logoImg} src={logo} alt="Lendsqr logo" />
        </div>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            placeholder="Search for anything"
          />
          <button className={styles.searchBtn} type="button">
            <img src={searchIcon} alt="search icon" />
          </button>
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.docs} type="button">
            Docs
          </button>
          <button className={styles.iconButton} type="button">
            <img src={notificationBellIcon} alt="Notifications" />
          </button>
          <div className={styles.profile}>
            <img className={styles.profilePic} src={profilePic} alt="Adedeji" />
            <span className={styles.userName}>Adedeji</span>
            <img className={styles.chevron} src={arrowDownIcon} alt="" />
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
        <button className={styles.orgSwitch} type="button">
          <span className={styles.iconWrap}>
            <img className={styles.icon} src={briefcaseIcon} alt="" />
          </span>
          <span>Switch Organization</span>
          <img className={styles.chevron} src={arrowDownIcon} alt="" />
        </button>
        <nav className={styles.nav}>
          <button className={styles.navButton} type="button">
            <span className={styles.iconWrap}>
              <img className={styles.icon} src={homeIcon} alt="" />
            </span>
            <span>Dashboard</span>
          </button>
          {sectionItems.map((section) => (
            <div className={styles.navGroup} key={section.title}>
              <div className={styles.navTitle}>{section.title}</div>
              {section.items.map((item) => (
                <button
                  className={
                    item.isActive ? styles.navItemActive : styles.navItemMuted
                  }
                  key={item.label}
                  type="button"
                  onClick={() => setActiveItem(item.label)}
                >
                  <span className={styles.iconWrap}>
                    <img className={styles.icon} src={item.icon} alt="" />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
          <div className={styles.navDivider} />
          <button
            className={styles.navItemMuted}
            type="button"
            onClick={() => {
              localStorage.removeItem('auth')
              localStorage.removeItem('authUser')
              navigate('/login', { replace: true })
            }}
          >
            <span className={styles.iconWrap}>
              <img className={styles.icon} src={logoutIcon} alt="" />
            </span>
            <span>Logout</span>
          </button>
        </nav>
        </aside>

        <main className={styles.content}>
          <h1 className={styles.pageTitle}>Users</h1>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div className={styles.statCard} key={stat.label}>
                <div
                  className={`${styles.statIcon} ${styles[`tone${stat.tone}`]}`}
                >
                  <img className={styles.statIconImg} src={stat.icon} alt="" />
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statValue}>{stat.value}</div>
              </div>
            ))}
          </div>

          <UsersTable users={users} />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
