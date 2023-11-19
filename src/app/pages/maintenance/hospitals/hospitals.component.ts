import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public HospitalsTemp: Hospital[] = [];
  public loading: boolean = false;
  private imgSubs: Subscription;

  constructor(
    private _hospitalService: HospitalService,
    private _modalService: ModalService,
    private _searchService: SearchesService
  ) {}

  ngOnInit(): void {
    this.getHospitals();
    this.imgSubs = this._modalService.newImg
      .pipe(delay(100))
      .subscribe(() => this.getHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  search(term: string) {
    if (term.length === 0) {
      this.hospitals = this.HospitalsTemp;
      return;
    }
    this._searchService.search('hospitals', term).subscribe({
      next: (res) => {
        this.hospitals = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getHospitals() {
    this.loading = true;
    this._hospitalService.getHospitals().subscribe({
      next: (res) => {
        this.hospitals = res;
        this.HospitalsTemp = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  saveChanges(hospital: Hospital) {
    this._hospitalService
      .updateHospital(hospital._id!, hospital.name)
      .subscribe({
        next: () => {
          this.getHospitals();
          Swal.fire('Successfull', 'Saved succesfully', 'success');
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Oh No!', 'Something has happened', 'error');
        },
      });
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${hospital.name}`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._hospitalService
          .deleteHospital(hospital._id!, hospital.name)
          .subscribe({
            next: () => {
              this.getHospitals();
              Swal.fire('Successfull', 'Delete succesfully', 'success');
            },
            error: (err) => {
              console.error(err);
              Swal.fire('Oh No!', 'Something has happened', 'error');
            },
          });
      }
    });
  }

  async openSwal() {
    const { value = '' }: any = await Swal.fire<string>({
      text: 'Write the name of the hospital',
      input: 'text',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this._hospitalService.createHospital(value).subscribe({
        next: (res: any) => {
          this.hospitals.push(res.hospital);
          Swal.fire('Success', 'Saved Succesfully', 'success');
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Unexpected Error...', 'error');
        },
      });
    }
  }

  openModal(hospital: Hospital) {
    this._modalService.showModal('hospitals', hospital._id!, hospital.img);
  }
}
