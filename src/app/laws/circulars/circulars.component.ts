import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LawsService } from './../laws.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.css']
})
export class CircularsComponent implements OnInit, OnDestroy {

  filter: any;
  law_id: string;
  act_id: string;
  circulars = [];
  tempCirc = [];
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
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
   }
  };

  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe((params: Params) => {
      this.circulars = [];
      this.law_id = params['id'];
      console.log(this.law_id);
      this._law.getCircularList(this.law_id).then((snap: any[]) => {
        this.circulars = [];
        console.log('here');
        snap.forEach(doc => {
          this.circulars.push({
            id: doc.id,
            ...doc.data()
          });
          this.sortByName();
          this.tempCirc = this.circulars.slice();
          console.log(doc.id, '=>', doc.data());
        });
      });
    });
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    const direction = this.isDesc ? 1 : -1;

    this.circulars.sort((a, b) => {
        if (a[property] < b[property]) {
          return -1 * direction;
        } else if (a[property] > b[property]) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
  }

  sortByName() {
    this.isDesc = !this.isDesc; // change the direction
    this.column = 'name';
    const direction = this.isDesc ? 1 : -1;

    this.circulars.sort(function(a, b) {
      if (a.year < b.year) {
        return -1 * direction;
      }else if (a.year > b.year) {
        return 1 * direction;
      }else if ( a.year === b.year ) {
        if (+a.number > +b.number) {
          return -1 * direction;
        }else if (+a.number < +b.number) {
          return 1 * direction;
        }else {
          return 0;
        }
      }
    });
  }

  public selectedDate(value: any, datepicker?: any) {
    this.circulars = this.tempCirc.slice();
    const start = value.start;
    const end = value.end;
      this.circulars = this.circulars.filter(
        circular =>
          moment(circular.date) >= start
          && moment(circular.date) <= end
    );

    console.log(this.circulars);
}

toCircular(circular_id) {
  console.log(circular_id);
  this.router.navigate(['/circular'], {
    queryParams: {
      law_id: this.law_id,
      name: circular_id,
      type: 'circular'
    }
  });
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

}

