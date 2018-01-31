import { ArticleDetailService } from './article-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  type: any;

  article = {
    id: '',
    video_url: '',
    name: '',
    number: '',
    related_sections: [],
    related_rules: [],
    related_notifications: [],
    related_circulars: [],
    footnotes: [],
    text: '',
    analysis: ''
  };

  htmlText: any;
  htmlAnalysis: any;
  law_id: string;
  act_id: string;
  chap_id: string;
  name: string;
  search_id: string;
  constructor(
    private _article: ArticleDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private _dom: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.law_id = params['law_id'];
      this.search_id = params['id'] || '';
      this.name = params['list_id'] || '';
      if (this.search_id) {
        this._article
          .getArticleById(
            this.law_id,
            this.search_id
          )
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            const article = {
              id: snap.id,
              ...snap.data()
            };
            this.populateArticle(article);
          });
      } else if (this.name) {
        this._article
          .getArticle(this.law_id, this.name)
          .then((snap: any[]) => {
            snap.forEach(doc => {
              const article = {
                id: doc.id,
                ...doc.data()
              };
              this.populateArticle(article);
            });
          });
      }
    });
  }

  populateArticle(article: any) {
    this.article = {
      ...this.article,
      ...article
    };
    this.htmlText = this._dom.bypassSecurityTrustHtml(
      this.article.text
    );
    this.htmlAnalysis = this._dom.bypassSecurityTrustHtml(
      this.article.analysis
    );
  }

}
