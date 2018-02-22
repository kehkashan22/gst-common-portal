import { Daterangepicker } from 'ng2-daterangepicker';
import { PipesModule } from './../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    Daterangepicker
  ],
  declarations: [
    UserComponent,
    EditUserComponent,
    UserDetailsComponent,
    EditAccountComponent
]
})
export class UserModule { }
