import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    if (token) {
      // Decode token to get role
      const payload = JSON.parse(atob(token.split('.')[1]))
      setRole(payload.role || 'USER')
    }
  }, [token])

  const login = (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setRole(null)
    localStorage.removeItem('token')
  }

  const value = {
    token,
    user,
    role,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

