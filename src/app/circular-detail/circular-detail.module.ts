import { CircularDetailService } from './circular-detail.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircularDetailRoutingModule } from './circular-detail-routing.module';
import { CircularDetailComponent } from './circular-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CircularDetailRoutingModule
  ],
  declarations: [CircularDetailComponent],
  providers: [CircularDetailService]
})
export class CircularDetailModule { }
