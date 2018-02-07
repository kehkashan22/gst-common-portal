import { ArticleDetailComponent } from './article-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const articleRoutes: Routes = [
  {path: '', component: ArticleDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(articleRoutes)],
  exports: [RouterModule]
})
export class ArticleDetailRoutingModule { }
