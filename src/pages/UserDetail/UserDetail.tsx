import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './UserDetail.module.scss'
import logo from '../../assets/images/logo.svg'
import briefcaseIcon from '../../assets/icons/briefcase.svg'
import arrowDownIcon from '../../assets/icons/arrowdown.svg'
import homeIcon from '../../assets/icons/home.svg'
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
import logoutIcon from '../../assets/icons/logout.svg'
import searchIcon from '../../assets/icons/searchicon.svg'
import notificationBellIcon from '../../assets/icons/notifcationbellicon.svg'
import profilePic from '../../assets/images/profilepics.png'
import userIcon from '../../assets/icons/userdetailsicon.svg'
import { fetchUsers } from '../../data/usersApi'
import { getUser, setUser } from '../../data/userStore'
import type { UserRecord } from '../../types/users'

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

const detailTabs = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
]

const formatTier = (tier: number) => {
  const safeTier = Math.max(0, Math.min(3, tier))
  return Array.from({ length: 3 }, (_, index) =>
    index < safeTier ? '★' : '☆',
  ).join(' ')
}

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUserState] = useState<UserRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(detailTabs[0])

  const sectionItems = useMemo(() => {
    return sidebarSections
  }, [])

  useEffect(() => {
    let isMounted = true
    const loadUser = async () => {
      if (!id) {
        if (isMounted) {
          setError('User id is missing.')
          setIsLoading(false)
        }
        return
      }

      const storedUser = getUser(id)
      if (storedUser) {
        if (isMounted) {
          setUserState(storedUser)
          setIsLoading(false)
        }
        return
      }

      try {
        const users = await fetchUsers()
        const match = users.find((record) => record.id === id) ?? null
        if (!match) {
          if (isMounted) {
            setError('User not found.')
          }
        } else {
          setUser(match)
          if (isMounted) {
            setUserState(match)
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load user')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUser()
    return () => {
      isMounted = false
    }
  }, [id])

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
          <button className={styles.backLink} type="button" onClick={() => navigate('/dashboard')}>
            ← Back to Users
          </button>

          <div className={styles.headerRow}>
            <h1 className={styles.pageTitle}>User Details</h1>
            <div className={styles.headerActions}>
              <button className={styles.actionDanger} type="button">
                Blacklist User
              </button>
              <button className={styles.actionPrimary} type="button">
                Activate User
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.stateCard}>
              <p>Loading user...</p>
            </div>
          ) : error ? (
            <div className={styles.stateCard}>
              <p>{error}</p>
            </div>
          ) : !user ? (
            <div className={styles.stateCard}>
              <p>User not available.</p>
            </div>
          ) : (
            <>
              <section className={styles.summaryCard}>
                <div className={styles.summaryTop}>
                  <div className={styles.avatar}>
                    <img src={userIcon} alt="" />
                  </div>
                  <div className={styles.nameBlock}>
                    <div className={styles.name}>{user.fullName}</div>
                    <div className={styles.subText}>{user.userName}</div>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.tierBlock}>
                    <div className={styles.subText}>User’s Tier</div>
                    <div className={styles.tierStars}>{formatTier(user.tier)}</div>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.accountBlock}>
                    <div className={styles.accountBalance}>{user.account.accountBalance}</div>
                    <div className={styles.subText}>
                      {user.account.accountNumber}/{user.account.bankName}
                    </div>
                  </div>
                </div>
                <div className={styles.tabs}>
                  {detailTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={
                        tab === activeTab ? styles.tabActive : styles.tab
                      }
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </section>

              <section className={styles.detailsCard}>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Personal Information</h2>
                  <div className={styles.grid}>
                    <div>
                      <div className={styles.label}>Full Name</div>
                      <div className={styles.value}>{user.fullName}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Phone Number</div>
                      <div className={styles.value}>{user.phoneNumber}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Email Address</div>
                      <div className={styles.value}>{user.email}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Bvn</div>
                      <div className={styles.value}>{user.bvn}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Gender</div>
                      <div className={styles.value}>{user.gender}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Marital Status</div>
                      <div className={styles.value}>{user.maritalStatus}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Children</div>
                      <div className={styles.value}>{user.children || 'None'}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Type of Residence</div>
                      <div className={styles.value}>{user.residenceType}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Education and Employment</h2>
                  <div className={styles.grid}>
                    <div>
                      <div className={styles.label}>Level of Education</div>
                      <div className={styles.value}>{user.education.level}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Employment Status</div>
                      <div className={styles.value}>{user.education.employmentStatus}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Sector of Employment</div>
                      <div className={styles.value}>{user.education.sector}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Duration of Employment</div>
                      <div className={styles.value}>{user.education.duration}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Office Email</div>
                      <div className={styles.value}>{user.education.officeEmail}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Monthly Income</div>
                      <div className={styles.value}>{user.education.monthlyIncome}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Loan Repayment</div>
                      <div className={styles.value}>{user.education.loanRepayment.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Socials</h2>
                  <div className={styles.grid}>
                    <div>
                      <div className={styles.label}>Twitter</div>
                      <div className={styles.value}>{user.socials.twitter}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Facebook</div>
                      <div className={styles.value}>{user.socials.facebook}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Instagram</div>
                      <div className={styles.value}>{user.socials.instagram}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Guarantor</h2>
                  <div className={styles.grid}>
                    <div>
                      <div className={styles.label}>Full Name</div>
                      <div className={styles.value}>{user.guarantor.fullName}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Phone Number</div>
                      <div className={styles.value}>{user.guarantor.phoneNumber}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Email Address</div>
                      <div className={styles.value}>{user.guarantor.email}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Relationship</div>
                      <div className={styles.value}>{user.guarantor.relationship}</div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default UserDetail
