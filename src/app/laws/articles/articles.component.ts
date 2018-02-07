import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LawsService } from './../laws.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  filter: any;
  law_id: string;
  act_id: string;
  articles = [];
  temparticles = [];
  fragment = '';
  isDesc = false;
  column = 'quiz';
  direction: number;
  daterange: any;
  private sub: any;
  p = 1;


  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;

  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe((params: Params) => {
      this.articles = [];
      this.law_id = params['id'];
      console.log(this.law_id);
      this._law.getArticleList(this.law_id).then((snap: any[]) => {
        this.articles = [];
        console.log('here');
        snap.forEach(doc => {
          this.articles.push({
            id: doc.id,
            ...doc.data()
          });
          this.articles.sort(
            (a, b) =>
              moment(a.date).isSameOrAfter(moment(b.date))
                ? 1
                : moment(b.date).isSameOrAfter(moment(a.date)) ? -1 : 0
          );
          this.temparticles = this.articles.slice();
          console.log(doc.id, '=>', doc.data());
        });
      });
    });
  }

ngOnDestroy() {
  this.sub.unsubscribe();
}
}
