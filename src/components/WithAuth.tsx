'use client'
import type { NextPage } from 'next'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Role = 'ADMIN' | 'USER'

export function withAuth<P extends object>(
  Component: NextPage<P>,
  role: Role[],
) {
  return function WithAuth(props: P) {
    const { user } = useAuth()

    const router = useRouter()

    const [isAuth, setIsAuth] = useState(false)

    const isAuthenticated = role.includes(user.role)

    useEffect(() => {
      const getUser = async () => {
        if (!isAuthenticated) {
          router.push('/dashboard')
        } else {
          setIsAuth(true)
        }
      }
      getUser()
    }, [isAuthenticated, router])

    return !!isAuth ? <Component {...props} /> : null
  }
}
