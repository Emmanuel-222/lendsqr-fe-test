import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './UsersTable.module.scss'
import filterIcon from '../../assets/icons/filtericon.svg'
import eyeIcon from '../../assets/icons/eyeicon.svg'
import blacklistIcon from '../../assets/icons/blacklistusericon.svg'
import activeUser from '../../assets/icons/activateusericon.svg'

export type UserRow = {
  id: string
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

const PAGE_SIZES = [10, 20, 50, 100]

const buildPagination = (totalPages: number, currentPage: number) => {
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

const UsersTable = ({ users }: UsersTableProps) => {
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const filterRef = useRef<HTMLDivElement | null>(null)

  const totalItems = users.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pagedUsers = users.slice(startIndex, endIndex)
  const paginationItems = buildPagination(totalPages, safePage)

  useEffect(() => {
    if (currentPage !== safePage) {
      setCurrentPage(safePage)
    }
  }, [currentPage, safePage])

  useEffect(() => {
    setOpenIndex(null)
  }, [currentPage, pageSize, users])

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
          {pagedUsers.map((user, index) => (
            <tr className={styles.tr} key={user.id}>
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
                    <button
                      className={styles.menuItem}
                      type="button"
                      onClick={() => {
                        navigate(`/user-detail/${user.id}`)
                        setOpenIndex(null)
                      }}
                    >
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
          <select
            className={styles.pageSize}
            value={pageSize}
            onChange={(event) => {
              const nextSize = Number.parseInt(event.target.value, 10)
              setPageSize(Number.isNaN(nextSize) ? 10 : nextSize)
              setCurrentPage(1)
            }}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>out of {totalItems}</span>
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.pageIcon}
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          {paginationItems.map((item, index) => {
            if (item === 'ellipsis') {
              return (
                <span className={styles.pageEllipsis} key={`ellipsis-${index}`}>
                  ...
                </span>
              )
            }
            const isActive = item === safePage
            return (
              <button
                className={isActive ? styles.pageBtnActive : styles.pageBtn}
                type="button"
                key={item}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </button>
            )
          })}
          <button
            className={styles.pageIcon}
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage === totalPages}
            aria-label="Next page"
          >
            &rsaquo;
          </button>
        </div>
      </div>
    </section>
  )
}

export default UsersTable
