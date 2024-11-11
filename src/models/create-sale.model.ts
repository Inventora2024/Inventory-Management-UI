export interface CreateSale {
  orderDate: Date;
  saleItems: CreateSaleItem[];
}

export interface CreateSaleItem {
  productId: number;
  quantity: number;
}
