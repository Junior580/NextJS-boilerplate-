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
import SelectPropsTooltip from './SelectTooltip'

const inputStyle = tv({
  base: 'flex items-center relative w-full rounded-lg border-2 border-solid  bg-gray-800 p-4 text-zinc-300 data-[iserror=true]:border-red-600 data-[isfocused=true]:border-primary data-[isfilled=true]:text-primary data-[isfocused=true]:text-white',
  variants: {},
})

interface SelectProps
  extends ComponentProps<'select'>,
    VariantProps<typeof inputStyle> {
  children: ReactNode
  error: FieldError | undefined
}

export default function SelectRoot({ children, error, ...props }: SelectProps) {
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
      <select
        className="w-full border-0 bg-inherit focus:outline-none"
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        {...props}
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {children}
      </select>

      {!!error && (
        <SelectPropsTooltip title={error.message as string}>
          <AlertCircle color="#c53030" size={20} className="m-0" />
        </SelectPropsTooltip>
      )}
    </div>
  )
}
