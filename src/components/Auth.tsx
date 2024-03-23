// 'use client'

import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { ComponentType } from 'react'

type Role = 'ADMIN' | 'USER'

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  role: Role[],
) {
  return function WithAuth(props: P) {
    // const { user } = useAuth()
    // console.log(`layout: ${JSON.stringify(user)}`)
    const router = useRouter()
    // const isAuthenticated = role.includes(user.role)
    const isAuthenticated = true

    if (!isAuthenticated) {
      return router.replace('/dashboard')
    }

    return <Component {...props} />
  }
}
