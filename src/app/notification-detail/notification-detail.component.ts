import { ActivatedRoute, Router } from '@angular/router';
import { NotificationDetailService } from './notification-detail.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

  notification = {
    id: '',
    video_url: '',
    name: '',
    number: '',
    related_sections: '',
    related_rules: [],
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
  notification_id: string;
  constructor(
    private _notification: NotificationDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private _dom: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.law_id = params['law_id'];
      this.act_id = params['act_id'];
      this.chap_id = params['chap_id'];
      this.notification_id = params['notification_id'] || '';
      this.name = params['name'] || '';
      if (this.notification_id) {
        this._notification
          .getNotificationById(
            this.law_id,
            this.act_id,
            this.chap_id,
            this.notification_id
          )
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            const notification = {
              id: snap.id,
              ...snap.data()
            };
            this.populateNotification(notification);
          });
      } else if (this.name) {
        this._notification
          .getNotification(this.law_id, this.act_id, this.chap_id, this.name)
          .then((snap: any[]) => {
            snap.forEach(doc => {
              const notification = {
                id: doc.id,
                ...doc.data()
              };
              this.populateNotification(notification);
            });
          });
      }
    });
  }

  populateNotification(notification: any) {
    this.notification = {
      ...this.notification,
      ...notification
    };
    this.htmlText = this._dom.bypassSecurityTrustHtml(
      this.notification.text
    );
    this.htmlAnalysis = this._dom.bypassSecurityTrustHtml(
      this.notification.analysis
    );
  }

}
