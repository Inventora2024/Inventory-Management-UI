import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerOrderProducts } from '../../models/customer-order-products.model';
import { CreateSale } from '../../models/create-sale.model'; // Import CreateSale model

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'https://localhost:7022/api/CustomerOrder/Products'; // Adjust the base URL as necessary
  private createSaleUrl = 'https://localhost:7022/api/CustomerOrder/CreateSale';

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

  getCustomerOrderProducts(): Observable<CustomerOrderProducts[]> {
    const headers = this.createHeaders();
    return this.http.get<CustomerOrderProducts[]>(`${this.apiUrl}`, {
      headers,
    });
  }

  createSale(sale: CreateSale): Observable<CreateSale> {
    const headers = this.createHeaders();
    return this.http.post<CreateSale>(this.createSaleUrl, sale, { headers });
  }
}
