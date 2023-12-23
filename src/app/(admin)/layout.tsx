import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const authToken = cookieStore.get('@auth')

  if (!authToken) {
    redirect('/signin')
  }

  return <>{children}</>
}
