export type MockUser = {
  email: string
  password: string
  name: string
}

export const mockUsers: MockUser[] = [
  {
    email: 'admin@lendsqr.com',
    password: 'Password@123',
    name: 'Admin User',
  },
  {
    email: 'hello@lendsqr.com',
    password: 'welcome123',
    name: 'Lendsqr User',
  },
]
