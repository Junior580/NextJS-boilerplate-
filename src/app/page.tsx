import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex h-screen  flex-col items-center justify-center bg-slate-400">
      <h1>home page</h1>
      <Link href="/signin" className="rounded-lg bg-slate-500 p-2">
        logar
      </Link>
    </main>
  )
}
