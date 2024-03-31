import { format } from 'date-fns'

export default function formatDate(value: string) {
  return format(value, "dd/MM/yyyy 'às' HH:mm:ss")
}
