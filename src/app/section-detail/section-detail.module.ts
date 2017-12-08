import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionDetailRoutingModule } from './section-detail-routing.module';
import { SectionDetailComponent } from './section-detail.component';
import { SectionDetailService } from './section-detail.service';


@NgModule({
  imports: [
    CommonModule,
    SectionDetailRoutingModule
  ],
  declarations: [
    SectionDetailComponent
  ],
  providers: [SectionDetailService]
})
export class SectionDetailModule { }
