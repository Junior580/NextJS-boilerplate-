export interface UsersData {
  items: ItemsEntity[] | null
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}
export interface ItemsEntity {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}
