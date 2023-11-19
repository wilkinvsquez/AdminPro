import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchService: SearchesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: ({ term }) => this.globalSearch(term),
    });
  }

  globalSearch(term: string) {
    this.searchService.globalSearch(term).subscribe({
      next: (res: any) => {
        this.users = res.user;
        this.doctors = res.doctor;
        this.hospitals = res.hospital;
      },
    });
  }
}
