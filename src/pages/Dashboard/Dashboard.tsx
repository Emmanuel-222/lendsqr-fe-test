import { useEffect, useMemo, useState } from 'react'
import styles from './Dashboard.module.scss'
import usersIcon from '../../assets/icons/user1.svg'
import activeUsersIcon from '../../assets/icons/activeusers.svg'
import usersWithLoansIcon from '../../assets/icons/userswithloans.svg'
import usersWithSavingsIcon from '../../assets/icons/userswithsavings.svg'
import UsersTable from '../../components/common/UsersTable'
import { fetchUsers } from '../../data/usersApi'
import type { UserRecord } from '../../types/users'

const parseAmount = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, '')
  const parsed = Number.parseFloat(cleaned)
  return Number.isNaN(parsed) ? 0 : parsed
}

const Dashboard = () => {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const loadUsers = async () => {
      try {
        const data = await fetchUsers()
        if (isMounted) {
          setUsers(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load users')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    loadUsers()
    return () => {
      isMounted = false
    }
  }, [])

  const stats = useMemo(() => {
    const totalUsers = users.length
    const activeUsers = users.filter((user) => user.status === 'Active').length
    const usersWithLoans = users.filter(
      (user) => user.education.loanRepayment > 0,
    ).length
    const usersWithSavings = users.filter(
      (user) => parseAmount(user.account.accountBalance) > 0,
    ).length

    const formatValue = (value: number) => value.toLocaleString()

    return [
      {
        label: 'Users',
        value: formatValue(totalUsers),
        icon: usersIcon,
        tone: 'pink',
      },
      {
        label: 'Active Users',
        value: formatValue(activeUsers),
        icon: activeUsersIcon,
        tone: 'purple',
      },
      {
        label: 'Users with Loans',
        value: formatValue(usersWithLoans),
        icon: usersWithLoansIcon,
        tone: 'orange',
      },
      {
        label: 'Users with Savings',
        value: formatValue(usersWithSavings),
        icon: usersWithSavingsIcon,
        tone: 'red',
      },
    ]
  }, [users])

  const tableRows = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      org: user.orgName,
      username: user.userName,
      email: user.email,
      phone: user.phoneNumber,
      dateJoined: user.createdAt,
      status: user.status,
    }))
  }, [users])

  return (
    <>
      <h1 className={styles.pageTitle}>Users</h1>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div className={styles.statCard} key={stat.label}>
            <div className={`${styles.statIcon} ${styles[`tone${stat.tone}`]}`}>
              <img className={styles.statIconImg} src={stat.icon} alt="" />
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {error ? <p>{error}</p> : null}
      {isLoading ? <p>Loading users...</p> : <UsersTable users={tableRows} />}
    </>
  )
}

export default Dashboard
