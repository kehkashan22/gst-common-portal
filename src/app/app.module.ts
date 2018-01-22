import { FormsModule } from '@angular/forms';
import { CircularDetailModule } from './circular-detail/circular-detail.module';
import { NotificationDetailModule } from './notification-detail/notification-detail.module';
import { RuleDetailModule } from './rule-detail/rule-detail.module';
import { SectionDetailComponent } from './section-detail/section-detail.component';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LawsListComponent } from './laws/laws-list/laws-list.component';
import { LawsService } from './laws/laws.service';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module';
import { LawsComponent } from './laws/laws.component';
import { LawsModule } from './laws/laws.module';
import { SectionDetailModule } from './section-detail/section-detail.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import {ScrollToModule} from 'ng2-scroll-to';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';



import { environment } from '../environments/environment';
/* For Firebase Related */
import * as firebase from 'firebase';
import { NgxPaginationModule } from 'ngx-pagination';

export const firebaseConfig = environment.firebaseConfig;
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    LawsModule,
    SectionDetailModule,
    RuleDetailModule,
    NotificationDetailModule,
    ScrollToModule.forRoot(),
    Daterangepicker,
    CircularDetailModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  bootstrap: [AppComponent],
  providers: [
    LawsService
  ]
})
export class AppModule { }
