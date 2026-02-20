import styles from './Dashboard.module.scss'

const stats = [
  { label: 'Users', value: '2,453', tone: 'pink' },
  { label: 'Active Users', value: '2,453', tone: 'purple' },
  { label: 'Users with Loans', value: '12,453', tone: 'orange' },
  { label: 'Users with Savings', value: '102,453', tone: 'red' },
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
      'Users',
      'Guarantors',
      'Loans',
      'Decision Models',
      'Savings',
      'Loan Requests',
      'Whitelist',
      'Karma',
    ],
  },
  {
    title: 'Businesses',
    items: [
      'Organization',
      'Loan Products',
      'Savings Products',
      'Fees and Charges',
      'Transactions',
      'Services',
      'Service Account',
      'Settlements',
      'Reports',
    ],
  },
  {
    title: 'Settings',
    items: ['Preferences', 'Fees and Pricing', 'Audit Logs'],
  },
]

const Dashboard = () => {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark}>L</div>
          <span className={styles.logoText}>lendsqr</span>
        </div>
        <button className={styles.orgSwitch} type="button">
          Switch Organization
        </button>
        <nav className={styles.nav}>
          <div className={styles.navItem}>Dashboard</div>
          {sidebarSections.map((section) => (
            <div className={styles.navGroup} key={section.title}>
              <div className={styles.navTitle}>{section.title}</div>
              {section.items.map((item) => (
                <div className={styles.navItemMuted} key={item}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.searchWrap}>
            <input
              className={styles.searchInput}
              placeholder="Search for anything"
            />
            <button className={styles.searchBtn} type="button">
              Search
            </button>
          </div>
          <div className={styles.topbarRight}>
            <span className={styles.docs}>Docs</span>
            <div className={styles.avatar}>A</div>
            <span className={styles.userName}>Adedeji</span>
          </div>
        </header>

        <main className={styles.content}>
          <h1 className={styles.pageTitle}>Users</h1>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div className={styles.statCard} key={stat.label}>
                <div
                  className={`${styles.statIcon} ${styles[`tone${stat.tone}`]}`}
                >
                  {stat.label.slice(0, 1)}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statValue}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <span>Organization</span>
              <span>Username</span>
              <span>Email</span>
              <span>Phone Number</span>
              <span>Date Joined</span>
              <span>Status</span>
            </div>
            <div className={styles.tableBody}>
              {users.map((user, index) => (
                <div className={styles.tableRow} key={`${user.email}-${index}`}>
                  <span>{user.org}</span>
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                  <span>{user.phone}</span>
                  <span>{user.dateJoined}</span>
                  <span className={styles.statusCell}>
                    <span
                      className={`${styles.statusPill} ${
                        styles[`status${user.status}`]
                      }`}
                    >
                      {user.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.tableFooter}>
              <span>Showing 1 to 8 of 100</span>
              <div className={styles.pagination}>
                <button className={styles.pageBtn} type="button">
                  1
                </button>
                <button className={styles.pageBtn} type="button">
                  2
                </button>
                <button className={styles.pageBtn} type="button">
                  3
                </button>
                <button className={styles.pageBtn} type="button">
                  4
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
