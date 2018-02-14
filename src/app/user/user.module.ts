import { PipesModule } from './../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [
    UserComponent,
    EditUserComponent,
    UserDetailsComponent
]
})
export class UserModule { }
