import { AuthorsService } from './authors.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorProfileRoutingModule } from './author-profile-routing.module';
import { AuthorProfileComponent } from './author-profile.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorProfileRoutingModule
  ],
  declarations: [AuthorProfileComponent],
  providers: [AuthorsService]
})
export class AuthorProfileModule { }
