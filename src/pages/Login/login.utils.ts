export const getFirstName = (fullName: string, email: string) => {
  const trimmedName = fullName.trim()
  if (trimmedName) {
    return trimmedName.split(/\s+/)[0]
  }
  return email.split('@')[0]
}
