import { ArticleDetailService } from './article-detail.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ArticleDetailComponent],
  providers: [ArticleDetailService]
})
export class ArticleDetailModule { }
