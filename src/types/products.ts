export type ProductCategory = 'tshirt' | 'notebook'

export interface IProduct {
  id: number
  title: string
  category: ProductCategory
  price: number
  color: string
  imageColor: string
  description: string
}