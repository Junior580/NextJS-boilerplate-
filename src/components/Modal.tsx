import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Button from './Button'
import { Input } from './Input/index'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import api from '@/services/api'
import { useCallback, useState } from 'react'

const SignUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
})

type SignUpType = z.infer<typeof SignUpSchema>

type ModalProps = {
  isOpen: boolean
  close: () => void
  user: SignUpType
}

export default function Modal({ isOpen, close, user }: ModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (data: SignUpType) => {
      return api.post('/updateuser', data)
    },
    onSuccess: () => close(),
  })

  const onSubmit: SubmitHandler<SignUpType> = useCallback(
    async (data) => mutate(data),
    [mutate],
  )

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0  flex h-screen w-screen items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-[500px] flex-col  items-center justify-between gap-8 rounded-lg bg-gray-500 p-5 shadow-3xl"
          >
            <h1 className="text-lg font-bold">Editar Usuario</h1>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Name"
                  onChange={onChange}
                  value={value}
                  error={errors.name}
                />
              )}
            />

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

            <div className="flex w-full gap-2">
              <Button onClick={close} name="Salvar" />

              <Button onClick={close} name="Fechar" />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
