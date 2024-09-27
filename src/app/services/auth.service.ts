import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../models/auth.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://entertainment-web-app-backend-2.onrender.com/api';

  constructor(private http: HttpClient) {}

  signupUser(data: UserData): Observable<unknown> {
    return this.http.post<UserData>(`${this.apiUrl}/register`, data).pipe(
      catchError((error) => {
        console.log("Couldn't create account: ", error);
        return throwError(() => new Error(error));
      })
    );
  }

  loginUser(data: UserData): Observable<unknown> {
    return this.http.post<UserData>(`${this.apiUrl}/login`, data);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
