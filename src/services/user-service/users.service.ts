import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserSafeData } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://localhost:7022/api/User'; // Replace with your API URL

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

  getUsers(): Observable<User[]> {
    const headers = this.createHeaders();
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  getUserById(userId: number): Observable<User> {
    const headers = this.createHeaders();
    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers });
  }

  createUser(user: User): Observable<User> {
    const headers = this.createHeaders();
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  updateUser(userId: number, user: User): Observable<User> {
    const headers = this.createHeaders();
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user, { headers });
  }

  // New method to get users with limited fields
  getUsersDisplay(): Observable<UserSafeData[]> {
    const headers = this.createHeaders();
    return this.http.get<UserSafeData[]>(`${this.apiUrl}/display`, { headers });
  }
}
