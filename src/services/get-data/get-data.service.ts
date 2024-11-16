import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  User,
  Supplier,
  Product,
  ProductCategory,
  StockOrder,
  StockOrderItem,
  CustomerOrder,
  CustomerOrderItem,
  Shipment,
} from '../../models/allModel.model';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private apiUrl = 'https://localhost:7022/api';

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

  // Get Users
  getUsers(): Observable<User[]> {
    const headers = this.createHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/User`, { headers });
  }

  // Get Suppliers
  getSuppliers(): Observable<Supplier[]> {
    const headers = this.createHeaders();
    return this.http.get<Supplier[]>(`${this.apiUrl}/Supplier`, { headers });
  }

  // Get Products
  getProducts(): Observable<Product[]> {
    const headers = this.createHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/Product`, { headers });
  }

  // Get Product Categories
  getProductCategories(): Observable<ProductCategory[]> {
    const headers = this.createHeaders();
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/ProductCategory`, {
      headers,
    });
  }

  // Get Stock Orders
  getStockOrders(): Observable<StockOrder[]> {
    const headers = this.createHeaders();
    return this.http.get<StockOrder[]>(`${this.apiUrl}/StockOrder`, {
      headers,
    });
  }

  // Get Stock Order Items
  getStockOrderItems(): Observable<StockOrderItem[]> {
    const headers = this.createHeaders();
    return this.http.get<StockOrderItem[]>(`${this.apiUrl}/StockOrderItem`, {
      headers,
    });
  }

  // Get Customer Orders
  getCustomerOrders(): Observable<CustomerOrder[]> {
    const headers = this.createHeaders();
    return this.http.get<CustomerOrder[]>(`${this.apiUrl}/CustomerOrder`, {
      headers,
    });
  }

  // Get Customer Order Items
  getCustomerOrderItems(): Observable<CustomerOrderItem[]> {
    const headers = this.createHeaders();
    return this.http.get<CustomerOrderItem[]>(
      `${this.apiUrl}/CustomerOrderItem`,
      { headers }
    );
  }

  // Get Shipments
  getShipments(): Observable<Shipment[]> {
    const headers = this.createHeaders();
    return this.http.get<Shipment[]>(`${this.apiUrl}/Shipment`, { headers });
  }
}
