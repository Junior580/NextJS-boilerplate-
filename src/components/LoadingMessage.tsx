import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const styles = tv({
  base: 'text-green-600-600" font-bold p-1 bg-red-400 rounded-lg mb-2',
  variants: {
    color: {
      primary: '',
      secondary: '',
      danger: '',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

type StyleProps = ComponentProps<'p'> & VariantProps<typeof styles>

export default function LoadingMessage({ color, className }: StyleProps) {
  return <p className={styles({ color, className })}>Carregando...</p>
}
