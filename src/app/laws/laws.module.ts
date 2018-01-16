import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { LawsListComponent } from './laws-list/laws-list.component';
import { LawsService } from './laws.service';
import { LawItemComponent } from './laws-list/law-item/law-item.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { LawsComponent } from 'app/laws/laws.component';
import { LawsRoutingModule } from './laws-routing.module';
import { RouterModule } from '@angular/router';
import { SectionsComponent } from './sections/sections.component';
import { LawsDetailsComponent } from './laws-details/laws-details.component';
import { RulesComponent } from './rules/rules.component';
import { HomeComponent } from 'app/core/home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LawsStartComponent } from './laws-start/laws-start.component';
import { ActsListComponent } from './acts-list/acts-list.component';
import { ActDescComponent } from './act-desc/act-desc.component';
import { CircularsComponent } from './circulars/circulars.component';


@NgModule({
  declarations: [
    LawsComponent,
    LawsListComponent,
    LawItemComponent,
    LawsDetailsComponent,
    SectionsComponent,
    RulesComponent,
    NotificationsComponent,
    LawsStartComponent,
    ActsListComponent,
    ActDescComponent,
    CircularsComponent
],
  imports: [
    CommonModule,
    FormsModule,
    LawsRoutingModule,
    RouterModule,
    Daterangepicker,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [LawsService]
})
export class LawsModule {}
