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

  // if (!authToken) {
  //   redirect('/signin')
  // }

  return (
    <main className="flex h-screen flex-row bg-secondary_bg ">
      <Sidebar />
      <article className="h-screen w-full p-4">{children}</article>
    </main>
  )
}
