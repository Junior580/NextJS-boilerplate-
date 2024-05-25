import { useQuery } from 'react-query'
import api from './api'

type GetSupplierProps = {
  itemsPerPage: number
  page: number
  searchFilter: string
}

export type ItemsEntity = {
  id: string
  name: string
  contact: string
  phone: string
  createdAt: string
}

type Data = {
  items: ItemsEntity[] | null
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}

export async function getSupplier({
  itemsPerPage,
  page,
  searchFilter,
}: GetSupplierProps) {
  return api
    .get<Data>(
      `/list-supplier?perPage=${itemsPerPage}&page=${page}&filter=${searchFilter}`,
    )
    .then((response) => response.data)
}
