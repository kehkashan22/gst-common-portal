import { SharedModule } from './../shared/shared.module';
import { LawsModule } from './../laws/laws.module';
import { AuthorsService } from './authors.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorProfileRoutingModule } from './author-profile-routing.module';
import { AuthorProfileComponent } from './author-profile.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthorProfileComponent
  ],
  providers: [AuthorsService]
})
export class AuthorProfileModule { }
