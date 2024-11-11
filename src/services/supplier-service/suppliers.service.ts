import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../../models/supplier.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private apiUrl = 'https://localhost:7022/api/Supplier'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  getSupplier(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  updateSupplier(id: number, supplier: Supplier): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, supplier);
  }
}
