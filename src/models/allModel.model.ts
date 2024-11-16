export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  role: string;
}

export interface Supplier {
  supplierId: number;
  company: string;
  description: string;
  address: string;
  spocEmail: string;
  spocContact: string;
}

export interface StockOrderItem {
  stockOrderItemId: number;
  productId: number;
  quantity: number;
  stockOrderId: number;
}

export interface StockOrder {
  stockOrderId: number;
  orderDate: Date;
}

export interface Shipment {
  shipmentId: number;
  lastUpdated: Date;
  status: string;
  stockOrderId: number;
}

export interface Product {
  productId: number;
  productName: string;
  description: string;
  image: string;
  stockQuantity: number;
  categoryId: number;
}

export interface ProductCategory {
  categoryId: number;
  category: string;
  nature: string;
}

export interface CustomerOrderItem {
  customerOrderItemId: number;
  productId: number;
  quantity: number;
  customerOrderId: number;
}

export interface CustomerOrder {
  customerOrderId: number;
  orderDate: Date;
}
