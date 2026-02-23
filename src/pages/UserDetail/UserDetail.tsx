import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './UserDetail.module.scss'
import userIcon from '../../assets/icons/userdetailsicon.svg'
import leftIcon from '../../assets/icons/lefticon.svg'
import { fetchUsers } from '../../data/usersApi'
import { getUser, setUser } from '../../data/userStore'
import type { UserRecord } from '../../types/users'

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
    index < safeTier ? '\u2605' : '\u2606',
  ).join(' ')
}

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUserState] = useState<UserRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(detailTabs[0])

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
    <>
      <button className={styles.backLink} type="button" onClick={() => navigate('/dashboard')}>
        <img src={leftIcon} alt="left icon to go back" /> Back to Users
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
                    <div className={styles.subText}>User's Tier</div>
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
                  <div className={`${styles.grid} ${styles.personalGrid}`}>
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
                      <div className={styles.label}>BVN</div>
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
                  <div className={`${styles.grid} ${styles.educationGrid}`}>
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
                  <div className={`${styles.grid} ${styles.socialsGrid}`}>
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
                  <div className={`${styles.grid} ${styles.guarantorGrid}`}>
                    <div>
                      <div className={styles.label}>Full Name</div>
                      <div className={styles.value}>{user.guarantor.fullName}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Phone Number</div>
                      <div className={styles.value}>{String(user.guarantor.phoneNumber)}</div>
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
                  <div className={styles.innerDivider} />
                  <div className={`${styles.grid} ${styles.guarantorGrid}`}>
                    <div>
                      <div className={styles.label}>Full Name</div>
                      <div className={styles.value}>{user.guarantor.fullName}</div>
                    </div>
                    <div>
                      <div className={styles.label}>Phone Number</div>
                      <div className={styles.value}>{String(user.guarantor.phoneNumber)}</div>
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
    </>
  )
}

export default UserDetail
