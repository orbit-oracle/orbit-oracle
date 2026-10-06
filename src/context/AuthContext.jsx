import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('oo_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = (userData, token) => {
    localStorage.setItem('oo_user', JSON.stringify(userData))
    localStorage.setItem('oo_token', token)
    setUser(userData)
  }

  // NEW: merge changes into the current user and save them
  const updateUser = patch => {
    const next = { ...user, ...patch }
    localStorage.setItem('oo_user', JSON.stringify(next))
    setUser(next)
  }

  const logout = () => {
    localStorage.removeItem('oo_user')
    localStorage.removeItem('oo_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)