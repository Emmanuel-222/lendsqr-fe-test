import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUsers } from '../../data/usersApi'
import { getUser, setUser } from '../../data/userStore'
import type { UserRecord } from '../../types/users'

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [user, setUserState] = useState<UserRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (isLoading) {
    return (
      <div style={{ padding: 24 }}>
        <h1>User Detail</h1>
        <p>Loading user...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h1>User Detail</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ padding: 24 }}>
        <h1>User Detail</h1>
        <p>User not available.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>User Detail</h1>
      <p>
        <strong>{user.fullName}</strong> ({user.userName})
      </p>
      <p>{user.email}</p>
      <p>{user.phoneNumber}</p>
      <p>{user.orgName}</p>
    </div>
  )
}

export default UserDetail
