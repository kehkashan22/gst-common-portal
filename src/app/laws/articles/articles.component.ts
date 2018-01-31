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

  public options: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,
    linkedCalendars: false,
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [
        moment()
          .subtract(1, 'month')
          .startOf('month'),
        moment()
          .subtract(1, 'month')
          .endOf('month')
      ]
    }
  };

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

  public selectedDate(value: any, datepicker?: any) {
    this.articles = this.temparticles.slice();
    const start = value.start;
    const end = value.end;
      this.articles = this.articles.filter(
        article =>
          moment(article.date) >= start
          && moment(article.date) <= end
    );

    console.log(this.articles);
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

ngOnDestroy() {
  this.sub.unsubscribe();
}
}
