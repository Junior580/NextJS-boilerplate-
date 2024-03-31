export default function formatCurrency(value: string) {
  const priceNumber = parseInt(value)
  return priceNumber.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
