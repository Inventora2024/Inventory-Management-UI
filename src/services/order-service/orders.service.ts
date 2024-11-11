import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getStockOrderProducts(): Observable<StockOrderProducts[]> {
    return this.http.get<StockOrderProducts[]>(`${this.apiUrl}`);
  }

  createOrder(order: CreateOrder): Observable<CreateOrder> {
    return this.http.post<CreateOrder>(this.createOrderUrl, order);
  }
}
