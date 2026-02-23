import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './UsersTable.module.scss'
import filterIcon from '../../assets/icons/filtericon.svg'
import eyeIcon from '../../assets/icons/eyeicon.svg'
import blacklistIcon from '../../assets/icons/blacklistusericon.svg'
import activeUser from '../../assets/icons/activateusericon.svg'
import {
  applyFiltersToUsers,
  buildPagination,
  defaultFilters,
  type UserFilters,
} from './usersTable.utils'

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

const UsersTable = ({ users }: UsersTableProps) => {
  const navigate = useNavigate()
  const [openUserId, setOpenUserId] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [draftFilters, setDraftFilters] = useState<UserFilters>(defaultFilters)
  const [appliedFilters, setAppliedFilters] = useState<UserFilters>(defaultFilters)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const filterRef = useRef<HTMLDivElement | null>(null)

  const filteredUsers = applyFiltersToUsers(users, appliedFilters)
  const organizationOptions = Array.from(new Set(users.map((row) => row.org))).sort()
  const statusOptions: UserRow['status'][] = ['Active', 'Inactive', 'Pending', 'Blacklisted']

  const totalItems = filteredUsers.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const boundedPage = Math.min(currentPage, totalPages)
  const startIndex = (boundedPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pagedUsers = filteredUsers.slice(startIndex, endIndex)
  const paginationItems = buildPagination(totalPages, boundedPage)

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
        setOpenUserId(null)
        setIsFilterOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenUserId(null)
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
            <select
              value={draftFilters.org}
              onChange={(event) =>
                setDraftFilters((prev) => ({ ...prev, org: event.target.value }))
              }
            >
              <option value="">Select</option>
              {organizationOptions.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterField}>
            <label>Username</label>
            <input
              placeholder="User"
              value={draftFilters.username}
              onChange={(event) =>
                setDraftFilters((prev) => ({ ...prev, username: event.target.value }))
              }
            />
          </div>
          <div className={styles.filterField}>
            <label>Email</label>
            <input
              placeholder="Email"
              value={draftFilters.email}
              onChange={(event) =>
                setDraftFilters((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </div>
          <div className={styles.filterField}>
            <label>Date</label>
            <input
              type="date"
              value={draftFilters.date}
              onChange={(event) =>
                setDraftFilters((prev) => ({ ...prev, date: event.target.value }))
              }
            />
          </div>
          <div className={styles.filterField}>
            <label>Phone Number</label>
            <input
              placeholder="Phone Number"
              value={draftFilters.phone}
              onChange={(event) =>
                setDraftFilters((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </div>
          <div className={styles.filterField}>
            <label>Status</label>
            <select
              value={draftFilters.status}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  status: event.target.value as UserFilters['status'],
                }))
              }
            >
              <option value="">Select</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterActions}>
            <button
              className={styles.resetBtn}
              type="button"
              onClick={() => {
                setDraftFilters(defaultFilters)
                setAppliedFilters(defaultFilters)
                setCurrentPage(1)
                setIsFilterOpen(false)
                setOpenUserId(null)
              }}
            >
              Reset
            </button>
            <button
              className={styles.applyBtn}
              type="button"
              onClick={() => {
                setAppliedFilters(draftFilters)
                setCurrentPage(1)
                setIsFilterOpen(false)
                setOpenUserId(null)
              }}
            >
              Filter
            </button>
          </div>
        </div>
      ) : null}
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colOrg} />
            <col className={styles.colUsername} />
            <col className={styles.colEmail} />
            <col className={styles.colPhone} />
            <col className={styles.colDate} />
            <col className={styles.colStatus} />
            <col className={styles.colActions} />
          </colgroup>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={styles.th}>
                  <div className={styles.thContent}>
                    <span className={styles.thLabel}>{column.label}</span>
                    <button
                      className={styles.filterBtn}
                      type="button"
                      data-filter-trigger
                      aria-label={`Filter by ${column.label}`}
                      onClick={() => setIsFilterOpen((prev) => !prev)}
                    >
                      <img src={filterIcon} alt="" />
                    </button>
                  </div>
                </th>
              ))}
              <th className={styles.th} aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map((user) => (
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
                      setOpenUserId((prev) => (prev === user.id ? null : user.id))
                    }
                  >
                    <span />
                    <span />
                    <span />
                  </button>
                  {openUserId === user.id ? (
                    <div className={styles.menu} ref={menuRef}>
                      <button
                        className={styles.menuItem}
                        type="button"
                        onClick={() => {
                          navigate(`/user-detail/${user.id}`)
                          setOpenUserId(null)
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
      </div>

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
              setOpenUserId(null)
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
            disabled={boundedPage === 1}
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
            const isActive = item === boundedPage
            return (
              <button
                className={isActive ? styles.pageBtnActive : styles.pageBtn}
                type="button"
                key={item}
                onClick={() => {
                  setCurrentPage(item)
                  setOpenUserId(null)
                }}
              >
                {item}
              </button>
            )
          })}
          <button
            className={styles.pageIcon}
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={boundedPage === totalPages}
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
