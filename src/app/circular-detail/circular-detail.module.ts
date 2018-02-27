import { PipesModule } from './../pipes/pipes.module';
import { CircularDetailService } from './circular-detail.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircularDetailRoutingModule } from './circular-detail-routing.module';
import { CircularDetailComponent } from './circular-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CircularDetailRoutingModule,
    RouterModule,
    PipesModule
  ],
  declarations: [CircularDetailComponent],
  providers: [CircularDetailService]
})
export class CircularDetailModule { }
