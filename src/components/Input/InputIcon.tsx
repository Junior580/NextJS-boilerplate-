import { LucideIcon } from 'lucide-react'

type InputIconProps = {
  icon: LucideIcon
}

export default function InputIcon({ icon: Icon }: InputIconProps) {
  return <Icon className="mr-4 bg-inherit" />
}
