export interface CreateOrder {
  orderDate: Date;
  orderItems: CreateOrderItem[];
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}
