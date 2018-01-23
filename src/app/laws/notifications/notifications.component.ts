import { Subscription } from 'rxjs/Subscription';
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
  sub2: Subscription;

  law_id: string;
  act_id: string;
  noti_act = {
    id: '',
    name: '',
    year: ''
  };
  notifications = [];
  tempNoti = [];
  fragment = '';
  isDesc = true;
  column = 'quiz';
  direction: number;
  daterange: any;
  private sub: any;
  filter = '';
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
    this.sub = this.route.params.subscribe((params: Params) => {
      this.notifications = [];
      this.act_id = params['act_id'];
      this.sub2 = this.route.parent.params.subscribe((parent: Params) => {
        this.law_id = parent['id'];
      });
      console.log(this.law_id, this.act_id);
      this.getAct();
      this.getNotificationList();
    });
  }

  getAct() {
    this._law.getNotificationAct(this.law_id, this.act_id).then((doc: any) => {
      this.noti_act = {
        id: doc.id,
        ...doc.data()
      };
    });
  }

  getNotificationList() {
    this._law.getNotifications(this.law_id, this.act_id).then((snap: any[]) => {
      this.notifications = [];
      snap.forEach(doc => {
        this.notifications.push({
          id: doc.id,
          ...doc.data()
        });
        this.sortByName();
        this.tempNoti = this.notifications.slice();
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

  sortByName() {
    this.isDesc = !this.isDesc; // change the direction
    this.column = 'name';
    const direction = this.isDesc ? 1 : -1;

    this.notifications.sort(function(a, b) {
      if (a.year < b.year) {
        return -1 * direction;
      } else if (a.year > b.year) {
        return 1 * direction;
      } else if (a.year === b.year) {
        if (+a.number < +b.number) {
          return -1 * direction;
        } else if (+a.number > +b.number) {
          return 1 * direction;
        } else {
          return 0;
        }
      }
    });
  }

  public selectedDate(value: any, datepicker?: any) {
    this.notifications = this.tempNoti.slice();
    const start = value.start;
    const end = value.end;
    this.notifications = this.notifications.filter(
      notification =>
        moment(notification.date) >= start && moment(notification.date) <= end
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
    this.sub2.unsubscribe();
  }
}
