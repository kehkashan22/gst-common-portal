import { NotificationDetailService } from './notification-detail.service';
import { NotificationDetailComponent } from './notification-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationDetailRoutingModule } from './notification-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationDetailRoutingModule
  ],
  declarations: [NotificationDetailComponent],
  providers: [NotificationDetailService]
})
export class NotificationDetailModule { }
