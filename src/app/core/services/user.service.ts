import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient, private router: Router) { }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, user)
  }

  allUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/allUser`)
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteUser/${id}`)
  }

  
}
