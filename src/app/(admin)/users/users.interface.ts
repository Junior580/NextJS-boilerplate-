export interface UsersData {
  items: ItemsEntity[] | null
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}
export interface ItemsEntity {
  id: string
  image: string
  name: string
  email: string
  password: string
  emailVerified: string
  isTwoFactorEnabled: string
  role: string
  createdAt: string
}
