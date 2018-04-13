import { SharedModule } from './../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { NotifyService } from 'app/auth/notify.service';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    WelcomeComponent
],
  imports: [
    CommonModule,

    RouterModule,
    SharedModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    // AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    AuthService,
    NotifyService
  ]
})
export class CoreModule {}
