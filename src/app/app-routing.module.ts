import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';

import { NofoundpageComponent } from './nofoundpage/nofoundpage.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NofoundpageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [
    PagesRoutingModule,
    AuthRoutingModule
  ],
})
export class AppRoutingModule { }
