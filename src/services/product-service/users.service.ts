import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../models/users.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private APIurl= '../../assets/TestData/users.json'

  constructor(private http: HttpClient) { }

  getUserList():Observable<Users[]>{
    return this.http.get<Users[]>(this.APIurl);
  }

  createUser(userData: Users): Observable<any> {
    return this.http.post<Users>(this.APIurl, userData);
  }
}
