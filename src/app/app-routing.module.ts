import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CircularDetailComponent } from './circular-detail/circular-detail.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { RuleDetailComponent } from './rule-detail/rule-detail.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { LawsComponent } from './laws/laws.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wiki', loadChildren: './laws/laws.module#LawsModule' },
  { path: 'section', component: SectionDetailComponent },
  { path: 'rule', component: RuleDetailComponent },
  { path: 'notification', component: NotificationDetailComponent },
  { path: 'circular', component: CircularDetailComponent },
  { path: 'article', component: ArticleDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
