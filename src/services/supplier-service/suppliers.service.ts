import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../../models/supplier.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private apiUrl = 'https://localhost:7022/api/Supplier'; // Adjust the base URL as necessary

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

  getSuppliers(): Observable<Supplier[]> {
    const headers = this.createHeaders();
    return this.http.get<Supplier[]>(this.apiUrl, { headers });
  }

  getSupplier(id: number): Observable<Supplier> {
    const headers = this.createHeaders();
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`, { headers });
  }

  updateSupplier(id: number, supplier: Supplier): Observable<void> {
    const headers = this.createHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}`, supplier, { headers });
  }
}
