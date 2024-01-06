import { LucideIcon } from 'lucide-react'

type ErrorIconProps = {
  icon: LucideIcon
}

export default function ErrorMessageIcon({ icon: Icon }: ErrorIconProps) {
  return <Icon className="bg-inherit" />
}
