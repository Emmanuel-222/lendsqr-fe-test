import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import styles from './Login.module.scss'
import logo from '../../assets/images/logo.svg'
import illustration from '../../assets/images/login-illustration.svg'
import { fetchUsers } from '../../data/usersApi'
import { loginSchema } from '../../utils/schema'
import type { UserRecord } from '../../types/users'

const DEFAULT_PASSWORD = 'Password@123'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrors({})
    const result = loginSchema.safeParse({
      email: email.trim(),
      password,
    })

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (field === 'email' || field === 'password') {
          fieldErrors[field] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    if (result.data.password !== DEFAULT_PASSWORD) {
      toast.error('Invalid email or password.')
      return
    }

    let users: UserRecord[] = []
    try {
      users = await fetchUsers()
    } catch {
      toast.error('Unable to load users. Please try again.')
      return
    }

    const match = users.find(
      (user) =>
        user.email.toLowerCase() === result.data.email.toLowerCase(),
    )

    if (!match) {
      toast.error('Invalid email or password.')
      return
    }

    localStorage.setItem('auth', 'true')
    localStorage.setItem('authUser', match.email)
    toast.success(`Welcome, ${match.fullName || match.userName}!`)
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>
      <section className={styles.left}>
        <img className={styles.logo} src={logo} alt="Lendsqr" />
        <div className={styles.illustrationWrap}>
          <img
            className={styles.illustration}
            src={illustration}
            alt="Workspace illustration"
          />
        </div>
      </section>

      <section className={styles.right}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form noValidate className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              <span className={styles.srOnly}>Email</span>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }
                }}
              />
              {errors.email ? (
                <span className={styles.errorText}>{errors.email}</span>
              ) : null}
            </label>

            <label className={styles.label}>
              <span className={styles.srOnly}>Password</span>
              <div className={styles.passwordField}>
                <input
                  className={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }))
                    }
                  }}
                />
                <button
                  className={styles.showBtn}
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password ? (
                <span className={styles.errorText}>{errors.password}</span>
              ) : null}
            </label>

            <button className={styles.forgot} type="button">
              FORGOT PASSWORD?
            </button>

            <button className={styles.loginBtn} type="submit">
              LOG IN
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login
