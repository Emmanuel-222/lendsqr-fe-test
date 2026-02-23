import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import UsersTable, { type UserRow } from './UsersTable'

const users: UserRow[] = [
  {
    id: '1',
    org: 'Lendsqr',
    username: 'grace123',
    email: 'grace@mail.com',
    phone: '07060780922',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Active',
  },
  {
    id: '2',
    org: 'Irorun',
    username: 'tosin101',
    email: 'tosin@mail.com',
    phone: '08060309022',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  },
]

describe('UsersTable filter panel', () => {
  it('applies and resets username filter', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <UsersTable users={users} />
      </MemoryRouter>,
    )

    expect(screen.getByText('grace123')).toBeInTheDocument()
    expect(screen.getByText('tosin101')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /filter by username/i }))
    await user.type(screen.getByPlaceholderText('User'), 'grace')
    await user.click(screen.getByRole('button', { name: 'Filter' }))

    expect(screen.getByText('grace123')).toBeInTheDocument()
    expect(screen.queryByText('tosin101')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /filter by username/i }))
    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByText('grace123')).toBeInTheDocument()
    expect(screen.getByText('tosin101')).toBeInTheDocument()
  })
})
