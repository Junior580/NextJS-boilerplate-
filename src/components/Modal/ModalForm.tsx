import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useCallback } from 'react'
import { useMutation } from 'react-query'
import api from '@/services/api'

const SignUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
})

type SignUpType = z.infer<typeof SignUpSchema>

type ModalProps = {
  onSubmitClick: () => void
  user: SignUpType
  title: string
}

export default function ModalForm({ title, user, onSubmitClick }: ModalProps) {
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
    <form
      onSubmit={handleSubmit(onSubmitClick)}
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
  )
}
