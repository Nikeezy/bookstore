import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/accounts/';

  constructor(private http: HttpClient ) { }

  registration(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}registration/`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials);
  }

  logout(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}logout/`, { refresh: refreshToken });
  }

  getUserProfile(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User>(`${this.apiUrl}profile`, { headers });
  }

  isAuthenticated(): Observable<boolean> {
    return this.verifyToken();
  }

  verifyToken(): Observable<boolean> {
    const accessToken = localStorage.getItem('access');

    if (!accessToken) {
      return of(false);
    }

    try {
      const decodedToken: any = jwtDecode(accessToken);
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);

      if (expirationDate < new Date()) {
        localStorage.clear();
        return of(false);
      }

      return this.http.post(`${this.apiUrl}token/verify/`, { token: accessToken }).pipe(
        map(() => true),
        catchError(() => {
          localStorage.clear();
          return of(false);
        })
      );
    } catch (error) {
      localStorage.clear();
      return of(false);
    }
  }
}
