'use client'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import z from 'zod'

import api from '@/services/api'
import { useToast } from '@/components/ui/use-toast'
import formatDate from '@/lib/formatDate'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

const SupplierSchema = z.object({
  name: z.string().min(5),
  contact: z.string().optional(),
  phone: z.string().optional(),
})

type SupplierSchemaType = z.infer<typeof SupplierSchema>

export default function CreateSupplier() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierSchemaType>({
    resolver: zodResolver(SupplierSchema),
  })

  const { mutate } = useMutation({
    mutationFn: async (data: SupplierSchemaType) => {
      return api.post('/supplier', {
        ...data,
        name: capitalizeFirstLetter(data.name),
      })
    },
    onSuccess: (e) => {
      toast({
        variant: 'default',
        title: 'Fornecedor cadastrado com sucesso',
        description: formatDate(e.data.createdAt),
      })
      return
    },
    onError: (e: any) => {
      if (e.statusCode === 409) {
        toast({
          variant: 'destructive',
          title: 'Erro no cadastro',
          description: 'Fornecedor já cadastrado',
        })
        return
      }

      toast({
        variant: 'destructive',
        title: 'Erro desconhecido',
        description: 'Tente mais tarde',
      })
      return
    },
  })

  const onSubmit: SubmitHandler<SupplierSchemaType> = useCallback(
    async (data) => mutate(data),
    [],
  )

  return (
    <main className="p-4">
      <section className="flex w-full items-center justify-between rounded-lg  px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/supplier">Fornecedores</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Novo Fornecedor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <Separator className="my-4" />

      <section className="rounded-3xlshadow-md relative   sm:rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label>Nome</Label>

          <Input {...register('name')} />
          {errors.name && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.name.message}</AlertDescription>
            </Alert>
          )}

          <Label>Contato</Label>
          <Input {...register('contact')} />
          {errors.name && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.contact?.message}</AlertDescription>
            </Alert>
          )}

          <Label>Telefone</Label>

          <Input {...register('phone')} />
          {errors.name && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.phone?.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 self-end pt-2">
            <Button variant="destructive">Cancelar</Button>
            <Button type="submit">Enviar</Button>
          </div>
        </form>

        <Separator className="my-4" />
      </section>
    </main>
  )
}

const teste = {
  data: {
    id: 'ecbfd3ea-374b-4bdf-9925-8be52deedbcd',
    createdAt: '2024-03-31T18:16:35.755Z',
    name: 'Company 0001',
  },
  status: 201,
  statusText: 'Created',
  headers: {
    'content-length': '106',
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
    url: '/supplier',
    data: '{"name":"Company 0001"}',
  },
  request: {},
}
