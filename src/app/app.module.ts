import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NofoundpageComponent } from './nofoundpage/nofoundpage.component';

@NgModule({
  declarations: [AppComponent, NofoundpageComponent],
  imports: [AppRoutingModule, BrowserModule, PagesModule, AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
