'use client'

import { ComponentProps, useCallback, useState } from 'react'

type ButtonProps = ComponentProps<'input'>

export default function Input({ ...props }: ButtonProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <div
      className={`
    bg-gray-800  rounded-lg p-4 w-full border-2 border-solid  flex items-center text-zinc-300
    ${isFocused && 'text-orange-500 border-orange-500'}
    ${isFilled && 'text-orange-500'}

    `}
    >
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type='text'
        placeholder='teste'
        className='flex-1 border-0 placeholder:text-zinc-400 bg-transparent focus:outline-none'
        {...props}
      />
      {false && (
        <div className='h-5 ml-5'>
          <span>error message</span>
        </div>
      )}
    </div>
  )
}
