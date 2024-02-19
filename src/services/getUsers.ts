import api from './api'

type GetUserProps = {
  itemsPerPage: number
  page: number
  searchFilter: string
}

export type ItemsEntity = {
  id: string
  image: string
  name: string
  email: string
  password: string
  emailVerified: string
  isTwoFactorEnabled: boolean
  role: string
  createdAt: string
}

type Data = {
  items: ItemsEntity[] | null
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}

export async function getUsers({
  itemsPerPage,
  page,
  searchFilter,
}: GetUserProps) {
  return api
    .get<Data>(
      `/list-user?perPage=${itemsPerPage}&page=${page}&filter=${searchFilter}`,
    )
    .then((response) => response.data)
}
