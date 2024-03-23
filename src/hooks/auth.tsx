'use client'

import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react'

interface User {
  name: string
  email: string
  image: string
  role: 'USER' | 'ADMIN'
}

interface AuthContextData {
  user: User | null
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('@GoBarber:user')
      if (user) {
        return JSON.parse(user)
      }
      return {} as User
    }
  })

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
