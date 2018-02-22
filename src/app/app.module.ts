import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { PreventLoggedInAccessService } from './auth/prevent-logged-in-access.service';
import { PipesModule } from './pipes/pipes.module';
import { AuthGuard } from './auth/auth-guard.service';
import { StarsService } from './shared/stars.service';
import { ArticleDetailModule } from './article-detail/article-detail.module';
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
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module';
import { LawsComponent } from './laws/laws.component';
import { LawsModule } from './laws/laws.module';
import { SectionDetailModule } from './section-detail/section-detail.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
/* For Firebase Related */
import * as firebase from 'firebase';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoundPipe } from 'app/pipes/round.pipe';
import { DropZoneDirective } from './drop-zone.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export const firebaseConfig = environment.firebaseConfig;
// firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
    DropZoneDirective
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    CoreModule,
    LawsModule,
    SectionDetailModule,
    RuleDetailModule,
    ArticleDetailModule,
    NotificationDetailModule,
    Daterangepicker,
    CircularDetailModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    PipesModule,
    UserModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    LawsService,
    StarsService,
    AuthGuard,
    PreventLoggedInAccessService
  ]
})
export class AppModule { }
