import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import UserDetail from './pages/UserDetail/UserDetail'
import RequireAuth from './routes/RequireAuth'


const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/user-detail/:id"
          element={
            <RequireAuth>
              <UserDetail />
            </RequireAuth>
          }
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
