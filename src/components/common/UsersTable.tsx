import { useEffect, useRef, useState } from 'react'
import styles from './UsersTable.module.scss'
import filterIcon from '../../assets/icons/filtericon.svg'
import eyeIcon from '../../assets/icons/eyeicon.svg'
import blacklistIcon from '../../assets/icons/blacklistusericon.svg'
import activeUser from '../../assets/icons/activateusericon.svg'

export type UserRow = {
  org: string
  username: string
  email: string
  phone: string
  dateJoined: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'
}

type UsersTableProps = {
  users: UserRow[]
}

const columns = [
  { key: 'org', label: 'Organization' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'dateJoined', label: 'Date Joined' },
  { key: 'status', label: 'Status' },
]

const UsersTable = ({ users }: UsersTableProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const filterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-filter-trigger]')) {
        return
      }
      if (filterRef.current && target && filterRef.current.contains(target)) {
        return
      }
      if (event.target instanceof Node && !menuRef.current.contains(event.target)) {
        setOpenIndex(null)
        setIsFilterOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenIndex(null)
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])
  return (
    <section className={styles.tableCard}>
      {isFilterOpen ? (
        <div className={styles.filterPanel} ref={filterRef}>
          <div className={styles.filterField}>
            <label>Organization</label>
            <select>
              <option>Select</option>
            </select>
          </div>
          <div className={styles.filterField}>
            <label>Username</label>
            <input placeholder="User" />
          </div>
          <div className={styles.filterField}>
            <label>Email</label>
            <input placeholder="Email" />
          </div>
          <div className={styles.filterField}>
            <label>Date</label>
            <input type="date" />
          </div>
          <div className={styles.filterField}>
            <label>Phone Number</label>
            <input placeholder="Phone Number" />
          </div>
          <div className={styles.filterField}>
            <label>Status</label>
            <select>
              <option>Select</option>
            </select>
          </div>
          <div className={styles.filterActions}>
            <button className={styles.resetBtn} type="button">
              Reset
            </button>
            <button className={styles.applyBtn} type="button">
              Filter
            </button>
          </div>
        </div>
      ) : null}
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={styles.th}>
                <span>{column.label}</span>
                <button
                  className={styles.filterBtn}
                  type="button"
                  data-filter-trigger
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                >
                  <img src={filterIcon} alt="" />
                </button>
              </th>
            ))}
            <th className={styles.th} aria-hidden="true" />
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className={styles.tr} key={`${user.email}-${index}`}>
              <td>{user.org}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dateJoined}</td>
              <td>
                <span
                  className={`${styles.statusPill} ${
                    styles[`status${user.status}`]
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className={styles.actionsCell}>
                <button
                  className={styles.moreBtn}
                  type="button"
                  aria-label="More"
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                >
                  <span />
                  <span />
                  <span />
                </button>
                {openIndex === index ? (
                  <div className={styles.menu} ref={menuRef}>
                    <button className={styles.menuItem} type="button">
                      <img className={styles.menuIcon} src={eyeIcon} alt="" />
                      View Details
                    </button>
                    <button className={styles.menuItem} type="button">
                      <img className={styles.menuIcon} src={blacklistIcon} alt="" />
                      Blacklist User
                    </button>
                    <button className={styles.menuItem} type="button">
                      <img className={styles.menuIcon} src={activeUser} alt="" />
                      Activate User
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.tableFooter}>
        <div className={styles.footerLeft}>
          <span>Showing</span>
          <select className={styles.pageSize}>
            <option>100</option>
          </select>
          <span>out of 100</span>
        </div>
        <div className={styles.pagination}>
          <button className={styles.pageIcon} type="button">
            ‹
          </button>
          <button className={styles.pageBtn} type="button">
            1
          </button>
          <button className={styles.pageBtn} type="button">
            2
          </button>
          <button className={styles.pageBtn} type="button">
            3
          </button>
          <span className={styles.pageEllipsis}>...</span>
          <button className={styles.pageBtn} type="button">
            15
          </button>
          <button className={styles.pageBtn} type="button">
            16
          </button>
          <button className={styles.pageIcon} type="button">
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

export default UsersTable
