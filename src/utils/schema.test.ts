import { describe, expect, it } from 'vitest'
import { loginSchema } from './schema'

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'Password@123',
    })

    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'Password@123',
    })

    expect(result.success).toBe(false)
  })

  it('rejects weak password', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'password',
    })

    expect(result.success).toBe(false)
  })
})
