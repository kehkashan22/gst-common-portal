
import { PipesModule } from './../pipes/pipes.module';
import { StarsService } from './stars.service';
import { AuthService } from './../auth/auth.service';
import { ArticleItemComponent } from './article-item/article-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ConstructionComponent } from './construction/construction.component';

@NgModule({
  imports: [CommonModule, RouterModule, PipesModule],
  declarations: [ArticleItemComponent, LoaderComponent,
    ConstructionComponent
],
  providers: [AuthService, StarsService],
  exports: [ArticleItemComponent, LoaderComponent, ConstructionComponent]
})
export class SharedModule {}
