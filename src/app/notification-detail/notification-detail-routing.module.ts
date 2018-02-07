import { NotificationDetailComponent } from './notification-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const notificationRoutes: Routes = [
  {path: '', component: NotificationDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(notificationRoutes)],
  exports: [RouterModule]
})
export class NotificationDetailRoutingModule { }
