export interface ApiProduct {
  id: string
  name: string
  price: string
  category: string
  available: boolean
  image?: string
}

export interface Product {
  id: string
  name: string
  price: number
  formattedPrice: string
  category: string
  available: boolean
  image?: string
}

export interface ProductToolbarProps {
  categories: string[]
}

export interface ToolbarFiltersType {
  category: string
  availability: string
  sort: '' | 'asc' | 'desc'
}
