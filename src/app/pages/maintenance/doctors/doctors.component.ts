import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];
  public loading: boolean = false;
  private imgSubs: Subscription;
  constructor(
    private _modalService: ModalService,
    private _doctorService: DoctorService,
    private _searchService: SearchesService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.imgSubs = this._modalService.newImg
      .pipe(delay(100))
      .subscribe(() => this.getDoctors());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getDoctors() {
    this.loading = true;
    this._doctorService.getDoctors().subscribe({
      next: (res) => {
        this.doctors = res;
        this.doctorsTemp = res;
        this.loading = false;
        console.log(this.doctors);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  search(term: string) {
    if (term.length === 0) {
      this.doctors = this.doctorsTemp;
      return;
    }
    this._searchService.search('doctors', term).subscribe({
      next: (res) => {
        this.doctors = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${doctor.name}`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._doctorService.deleteDoctor(doctor._id!).subscribe({
          next: () => {
            this.getDoctors();
            Swal.fire('Successful', 'Delete successfully', 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Oh No!', 'Something has happened', 'error');
          },
        });
      }
    });
  }

  openModal(doctor: Doctor) {
    this._modalService.showModal('doctors', doctor._id!, doctor.img);
  }
}
