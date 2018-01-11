import { ActDescComponent } from './act-desc/act-desc.component';
import { ActsListComponent } from './acts-list/acts-list.component';
import { LawsStartComponent } from './laws-start/laws-start.component';
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
    { path: '', component: LawsStartComponent },
    { path: ':id', component: ActsListComponent },
    { path: ':id/act/:act_id', component: LawsDetailsComponent, children: [
      { path: 'desc', component: ActDescComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'rules', component: RulesComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]},
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
