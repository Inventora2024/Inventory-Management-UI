import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment, OnlyShipment } from '../../models/shipment.model';

@Injectable({
  providedIn: 'root',
})
export class ShipmentsService {
  private ordersApiUrl =
    'https://localhost:7022/api/StockOrder/OrdersWithShipments'; // Existing URL for fetching orders with shipments
  private shipmentApiUrl = 'https://localhost:7022/api/Shipment'; // New URL for updating shipment status

  constructor(private http: HttpClient) {}

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.ordersApiUrl}`);
  }

  updateShipment(shipment: OnlyShipment): Observable<void> {
    const url = `${this.shipmentApiUrl}/${shipment.shipmentId}`;
    return this.http.put<void>(url, shipment);
  }

  getShipmentById(orderId: number): Observable<Shipment> {
    const url = `${this.ordersApiUrl}/${orderId}`;
    return this.http.get<Shipment>(url);
  }
}
