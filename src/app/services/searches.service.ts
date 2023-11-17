import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { ImagePipe } from '../pipes/image.pipe';

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
  constructor(private _http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformUsers(results: any[]) {
    return results.map(
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
  }

  search(type: 'users' | 'doctors' | 'hospitals', term: string) {
    const url = `${environment.base_url}/search/collection/${type}/${term}`;
    return this._http.get<any[]>(url, this.headers).pipe(
      map((res: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(res.results);
          case 'hospitals':
            return res.results;
          case 'doctors':
            return res.results;
          default:
            return [];
        }
      })
    );
  }
}
