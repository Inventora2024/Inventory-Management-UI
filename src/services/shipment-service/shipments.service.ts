import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getShipments(): Observable<Shipment[]> {
    const headers = this.createHeaders();
    return this.http.get<Shipment[]>(`${this.ordersApiUrl}`, { headers });
  }

  updateShipment(shipment: OnlyShipment): Observable<void> {
    const headers = this.createHeaders();
    const url = `${this.shipmentApiUrl}/${shipment.shipmentId}`;
    return this.http.put<void>(url, shipment, { headers });
  }

  getShipmentById(orderId: number): Observable<Shipment> {
    const headers = this.createHeaders();
    const url = `${this.ordersApiUrl}/${orderId}`;
    return this.http.get<Shipment>(url, { headers });
  }
}
