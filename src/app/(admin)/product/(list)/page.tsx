'use client'

import { useCallback, useState } from 'react'
import { FileEdit, Search, Trash } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetProducts } from '@/services/getProduct'
import { useQuery } from 'react-query'
import PaginationControl from '@/components/PaginationControl'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import formatCurrency from '@/lib/formatCurrency'
import formatDate from '@/lib/formatDate'
import { withAuth } from '@/components/WithAuth'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

function ListProduct() {
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
    ['product-list', pagination],
    () =>
      useGetProducts({
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
      <section className="flex w-full items-center justify-between rounded-lg px-4 py-3">
        {isLoading && <Skeleton className="h-[20px] w-[100px] rounded-md" />}
        {/* {!isLoading && <h1 className="font-bold">Produtos</h1>} */}
        {!isLoading && (
          <Breadcrumb>
            <BreadcrumbList>
              {/* <BreadcrumbItem>
                <BreadcrumbLink href="/product">Produtos</BreadcrumbLink>
              </BreadcrumbItem> */}
              {/* <BreadcrumbSeparator /> */}
              {/* <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem> */}
              {/* <BreadcrumbSeparator /> */}
              <BreadcrumbItem>
                <BreadcrumbPage>Produtos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <div className="mr-6 flex w-52 flex-col items-center gap-4">
          <div className="flex h-full w-52 items-center justify-center rounded-3xl  px-3 duration-300 ease-in-out hover:w-64">
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
                <Link href="/product/create">Cadastrar Produto</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
      <section className="relative max-h-[75vh] overflow-y-auto  rounded-3xl shadow-md sm:rounded-lg">
        <Table className="mr-7 border-collapse text-left text-sm">
          <TableHeader className="text-xs uppercase">
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
                <TableHead>Descrição</TableHead>
                <TableHead>Qtd. em estoque</TableHead>
                <TableHead>Preço unitário de compra</TableHead>
                <TableHead>Preço unitário de venda</TableHead>
                <TableHead>Fornecedor</TableHead>
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
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantityStock}</TableCell>
                <TableCell>
                  {formatCurrency(String(item.unitPurchasePrice))}
                </TableCell>
                <TableCell>
                  {formatCurrency(`${item.unitSalesPrice}`)}
                </TableCell>
                <TableCell>{item.supplier ?? 'Desconhecido'}</TableCell>
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
                            Descrição
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.description}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Qtd em estoque
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.quantityStock}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Preço de compra
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.unitPurchasePrice}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Preço de venda
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.unitSalesPrice}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label className="inline-block w-[90px]">
                            Fornecedor
                          </Label>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue={item.supplier ?? 'desconhecido'}
                          />
                        </div>

                        <DialogFooter className="mt-2 flex w-full justify-between gap-2">
                          <Button
                            type="submit"
                            variant="default"
                            className="w-full"
                            onClick={() => console.log('produto atualizado')}
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

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Deletar o produto {item.name} ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. Isto irá
                          permanentemente exclua sua conta e remova seus dados
                          de nosso servidores.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => console.log(`❌ produto ex cluido`)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

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

export default withAuth(ListProduct, ['ADMIN', 'USER'])
