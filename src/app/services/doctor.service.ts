import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

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

  getDoctors() {
    const url = `${environment.base_url}/doctors`;
    return this.http
      .get<Doctor[]>(url, this.headers)
      .pipe(map((resp: any) => resp.doctors));
  }

  getDoctorById(id: string) {
    const url = `${environment.base_url}/doctors/${id}`;
    return this.http
      .get<Doctor[]>(url, this.headers)
      .pipe(map((resp: any) => resp.doctor));
  }

  createDoctor(doctor: { name: string; hospital: string }) {
    const url = `${environment.base_url}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${environment.base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(_id: string) {
    const url = `${environment.base_url}/doctors/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
