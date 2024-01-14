import {
  ComponentProps,
  ElementType,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'
import { tv, VariantProps } from 'tailwind-variants'
import { AlertCircle, Search } from 'lucide-react'
import InputTooltip from './InputTooltip'

const inputStyle = tv({
  base: 'flex items-center relative w-full rounded-lg border-2 border-solid  bg-gray-800 p-4 text-zinc-300 data-[iserror=true]:border-red-600 data-[isfocused=true]:border-primary data-[isfilled=true]:text-primary data-[isfocused=true]:text-white',
  variants: {},
})

interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputStyle> {
  children?: ReactNode
  error: FieldError | undefined
}

export default function InputRoot({ children, error, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!props.value)
  }, [props.value])

  return (
    <div
      data-isfocused={isFocused}
      data-isfilled={isFilled}
      data-iserror={!!error}
      className={inputStyle({})}
    >
      {children}

      <input
        className="flex-1
        border-0 bg-inherit
        placeholder:text-zinc-400 focus:outline-none"
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        {...props}
      />

      {!!error && (
        <InputTooltip title={error.message as string}>
          <AlertCircle color="#c53030" size={20} className="m-0" />
        </InputTooltip>
      )}
    </div>
  )
}
