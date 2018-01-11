import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LawsService } from './../laws.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  law_id: string;
  act_id: string;
  notifications = [];
  tempNoti = [];
  fragment = '';
  isDesc = false;
  column = 'quiz';
  direction: number;
  daterange: any;
  private sub: any;

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
      this.notifications = [];
      this.law_id = params['id'];
      this.act_id = params['act_id'];
      console.log(this.law_id, this.act_id);
      this._law.getNotifications(this.law_id, this.act_id).then((snap: any[]) => {
        this.notifications = [];
        console.log('here');
        snap.forEach(doc => {
          this.notifications.push({
            id: doc.id,
            ...doc.data()
          });
          this.tempNoti = this.notifications.slice();
          console.log(doc.id, '=>', doc.data());
        });
      });
    });
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    const direction = this.isDesc ? 1 : -1;

    this.notifications.sort((a, b) => {
        if (a[property] < b[property]) {
          return -1 * direction;
        } else if (a[property] > b[property]) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
  }

  public selectedDate(value: any, datepicker?: any) {
    this.notifications = this.tempNoti.slice();
    const start = value.start;
    const end = value.end;
      this.notifications = this.notifications.filter(
        notification =>
          moment(notification.date) >= start
          && moment(notification.date) <= end
    );

    console.log(this.notifications);
}

toNotification(notification_name) {
  console.log(notification_name);
  this.router.navigate(['/notification'], {
    queryParams: {
      law_id: this.law_id,
      act_id: this.act_id,
      name: notification_name
    }
  });
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

}
