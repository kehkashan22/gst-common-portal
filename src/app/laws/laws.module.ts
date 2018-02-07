import { AuthorsService } from './../author-profile/authors.service';
import { PipesModule } from './../pipes/pipes.module';
import { RoundPipe } from './../pipes/round.pipe';
import { ArticleItemComponent } from './articles/article-item/article-item.component';

import { CoreModule } from './../core/core.module';
import { ArticlesComponent } from './articles/articles.component';
import { ChaptersComponent } from './rules/chapters/chapters.component';
import { SectionsComponent } from './acts/sections/sections.component';
import { StatesListComponent } from './states-list/states-list.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { LawsListComponent } from './laws-list/laws-list.component';
import { LawsService } from './laws.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { LawsComponent } from 'app/laws/laws.component';
import { LawsRoutingModule } from './laws-routing.module';
import { RouterModule } from '@angular/router';
import { LawsDetailsComponent } from './laws-details/laws-details.component';
import { RulesComponent } from './rules/rules.component';
import { HomeComponent } from 'app/core/home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LawsStartComponent } from './laws-start/laws-start.component';
import { ActDescComponent } from './act-desc/act-desc.component';
import { CircularsComponent } from './circulars/circulars.component';
import { ActsComponent } from './acts/acts.component';
import { OrdersComponent } from './orders/orders.component';
import { CaseLawsComponent } from './case-laws/case-laws.component';



@NgModule({
  declarations: [
    LawsComponent,
    LawsListComponent,
    LawsDetailsComponent,
    SectionsComponent,
    RulesComponent,
    NotificationsComponent,
    LawsStartComponent,
    StatesListComponent,
    ActDescComponent,
    CircularsComponent,
    ActsComponent,
    ChaptersComponent,
    OrdersComponent,
    CaseLawsComponent,
    ArticlesComponent,
    ArticleItemComponent
],
  imports: [
    CommonModule,
    FormsModule,
    LawsRoutingModule,
    CoreModule,
    RouterModule,
    Daterangepicker,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    PipesModule
  ],
  exports: [
    ArticlesComponent,
    ArticleItemComponent
  ],
  providers: [LawsService,
  AuthorsService]
})
export class LawsModule {}
