import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useCallback } from 'react'
import { useMutation } from 'react-query'
import api from '@/services/api'
import Button from '../Button'

const SignUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
})

type SignUpType = z.infer<typeof SignUpSchema>

type ModalProps = {
  close: () => void
  user: SignUpType
  title: string
}

export default function ModalForm({ title, user, close }: ModalProps) {
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
    async (data) => {
      console.log(`Submited`)
      mutate(data)
    },
    [mutate],
  )
  return (
    <div className="flex w-[500px] flex-col  items-center justify-between gap-8 rounded-lg bg-gray-500 p-4 shadow-3xl">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col  items-center justify-between gap-8  bg-gray-500 "
      >
        <h1 className="text-lg font-bold">{title}</h1>

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
      </form>

      <div className="flex w-full gap-2">
        <Button onSubmit={handleSubmit(onSubmit)} name="Atualizar" />

        <Button onClick={close} name="Fechar" />
      </div>
    </div>
  )
}
