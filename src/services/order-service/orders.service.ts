import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockOrderProducts } from '../../models/stock-order-products.model';
import { CreateOrder } from '../../models/create-order.model'; // Import CreateOrder model

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'https://localhost:7022/api/StockOrder/Products'; // Adjust the base URL as necessary
  private createOrderUrl = 'https://localhost:7022/api/StockOrder/CreateOrder';

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

  getStockOrderProducts(): Observable<StockOrderProducts[]> {
    const headers = this.createHeaders();
    return this.http.get<StockOrderProducts[]>(`${this.apiUrl}`, { headers });
  }

  createOrder(order: CreateOrder): Observable<CreateOrder> {
    const headers = this.createHeaders();
    return this.http.post<CreateOrder>(this.createOrderUrl, order, { headers });
  }
}
