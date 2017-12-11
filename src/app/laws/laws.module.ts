import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawsListComponent } from './laws-list/laws-list.component';
import { LawsService } from './laws.service';
import { LawItemComponent } from './laws-list/law-item/law-item.component';

import { LawsComponent } from 'app/laws/laws.component';
import { LawsRoutingModule } from './laws-routing.module';
import { RouterModule } from '@angular/router';
import { SectionsComponent } from './sections/sections.component';
import { LawsDetailsComponent } from './laws-details/laws-details.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    LawsComponent,
    LawsListComponent,
    LawItemComponent,
    LawsDetailsComponent,
    SectionsComponent,
    RulesComponent
],
  imports: [
    CommonModule,
    LawsRoutingModule,
    RouterModule
  ],
  providers: [LawsService]
})
export class LawsModule {}
