import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateFinderRoutingModule } from './rate-finder-routing.module';
import { RateFinderComponent } from './rate-finder.component';

@NgModule({
  imports: [
    CommonModule,
    RateFinderRoutingModule
  ],
  declarations: [RateFinderComponent]
})
export class RateFinderModule { }
