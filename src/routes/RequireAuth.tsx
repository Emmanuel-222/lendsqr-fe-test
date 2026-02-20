import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type RequireAuthProps = {
  children: ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthed = localStorage.getItem('auth') === 'true'
  return isAuthed ? children : <Navigate to="/login" replace />
}

export default RequireAuth
