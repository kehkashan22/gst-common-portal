import { RuleDetailService } from './rule-detail.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleDetailRoutingModule } from './rule-detail-routing.module';
import { RuleDetailComponent } from './rule-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RuleDetailRoutingModule
  ],
  declarations: [RuleDetailComponent],
  providers: [RuleDetailService]
})
export class RuleDetailModule { }
