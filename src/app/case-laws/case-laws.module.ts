import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseLawsRoutingModule } from './case-laws-routing.module';
import { CaseLawsComponent } from './case-laws.component';

@NgModule({
  imports: [
    CommonModule,
    CaseLawsRoutingModule
  ],
  declarations: [CaseLawsComponent]
})
export class CaseLawsModule { }
