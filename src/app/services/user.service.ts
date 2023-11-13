import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.development';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uId(): string {
    return this.user.uid || '';
  }

  constructor(private http: HttpClient, private _router: Router) {}

  createUser(formData: RegisterForm) {
    return this.http.post(`${environment.base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.user.role!,
    };
    return this.http.put(`${environment.base_url}/users/${this.uId}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  signIn(formData: any) {
    return this.http.post(`${environment.base_url}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  signInGoogle(token: string) {
    return this.http
      .post(`${environment.base_url}/login/google`, {
        token,
        headers: 'Cross-Origin-Opener-Policy: same-origin',
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('wilkinvsquez@gmail.com', () => {});
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${environment.base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const { email, google, name, role, img = '', uid } = res.user;
          this.user = new User(name, email, '', img, google, role, uid);
          localStorage.setItem('token', res.token);
          return true;
        }),
        // map((res: boolean) => true),
        catchError((err) => of(false))
      );
  }
}
