import { Products } from "./../model/typeProducts"; 

export interface ShoppingCartType {
  items: Products[],
  total: number,
  taxRate: number,
}