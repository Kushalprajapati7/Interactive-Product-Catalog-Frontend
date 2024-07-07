import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/userInterface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user';
  private token: string | null = null;
  private tokenKey = 'auth_token';
  private roleKey = 'auth_role';
  private nameKey = 'userName';
  private idKey = 'userId';
  private isAuthenticated: boolean = false;
  private role: string = ''
  private userName: string = '';
  private userId: string = '';
  constructor(private http: HttpClient, private router: Router) { }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, user)
  }

  loginUser(email: string, password: string): Observable<any> {
    const body = { email, password }
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      map(response => {
        this.token = response.response.token;
        this.role = response.response.role;
        this.userName = response.response.userName;
        this.userId = response.response.userId;

        if (!this.token) {
          return
        }
        localStorage.setItem(this.tokenKey, this.token)
        localStorage.setItem(this.roleKey, this.role)
        localStorage.setItem(this.nameKey, this.userName)
        localStorage.setItem(this.idKey, this.userId)
        this.isAuthenticated = true;

        return response;
      })
    )
  }

  getToken(): string | null {
    return this.token;
  }

  getUserId(): string | null {
    return localStorage.getItem(this.idKey);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated, !!this.token;
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return headers;
  }

  logout() {
    // this.token = null;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth/login']);
  }

  isAdmin(): boolean {
    const storedRole = localStorage.getItem(this.roleKey);
    return storedRole === 'admin';
  }

  getRole(): string | null {
    const storedRole = localStorage.getItem(this.roleKey);
    return storedRole;
  }

  getUserName(): string | null {
    const storedUserName = localStorage.getItem(this.nameKey)
    return storedUserName;
  }


}
