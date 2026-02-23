import { describe, expect, it } from 'vitest'
import { getFirstName } from './login.utils'

describe('getFirstName', () => {
  it('returns first token from full name', () => {
    expect(getFirstName('Grace Effiom', 'grace@mail.com')).toBe('Grace')
  })

  it('falls back to email prefix when full name is empty', () => {
    expect(getFirstName('', 'grace@mail.com')).toBe('grace')
  })
})
