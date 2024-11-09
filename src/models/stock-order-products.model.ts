export interface StockOrderProducts {
  stockOrderId: number;
  orderDate: Date;
  stockOrderItems: StockOrderItem[];
}

export interface StockOrderItem {
  stockOrderItemId: number;
  productId: number;
  quantity: number;
  productName: string;
}
