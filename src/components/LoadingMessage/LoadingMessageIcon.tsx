import { LucideIcon } from 'lucide-react'

type LoadingIconProps = {
  icon: LucideIcon
}

export default function LoadingMessageIcon({ icon: Icon }: LoadingIconProps) {
  return <Icon className="bg-inherit" />
}
