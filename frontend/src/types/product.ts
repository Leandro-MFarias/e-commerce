export interface Product {
  id: number,
  name: string,
  price: number
  stock: number
  imageUrl: string
  categories: { id: string; name: string; }[]
}