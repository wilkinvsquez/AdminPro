import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { adminGuard } from '../guards/admin.guard';
import { RouterModule } from '@angular/router';

const childRoutes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' },
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { title: 'Graph' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Settings' },
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    data: { title: 'Searches' },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: { title: 'Promises' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'User Profile' },
  },

  // Maintenance
  {
    path: 'users',
    canActivate: [adminGuard],
    component: UsersComponent,
    data: { title: 'Application User' },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Application Hospital' },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: { title: 'Application Doctor' },
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    data: { title: 'Application Doctor' },
  },
];
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
