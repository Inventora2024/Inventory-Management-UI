export interface Shipment {
  shipmentId: number;
  stockOrderId: number;
  orderId: number;
  orderDate: Date;
  status: string;
  lastUpdated: Date;
}

export interface OnlyShipment {
  shipmentId: number;
  status: string;
  lastUpdated: Date;
  stockOrderId: number;
}
