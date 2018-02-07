import { CircularDetailComponent } from './circular-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const circularRoutes: Routes = [
  {path: '', component: CircularDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(circularRoutes)],
  exports: [RouterModule]
})
export class CircularDetailRoutingModule { }
