export interface CustomerOrderProducts {
  customerOrderId: number;
  orderDate: Date;
  customerOrderItems: CustomerOrderItem[];
}

export interface CustomerOrderItem {
  customerOrderItemId: number;
  productId: number;
  quantity: number;
  productName: string;
}
