import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionDetailRoutingModule } from './section-detail-routing.module';
import { SectionDetailComponent } from './section-detail.component';
import { SectionDetailService } from './section-detail.service';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    SectionDetailRoutingModule,
    RouterModule
  ],
  declarations: [
    SectionDetailComponent
  ],
  providers: [SectionDetailService]
})
export class SectionDetailModule { }
