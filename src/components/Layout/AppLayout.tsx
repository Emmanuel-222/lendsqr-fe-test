import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './AppLayout.module.scss'
import logo from '../../assets/images/logo.svg'
import briefcaseIcon from '../../assets/icons/briefcase.svg'
import arrowDownIcon from '../../assets/icons/arrowdown.svg'
import homeIcon from '../../assets/icons/home.svg'
import logoutIcon from '../../assets/icons/logout.svg'
import searchIcon from '../../assets/icons/searchicon.svg'
import notificationBellIcon from '../../assets/icons/notifcationbellicon.svg'
import profilePic from '../../assets/images/profilepics.png'
import { sidebarSections } from './layoutConfig'

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const activeItem =
    location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/user-detail')
      ? 'Users'
      : ''

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.menuToggle}
          aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
        >
          {isMobileNavOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 5H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 19H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <div className={styles.logoRow}>
          <img className={styles.logoImg} src={logo} alt="Lendsqr logo" />
        </div>
        <div className={styles.searchWrap}>
          <input className={styles.searchInput} placeholder="Search for anything" />
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
        <aside className={`${styles.sidebar} ${isMobileNavOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.mobileSidebarHeader}>
            <img className={styles.logoImg} src={logo} alt="Lendsqr logo" />
            <button
              type="button"
              className={styles.closeSidebarBtn}
              aria-label="Close menu"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <button className={styles.orgSwitch} type="button">
            <span className={styles.iconWrap}>
              <img className={styles.icon} src={briefcaseIcon} alt="" />
            </span>
            <span>Switch Organization</span>
            <img className={styles.chevron} src={arrowDownIcon} alt="" />
          </button>
          <nav className={styles.nav}>
            <button
              className={styles.navButton}
              type="button"
              onClick={() => {
                navigate('/dashboard')
                setIsMobileNavOpen(false)
              }}
            >
              <span className={styles.iconWrap}>
                <img className={styles.icon} src={homeIcon} alt="" />
              </span>
              <span>Dashboard</span>
            </button>
            {sidebarSections.map((section) => (
              <div className={styles.navGroup} key={section.title}>
                <div className={styles.navTitle}>{section.title}</div>
                {section.items.map((item) => (
                  <button
                    className={
                      item.label === activeItem ? styles.navItemActive : styles.navItemMuted
                    }
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.label === 'Users') {
                        navigate('/dashboard')
                      }
                      setIsMobileNavOpen(false)
                    }}
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
                setIsMobileNavOpen(false)
              }}
            >
              <span className={styles.iconWrap}>
                <img className={styles.icon} src={logoutIcon} alt="" />
              </span>
              <span>Logout</span>
            </button>
          </nav>
        </aside>
        {isMobileNavOpen ? (
          <button
            type="button"
            className={styles.sidebarBackdrop}
            aria-label="Close menu"
            onClick={() => setIsMobileNavOpen(false)}
          />
        ) : null}

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
