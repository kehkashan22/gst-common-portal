import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { RuleDetailComponent } from './rule-detail/rule-detail.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { LawsComponent } from './laws/laws.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'laws', loadChildren: './laws/laws.module#LawsModule' },
  { path: 'section', component: SectionDetailComponent },
  { path: 'rule', component: RuleDetailComponent },
  { path: 'notification', component: NotificationDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
