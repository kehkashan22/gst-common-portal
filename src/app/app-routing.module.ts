import { AuthGuard } from './auth/auth-guard.service';
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
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'wiki',
    loadChildren: './laws/laws.module#LawsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'section',
    loadChildren: './section-detail/section-detail.module#SectionDetailModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'rule',
    loadChildren: './rule-detail/rule-detail.module#RuleDetailModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren:
      './notification-detail/notification-detail.module#NotificationDetailModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'circular',
    loadChildren:
      './circular-detail/circular-detail.module#CircularDetailModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'article',
    loadChildren: './article-detail/article-detail.module#ArticleDetailModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'author',
    loadChildren: './author-profile/author-profile.module#AuthorProfileModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
