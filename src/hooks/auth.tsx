'use client'

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'

interface User {
  name: string
  email: string
  image: string
  role: 'USER' | 'ADMIN'
}

interface AuthContextData {
  user: User
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<User>({} as User)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('@GoBarber:user')
      if (userData) {
        setData(JSON.parse(userData))
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user: data }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
