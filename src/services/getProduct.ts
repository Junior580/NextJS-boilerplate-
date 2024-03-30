import { useQuery } from 'react-query'
import api from './api'

type GetUserProps = {
  itemsPerPage: number
  page: number
  searchFilter: string
}

export type ItemsEntity = {
  id: string
  name: string
  description: string
  quantityStock: number
  unitPurchasePrice: number
  unitSalesPrice: number
  supplier: string | null
}

type Data = {
  items: ItemsEntity[] | null
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}

export async function useGetProducts({
  itemsPerPage,
  page,
  searchFilter,
}: GetUserProps) {
  return api
    .get<Data>(
      `/list-product?perPage=${itemsPerPage}&page=${page}&filter=${searchFilter}`,
    )
    .then((response) => response.data)
}

// export function useGetPosts({
//   itemsPerPage,
//   page,
//   searchFilter,
// }: GetUserProps) {
//   return useQuery({
//     queryFn: async () => fetchPosts(),
//     queryKey: ['posts'],
//   })
// }
