import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getCustomerOrderProducts(): Observable<CustomerOrderProducts[]> {
    return this.http.get<CustomerOrderProducts[]>(`${this.apiUrl}`);
  }

  createSale(sale: CreateSale): Observable<CreateSale> {
    return this.http.post<CreateSale>(this.createSaleUrl, sale);
  }
}
