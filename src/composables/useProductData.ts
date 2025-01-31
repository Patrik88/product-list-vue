import { useQuery } from '@tanstack/vue-query'
import type { Product, ApiProduct } from '../types/index'
import { formatCurrency } from '../utils/formatCurrency'

// Fetches product data from the API and formats it for use in the application
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://679a7cb7747b09cdcccf02ba.mockapi.io/products')

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data: ApiProduct[] = await response.json()

  // Map API response to internal Product type, formatting the price
  const products = data.map((item) => {
    const numericPrice = parseFloat(item.price) || 0
    return {
      id: item.id,
      name: item.name,
      price: numericPrice,
      formattedPrice: formatCurrency(numericPrice),
      category: item.category,
      available: item.available,
      image: item.image ?? ''
    }
  })

  return products
}

// Custom hook to manage product data fetching with caching
export function useProductData() {
  return useQuery({
    queryKey: ['products'], // Unique key for caching
    queryFn: fetchProducts, // Function to fetch data
    staleTime: 60000, // Data is considered fresh for 1 minute
    refetchOnWindowFocus: false // Prevent refetching on window focus
  })
}
