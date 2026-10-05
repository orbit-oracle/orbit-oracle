import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('oo_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

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