'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import z from 'zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useCallback } from 'react'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'
import { useMutation } from 'react-query'
import api from '@/services/api'
import { useToast } from '@/components/ui/use-toast'
import formatDate from '@/lib/formatDate'

const SupplierSchema = z.object({
  name: z.string().min(5),
  contact: z.string().optional(),
  phone: z.string().optional(),
})

type SupplierSchemaType = z.infer<typeof SupplierSchema>

export default function CreateSupplier() {
  const { toast } = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierSchemaType>({
    resolver: zodResolver(SupplierSchema),
  })

  const { mutate, error } = useMutation({
    mutationFn: async (data: SupplierSchemaType) => {
      return api.post('/supplier', {
        ...data,
        name: capitalizeFirstLetter(data.name),
      })
    },
    onSuccess: (e) => {
      toast({
        variant: 'default',
        title: 'Cadastro realizado com sucesso',
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
        {false && <Skeleton className="h-[20px] w-[100px] rounded-md" />}
        {!false && (
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
        )}
      </section>

      <Separator className="my-4" />

      <section className="rounded-3xlshadow-md relative   sm:rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label>Nome</Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <>
                <Input onChange={onChange} value={value} />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.name.message}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

          <Label>Contato</Label>
          <Controller
            control={control}
            name="contact"
            render={({ field: { onChange, value } }) => (
              <>
                <Input onChange={onChange} value={value} />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {errors.contact?.message}
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

          <Label>Telefone</Label>

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <>
                <Input onChange={onChange} value={value} />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.phone?.message}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          />

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
