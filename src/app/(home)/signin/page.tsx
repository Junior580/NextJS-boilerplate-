'use client'

import { useCallback, startTransition } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import ErrorMessage from '@/components/ErrorMessage'

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export default function SignIn() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (data: SignUpSchemaType) => {
      return api.post('/api/auth', data)
    },
    onSuccess: () => router.replace('/dashboard'),
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = useCallback(
    async (data) => mutate(data),
    [mutate],
  )

  return (
    <main className="flex h-screen items-center justify-center bg-slate-400">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-80 flex-col items-center justify-center gap-2 rounded-lg bg-white p-2"
        >
          <h1 className="mb-1 text-xl font-bold">Faça seu logon</h1>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChange={onChange}
                value={value}
                error={errors.email}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                type="password"
                placeholder="Senha"
                onChange={onChange}
                value={value}
                error={errors.password}
              />
            )}
          />

          <Button type="submit" name="Entrar" isLoading={isLoading} />
        </form>
        {isError && <ErrorMessage message="Error ao logar tente novamente" />}
      </div>
    </main>
  )
}
