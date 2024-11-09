import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductsWithCategory(): Observable<ProductWithCategory[]> {
    return this.http.get<ProductWithCategory[]>(this.productWithCategoryUrl);
  }

  getProductsWithDetails(): Observable<ProductCategorySupplierDetails[]> {
    return this.http.get<ProductCategorySupplierDetails[]>(
      this.productWithDetailsUrl
    );
  }
}
