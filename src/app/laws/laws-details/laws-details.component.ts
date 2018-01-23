import { LawsService } from 'app/laws/laws.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-laws-details',
  templateUrl: './laws-details.component.html',
  styleUrls: ['./laws-details.component.css']
})
export class LawsDetailsComponent implements OnInit, OnDestroy {
  law_id: string;
  private sub: any;
  acts = [];
  rules = [];
  notifications = [];
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.law_id = params['id'];
      console.log(this.law_id);
      this.getActs();
      this.getRules();
      this.getNotifications();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getActs() {
    this._law.getActs(this.law_id).then((snap: any[]) => {
      this.acts = [];
      console.log('here');
      snap.forEach(doc => {
        this.acts.push({
          id: doc.id,
          ...doc.data()
        });
        console.log(this.acts);
      });
    });
  }
  getRules() {
    this._law.getRules(this.law_id).then((snap: any[]) => {
      this.rules = [];
      console.log('here');
      snap.forEach(doc => {
        this.rules.push({
          id: doc.id,
          ...doc.data()
        });
        console.log(this.rules);
      });
    });
  }

  getNotifications() {
    this._law.getNotificationActs(this.law_id).then((snap: any[]) => {
      this.notifications = [];
      console.log('here');
      snap.forEach(doc => {
        this.notifications.push({
          id: doc.id,
          ...doc.data()
        });
        console.log(this.rules);
      });
    });
  }
}
