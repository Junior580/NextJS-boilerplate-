'use client'

import { useCallback } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/Button'
import { Input } from '@/components/Input/index'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import ErrorMessage from '@/components/ErrorMessage'
import { Select } from '@/components/Select'

export default function SignIn() {
  const router = useRouter()
  const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
  })

  type SignUpSchemaType = z.infer<typeof SignUpSchema>
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

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (data: SignUpSchemaType) => {
      return api.post('/auth', data)
    },
    onSuccess: (e) => {
      if (e.data === 'Confirm your email first!') {
        //se precisar confirmar email, aexibir em tela
        console.log('🔥 Confirm your email first!')
      }
      if (e.data === '2fa') {
        console.log('🔥 2fa')
        //se tiver logado, nunca chegar na pagina

        return router.replace('/signin/two-factor-auth')
      }

      return router.replace('/dashboard')
    },
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = useCallback(
    async (data) => mutate(data),
    [mutate],
  )

  return (
    <main className="flex h-screen items-center justify-center bg-slate-400">
      <div>
        {true && (
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-80 flex-col items-center justify-center gap-2 rounded-lg bg-white p-2"
            >
              <h1 className="mb-1 text-xl font-bold">Faça seu logon</h1>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input.Root
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
                render={({ field: { onChange, value } }) => (
                  <Input.Root
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
            {true && <ErrorMessage message={`Error ao logar, ${error}.`} />}
          </>
        )}
        {false && (
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-80 flex-col items-center justify-center gap-2 rounded-lg bg-white p-2"
            >
              <h1 className="mb-1 text-xl font-bold">2fa</h1>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input.Root
                    placeholder="6 dig pin"
                    onChange={onChange}
                    value={value}
                    error={errors.email}
                  />
                )}
              />

              <Button type="submit" name="Entrar" isLoading={isLoading} />
            </form>
            {false && <ErrorMessage message={`Error ao logar, ${error}.`} />}
          </>
        )}
      </div>
    </main>
  )
}
