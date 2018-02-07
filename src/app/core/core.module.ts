import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { NotifyService } from 'app/auth/notify.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
],
  imports: [
    CommonModule,
    RouterModule
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
