import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.development';
import { tap, map, Observable, catchError, of, delay } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;

  constructor(private http: HttpClient, private _router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uId(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  get role(): 'USER_ROLE' | 'ADMIN_ROLE' {
    return this.user.role!;
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${environment.base_url}/users`, formData).pipe(
      tap((res: any) => {
        this.saveLocalStorage(res.token, res.menu);
      })
    );
  }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    return this.http.put(
      `${environment.base_url}/users/${this.uId}`,
      data,
      this.headers
    );
  }

  signIn(formData: any) {
    return this.http.post(`${environment.base_url}/login`, formData).pipe(
      tap((res: any) => {
        this.saveLocalStorage(res.token, res.menu);
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
          this.saveLocalStorage(res.token, res.menu);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('wilkinvsquez@gmail.com', () => {});
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${environment.base_url}/login/renew`, this.headers)
      .pipe(
        map((res: any) => {
          const { email, google, name, role, img = '', uid } = res.user;
          this.user = new User(name, email, '', img, google, role, uid);
          this.saveLocalStorage(res.token, res.menu);

          return true;
        }),
        // map((res: boolean) => true),
        catchError((err) => of(false))
      );
  }

  getUsers(from: number = 0) {
    const url = `${environment.base_url}/users?from=${from}`;
    return this.http.get<any>(url, this.headers).pipe(
      map((res) => {
        const users = res.users.map(
          (user: any) =>
            new User(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return {
          total: res.total,
          users,
        };
      })
    );
  }

  deleteUser(userId: string) {
    const url = `${environment.base_url}/users/${userId}`;
    return this.http.delete(url, this.headers);
  }

  saveUser(user: User) {
    return this.http.put(
      `${environment.base_url}/users/${user.uid}`,
      user,
      this.headers
    );
  }
}
