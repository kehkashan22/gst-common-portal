import { StarsService } from 'app/shared/stars.service';
import { AuthorsService } from './authors.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {
  author_id: any;
  sub: any;
  author: any;
  articles = [];
  authorStars: Observable<any>;
  authorAvg: Observable<any>;
  constructor(private route: ActivatedRoute,
  private _authors: AuthorsService,
private _stars: StarsService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.author_id = params['a_id'] || '';
      this._authors.getAuthor(this.author_id).then((snap: firebase.firestore.DocumentSnapshot) => {
        this.author = {
          id: snap.id,
          ...snap.data()
        };
        console.log(this.author);
      });
      this.articles = this._authors.getArticleListByAuthor(this.author_id);
    
      this.authorStars = this._stars.getAuthorStars(this.author_id);
      this.authorAvg = this._stars.getAvgRating(this.authorStars);
    });
  }

}
