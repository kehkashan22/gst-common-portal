import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LawsComponent } from 'app/laws/laws.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RulesComponent } from './rules/rules.component';
import { SectionsComponent } from './sections/sections.component';
import { LawsDetailsComponent } from './laws-details/laws-details.component';

const lawsRoutes: Routes = [
  { path: '', component: LawsComponent, children: [
    // { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: LawsDetailsComponent },
    { path: ':id/act/:act_id/sections', component: SectionsComponent },
    { path: ':id/act/:act_id/rules', component: RulesComponent },
    { path: ':id/act/:act_id/notifications', component: NotificationsComponent },
  ] },
];


@NgModule({
  imports: [
    RouterModule.forChild(lawsRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class LawsRoutingModule { }
