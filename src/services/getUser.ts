import api from './api'

type SortProps =
  | 'name'
  | 'email'
  | 'emailVerified'
  | 'image'
  | 'role'
  | 'isTwoFactorEnabled'
  | 'createdAt'

type GetUserProps = {
  itemsPerPage: number
  page: number
  searchFilter: string
  sortDir: 'asc' | 'desc'
  sort: SortProps
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
  sortDir,
  sort,
}: GetUserProps) {
  return api
    .get<Data>(
      `/list-user?perPage=${itemsPerPage}&page=${page}&sortDir=${sortDir}&sort=${sort}&filter=${searchFilter}`,
    )
    .then((response) => response.data)
}
