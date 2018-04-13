import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NotificationDetailService } from './notification-detail.service';
import { NotificationDetailComponent } from './notification-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationDetailRoutingModule } from './notification-detail-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NotificationDetailRoutingModule,
    RouterModule,
    PdfViewerModule
  ],
  declarations: [NotificationDetailComponent],
  providers: [NotificationDetailService]
})
export class NotificationDetailModule { }
