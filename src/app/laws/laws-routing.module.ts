import { ArticlesComponent } from './articles/articles.component';
import { CaseLawsComponent } from './case-laws/case-laws.component';
import { OrdersComponent } from './orders/orders.component';
import { ChaptersComponent } from './rules/chapters/chapters.component';
import { ActsComponent } from './acts/acts.component';
import { StatesListComponent } from './states-list/states-list.component';
import { CircularsComponent } from './circulars/circulars.component';
import { ActDescComponent } from './act-desc/act-desc.component';
import { LawsStartComponent } from './laws-start/laws-start.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LawsComponent } from 'app/laws/laws.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RulesComponent } from './rules/rules.component';
import { LawsDetailsComponent } from './laws-details/laws-details.component';
import { SectionsComponent } from './acts/sections/sections.component';

const lawsRoutes: Routes = [
  {
    path: '',
    component: LawsComponent,
    children: [
      { path: '', component: LawsStartComponent },
      { path: ':id', component: StatesListComponent },
      {
        path: ':id/law',
        component: LawsDetailsComponent,
        children: [
          { path: 'desc', component: ActDescComponent },
          { path: 'acts/:act_id/sections', component: SectionsComponent },
          { path: 'rules/:rule_id/rule-list', component: ChaptersComponent },
          { path: 'notifications/:act_id/notification_list', component: NotificationsComponent },
          { path: 'circulars', component: CircularsComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'case-laws', component: CaseLawsComponent },
          { path: 'articles', component: ArticlesComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(lawsRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class LawsRoutingModule {}
