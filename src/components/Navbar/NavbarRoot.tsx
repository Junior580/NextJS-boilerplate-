import { ReactNode } from 'react'

type NavbarRootProps = {
  children: ReactNode
}

export default function NavbarRoot({ children }: NavbarRootProps) {
  return (
    <nav className="supports-backdrop-blur:bg-white/95 sticky top-0  z-40 flex w-full flex-none justify-around bg-white p-2 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-slate-900/75 lg:z-50 lg:border-b lg:border-slate-900/10 ">
      {children}
    </nav>
  )
}
