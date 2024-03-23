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
  refresh_token: string
}

interface AuthContextData {
  user: User
  setUserData: (user: User) => void
  refreshToken: string
  setRefreshToken: (acess_token: string) => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('@user')

      if (user) {
        return JSON.parse(user)
      }
    }
    return {} as User
  })

  const [refreshToken, setRefreshToken] = useState(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@token')

      if (token) {
        return JSON.parse(token)
      }
    }
    return {} as User
  })

  return (
    <AuthContext.Provider
      value={{ user: userData, setUserData, refreshToken, setRefreshToken }}
    >
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
