import { AuthorsService } from './authors.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

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

  constructor(private route: ActivatedRoute,
  private _authors: AuthorsService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.author_id = params['a_id'];
      this._authors.getAuthor(this.author_id).then((snap: firebase.firestore.DocumentSnapshot) => {
        this.author = {
          id: snap.id,
          ...snap.data()
        };
        console.log(this.author);
      });
      this.articles = this._authors.getArticleListByAuthor(this.author_id);
    });
  }

}
