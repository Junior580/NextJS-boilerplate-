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
import { useToast } from '@/components/ui/use-toast'

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export default function SignIn() {
  const router = useRouter()
  const { toast } = useToast()

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

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data: SignUpSchemaType) => {
      return api.post('/auth', data)
    },
    onSuccess: (e) => {
      if (e.data.isTwoFactorAuthEnabled) {
        const { email } = JSON.parse(e.config.data)
        return router.push(`two-factor-auth?user=${email}`)
      }

      if (e.data.isEmailVerified === false) {
        toast({
          title: 'Confirm your email first before trying to log in',
        })
        return
      }

      return router.replace('/users')
    },
    onError: (e) => {
      console.log(`errors ${JSON.stringify(e)}`)
    },
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = useCallback(
    async (data) => mutate(data),
    [mutate],
  )

  const teste = {
    data: { isTwoFactorAuthEnabled: true },
    status: 201,
    statusText: 'Created',
    headers: {
      'content-length': '31',
      'content-type': 'application/json; charset=utf-8',
    },
    config: {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
      },
      adapter: ['xhr', 'http'],
      transformRequest: [null],
      transformResponse: [null],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {},
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:3333',
      withCredentials: true,
      method: 'post',
      url: '/auth',
      data: '{"email":"user2@email.com","password":"teste123@"}',
    },
    request: {},
  }

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
        {!!error && <ErrorMessage message={`Error ao logar, ${error}.`} />}
      </div>
    </main>
  )
}
