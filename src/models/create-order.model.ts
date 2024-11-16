export interface CreateOrder {
  orderDate: String;
  orderItems: CreateOrderItem[];
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}
