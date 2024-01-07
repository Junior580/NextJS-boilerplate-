import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

type NavbarTitleProps = {
  icon?: LucideIcon
  title: string
}

export default function NavbarTitle({ icon: Icon, title }: NavbarTitleProps) {
  return (
    <Link href="/" className="flex items-center gap-2 text-sky-100 ">
      {Icon && <Icon />}
      <h1 className="text-lg">{title}</h1>
    </Link>
  )
}
