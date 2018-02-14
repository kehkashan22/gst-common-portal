
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/auth/auth.service';
import { StarsService } from 'app/shared/stars.service';
import { AuthorsService } from 'app/author-profile/authors.service';


@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  author: any;

  @Input() law_id: any
  @Input() article: any;
  @Input() index: number;

  userId: any;
  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(
    private _auth: AuthService,
    private _star: StarsService,
    private router: Router,
    private _author: AuthorsService
  ) { }

  ngOnInit() {
    // this.userId = this._auth.user.subscribe(userData => {
    //   if (userData) {
    //     this.userId = userData.uid;
    //   }
    // });
    this.stars = this._star.getArticleStars(this.article.id);
    console.log(this.stars);
    this.avgRating = this._star.getAvgRating(this.stars);
    this.getAuthor();
  }
  toArticle(id) {
    console.log(id);
    this.router.navigate(['/article'], {
      queryParams: {
        law_id: this.law_id,
        list_id: id
      }
    });
  }

  getAuthor() {
    this._author.getAuthor(this.article.author_id).then((doc: any) => {
      this.author = {
        id: doc.id,
        ...doc.data()
      }
    });
  }

  getUrl() {
    const uri = 'url(\'' + this.article.uri + '\')';
    return uri;
  }
}
