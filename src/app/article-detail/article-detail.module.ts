import { AuthorsService } from './../author-profile/authors.service';
import { RouterModule } from '@angular/router';
import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleDetailService } from './article-detail.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './article-detail.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [CommonModule, ArticleDetailRoutingModule, RouterModule, PipesModule],
  declarations: [ArticleDetailComponent],
  providers: [ArticleDetailService, AuthorsService]
})
export class ArticleDetailModule {}
