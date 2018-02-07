import { SectionDetailComponent } from './section-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const sectionRoutes: Routes = [
  {
    path: '',
    component: SectionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(sectionRoutes)],
  exports: [RouterModule]
})
export class SectionDetailRoutingModule {}
