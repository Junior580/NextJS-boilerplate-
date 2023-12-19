'use client'
import { useCallback } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })
  console.log({ errors })
  const onSubmit: SubmitHandler<SignUpSchemaType> = useCallback(data => {
    console.log('Form data:', data)
  }, [])

  return (
    <main className='bg-slate-400 h-screen flex items-stretch'>
      <div className='flex flex-col justify-center items-center w-full max-w-2xl'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white flex flex-col justify-center items-center gap-2 p-2 rounded-lg w-80'
        >
          <h1 className='text-lg'>Faça seu logon</h1>

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                onChange={onChange}
                value={value}
                error={errors.email}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                type='password'
                placeholder='Senha'
                onChange={onChange}
                value={value}
                error={errors.password}
              />
            )}
          />

          <Button type='submit'>enviar</Button>
          {/* <Button type='submit' /> */}
        </form>
      </div>
    </main>
  )
}
