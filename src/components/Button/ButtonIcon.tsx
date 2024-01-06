import { LucideProps } from 'lucide-react'
import { ElementType } from 'react'

interface ButtonIconProps extends LucideProps {
  icon: ElementType
}

export default function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  return <Icon className="text-inherit" {...rest} />
}
