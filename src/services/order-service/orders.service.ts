import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockOrderProducts } from '../../models/stock-order-products.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'https://localhost:7022/api/StockOrder/Products'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getStockOrderProducts(): Observable<StockOrderProducts[]> {
    return this.http.get<StockOrderProducts[]>(`${this.apiUrl}`);
  }
}
