import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital | any;
  public selectedDoctor: Doctor | any;

  constructor(
    private fb: FormBuilder,
    private _hospitalService: HospitalService,
    private _doctorService: DoctorService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['0', Validators.required],
    });

    this.getHospitals();
    this.doctorForm.get('hospital')?.valueChanges.subscribe({
      next: (res) => {
        this.selectedHospital = this.hospitals.find((h) => h._id === res);
      },
    });
  }

  loadDoctor(id: string) {
    if (id === 'new') return;
    this._doctorService
      .getDoctorById(id)
      .pipe(delay(100))
      .subscribe({
        next: (doctor) => {
          if (!doctor) {
            return this._router.navigateByUrl(`/dashboard/doctors`);
          }
          const {
            name,
            hospital: { _id },
          } = doctor;
          this.selectedDoctor = doctor;
          this.doctorForm.setValue({ name, hospital: _id });
          return true;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id,
      };
      this._doctorService.updateDoctor(data).subscribe({
        next: (res: any) => {
          Swal.fire(
            'Updated successfully!!!',
            `Dr. ${name} successfully updated`,
            'success'
          );
          this._router.navigateByUrl(`/dashboard/doctor/${res.doctor._id}`);
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Oh no!', `Unexpected Error`, 'error');
        },
      });
    } else {
      this._doctorService.createDoctor(this.doctorForm.value).subscribe({
        next: (res: any) => {
          Swal.fire(
            'Created successfully!!!',
            `Dr. ${name} successfully created`,
            'success'
          );
          this._router.navigateByUrl(`/dashboard/doctor/${res.doctor._id}`);
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Oh no!', `Unexpected Error`, 'error');
        },
      });
    }
  }

  getHospitals() {
    this._hospitalService.getHospitals().subscribe({
      next: (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
