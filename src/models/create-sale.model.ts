export interface CreateSale {
  orderDate: String;
  saleItems: CreateSaleItem[];
}

export interface CreateSaleItem {
  productId: number;
  quantity: number;
}
