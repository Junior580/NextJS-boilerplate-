import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const authToken = cookieStore.get('@auth')

  if (!!authToken) {
    return redirect('/dashboard')
  }

  return <>{children}</>
}
