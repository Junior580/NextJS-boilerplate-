'use client'

// import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'
import api from '@/services/api'

export default function Product() {
  const [data, setData] = useState([])

  useEffect(() => {
    api
      .get(`/list-product?perPage=10&page=1&filter=`)
      .then((response) => setData(response.data.items))
  }, [])

  console.log(`🔥 ~ procuts ${JSON.stringify(data)}`)
  return (
    <div>
      <h1>Produtos</h1>
      {data.map((item) => (
        <div>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.quantityStock}</p>
          <p>{item.unitPurchasePrice}</p>
          <p>{item.unitSalesPrice}</p>
          <p>{item.supplier}</p>
        </div>
      ))}
    </div>
  )
}
