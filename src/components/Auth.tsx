import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { ComponentType } from 'react'

type Role = 'ADMIN' | 'USER'

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  role: Role[],
) {
  return function WithAuth(props: P) {
    const { user } = useAuth()

    const router = useRouter()
    const isAuthenticated = role.includes(user.role)

    if (!isAuthenticated) {
      return router.replace('/dashboard')
    }

    return <Component {...props} />
  }
}
