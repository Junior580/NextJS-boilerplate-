import Sidebar from '@/components/Sidebar'
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
    return redirect('/signin')
  }

  return (
    <main className="flex flex-row">
      <Sidebar />
      <article className="w-full">{children}</article>
    </main>
  )
}
