import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductWithCategory } from '../../models/product-with-category.model';
import { ProductCategorySupplierDetails } from '../../models/product-category-supplier.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productUrl = 'https://localhost:7022/api/Product';
  private productWithCategoryUrl =
    'https://localhost:7022/api/Product/with-categories';
  private productWithDetailsUrl =
    'https://localhost:7022/api/Product/with-categories-suppliers';

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

  getProducts(): Observable<Product[]> {
    const headers = this.createHeaders();
    return this.http.get<Product[]>(this.productUrl, { headers });
  }

  getProductsWithCategory(): Observable<ProductWithCategory[]> {
    const headers = this.createHeaders();
    return this.http.get<ProductWithCategory[]>(this.productWithCategoryUrl, {
      headers,
    });
  }

  getProductsWithDetails(): Observable<ProductCategorySupplierDetails[]> {
    const headers = this.createHeaders();
    return this.http.get<ProductCategorySupplierDetails[]>(
      this.productWithDetailsUrl,
      { headers }
    );
  }

  updateProduct(product: Product): Observable<void> {
    const headers = this.createHeaders();
    const url = `${this.productUrl}/${product.productId}`;
    return this.http.put<void>(url, product, { headers });
  }
}
