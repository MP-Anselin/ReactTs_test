export interface Product {
  created_at: string,
  name: string,
  price: number
  product_code: string,
  updated_at: string,
  idDate: number
  isDone: boolean,
  _id?: {$oid: string},
}
