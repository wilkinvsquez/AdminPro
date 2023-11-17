import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient, private _router: Router) {}

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  getHospitals() {
    const url = `${environment.base_url}/hospitals`;
    return this.http
      .get<Hospital[]>(url, this.headers)
      .pipe(map((resp: any) => resp.hospitals));
  }

  createHospital(name: string) {
    const url = `${environment.base_url}/hospitals`;
    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(_id: string, name: string) {
    const url = `${environment.base_url}/hospitals/${_id}`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(_id: string, name: string) {
    const url = `${environment.base_url}/hospitals/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
