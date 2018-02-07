import { RuleDetailComponent } from './rule-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ruleRoutes: Routes = [
  {path: '', component: RuleDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ruleRoutes)],
  exports: [RouterModule]
})
export class RuleDetailRoutingModule { }
