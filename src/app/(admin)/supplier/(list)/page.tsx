'use client'

import PaginationControl from '@/components/PaginationControl'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import formatDate from '@/lib/formatDate'
import { useGetSupplier } from '@/services/getSupplier'
import { FileEdit, Search, Trash } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

export default function Supplier() {
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    itemsPerPage: 10,
    currentPage: 1,
    lastPage: 0,
  })

  const handleChange = useCallback(
    (key: keyof PaginationProps, value: number) => {
      setPagination((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  const { data, isError, isLoading } = useQuery(
    ['supplier-list', pagination],
    () =>
      useGetSupplier({
        itemsPerPage: pagination.itemsPerPage,
        page: pagination.page,
        searchFilter: searchFilter,
      }),
    { keepPreviousData: true, staleTime: 5000 },
  )

  if (isError) {
    return (
      <p className="font-bold text-red-400 shadow-2xl">
        Error ao obter os dados
      </p>
    )
  }
  return (
    <main className="p-4">
      <section className="flex  w-full items-center justify-between rounded-lg bg-yellow-500 px-4 py-3">
        {isLoading && <Skeleton className="h-[20px] w-[100px] rounded-md" />}
        {!isLoading && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Fornecedores</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <div className="mr-6 flex w-52 flex-col items-center gap-4">
          <div className="flex h-full w-full items-center justify-center rounded-3xl  px-3 duration-300 ease-in-out  hover:w-64">
            {isLoading && (
              <Skeleton className="h-[20px] w-[100px] rounded-md" />
            )}
            {!isLoading && (
              <>
                <input
                  type="search"
                  placeholder="Search Data..."
                  className="w-full rounded-xl border-none bg-transparent px-1 py-2 outline-none"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                <Search />
              </>
            )}
          </div>

          <div>
            {isLoading && (
              <Skeleton className="h-[20px] w-[100px] rounded-md" />
            )}
            {!isLoading && (
              <Button asChild>
                <Link href="/supplier/create">Cadastrar fornecedor</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <Separator className="my-4" />

      <section className="relative max-h-[75vh] overflow-y-auto  rounded-3xl shadow-md sm:rounded-lg">
        <Table className="mr-7 border-collapse text-left text-sm">
          <TableHeader className=" text-xs uppercase ">
            {isLoading && (
              <TableRow>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-[20px] w-[90px] rounded-md" />
                </TableHead>
              </TableRow>
            )}
            {!isLoading && (
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                </TableRow>
                <TableRow className="whitespace-nowrap  px-6  py-4 font-medium">
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-[90px] rounded-md" />
                  </TableCell>
                </TableRow>
              </>
            )}
            {data?.items?.map((item) => (
              <TableRow
                key={item.id}
                className="whitespace-nowrap  px-6  py-4 font-medium"
              >
                <TableCell>{item.id.split('-')[0]}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.contact ?? 'Não informado'}</TableCell>
                <TableCell>{item.phone ?? 'Não informado'}</TableCell>

                <TableCell>{formatDate(item.createdAt)}</TableCell>

                <TableCell>
                  <Dialog>
                    <DialogTrigger className="hover:bg-primary_hover cursor-pointer rounded-lg p-1  duration-150 ease-in-out">
                      <FileEdit />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Deseja editar o Produto {item.name} ?
                        </DialogTitle>
                      </DialogHeader>
                      <form className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">Name</Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.name}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Contato
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.contact}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Telefone
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.phone}
                          />
                        </div>

                        <DialogFooter className="mt-2 flex w-full justify-between gap-2">
                          <Button
                            type="submit"
                            variant="default"
                            className="w-full"
                            onClick={() => console.log('usuario editado')}
                          >
                            Salvar
                          </Button>
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full">
                              Cancelar
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger className="hover:bg-primary_hover cursor-pointer rounded-lg p-1  duration-150 ease-in-out">
                      <Trash />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Deletar o usuario {item.name}?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <Separator className="my-4" />

      <PaginationControl
        currentPage={data?.currentPage ?? 1}
        lastPage={data?.lastPage ?? 0}
        page={data?.currentPage ?? 1}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </main>
  )
}
