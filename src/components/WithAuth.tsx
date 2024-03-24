'use client'

import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

type Role = 'ADMIN' | 'USER'

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  role: Role[],
) {
  return function WithAuth(props: P) {
    const { user } = useAuth()

    const router = useRouter()
    const isAuthenticated = role.includes(user.role)

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/dashboard')
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}
