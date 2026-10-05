import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // ✅ initialize state directly from localStorage — no useEffect needed
  const [user, setUser]       = useState(() => {
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

  const logout = () => {
    localStorage.removeItem('oo_user')
    localStorage.removeItem('oo_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)