import { AuthorsService } from './../author-profile/authors.service';
import { StarsService } from './../shared/stars.service';
import { AuthService } from './../auth/auth.service';
import { ArticleDetailService } from './article-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs/Observable';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  userId = '';
  type: any;
  stars: Observable<any>;
  avgRating: Observable<any>;
  article: any;
  author: any;
  htmlText: any;
  htmlAnalysis: any;
  law_id: string;
  act_id: string;
  chap_id: string;
  name: string;
  search_id: string;
  userRating: Observable<any>;
  exists = false;
  constructor(
    private _article: ArticleDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private _dom: DomSanitizer,
    private _auth: AuthService,
    private _star: StarsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this._auth.user.subscribe(userData => {
        this.userId = userData.uid;
        console.log('user ID: ', this.userId);
      });
      this.law_id = params['law_id'];
      this.search_id = params['id'] || '';
      this.name = params['list_id'] || '';
      if (this.search_id) {
        this._article
          .getArticleById(this.law_id, this.search_id)
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            const article: any = {
              id: snap.id,
              ...snap.data()
            };
            this.populateArticle(article);
            this.getAvgArticleRating();
            this.getUserRating();
          });
      } else if (this.name) {
        this._article.getArticle(this.law_id, this.name).then((snap: any[]) => {
          snap.forEach(doc => {
            const article = {
              id: doc.id,
              ...doc.data()
            };
            this.populateArticle(article);
            this.getAvgArticleRating();
            this.getUserRating();
          });
        });
      }
    });
  }

  // getAuthor(author_id) {
  //   this._author.getAuthor(author_id).then((doc: any) => {
  //     this.author = {
  //       id: doc.id,
  //       ...doc.data()
  //     };
  //   });
  // }

  getAvgArticleRating() {
    this.stars = this._star.getArticleStars(this.article.list_id);
    this.avgRating = this._star.getAvgRating(this.stars);
  }

  getUserRating() {
    const userStars = this._star.getUserArticleStars(this.userId, this.article.list_id);
    this.userRating = this._star.getAvgRating(userStars);
    this.userRating.subscribe(data => this.exists = data
    //   {
    //   console.log(data);
    //   console.log(this.exists);
    //  this.exists = !!data
    //  console.log(this.exists);
    //  return this.exists
    //   }
    )
      // console.log('rating', rating);
  }

  populateArticle(article: any) {
    this.article = {
      ...this.article,
      ...article
    };
    this.htmlText = this._dom.bypassSecurityTrustHtml(this.article.text);
    this.htmlAnalysis = this._dom.bypassSecurityTrustHtml(
      this.article.analysis
    );
  }

  starHandler(value) {
    console.log('inside star handler');
    this._star.setStar(
      this.userId,
      this.article.author_id,
      this.article.list_id,
      value
    );
  }
  
}
