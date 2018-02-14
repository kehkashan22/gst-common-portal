import { SharedModule } from './../shared/shared.module';
import { LawsModule } from './../laws/laws.module';
import { AuthorsService } from './authors.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorProfileRoutingModule } from './author-profile-routing.module';
import { AuthorProfileComponent } from './author-profile.component';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    AuthorProfileRoutingModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    AuthorProfileComponent
  ],
  providers: [AuthorsService]
})
export class AuthorProfileModule { }
