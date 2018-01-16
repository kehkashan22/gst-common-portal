import { ActivatedRoute, Router } from '@angular/router';
import { CircularDetailService } from './circular-detail.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-circular-detail',
  templateUrl: './circular-detail.component.html',
  styleUrls: ['./circular-detail.component.css']
})
export class CircularDetailComponent implements OnInit {

  circular = {
    id: '',
    video_url: '',
    name: '',
    number: '',
    related_sections: [],
    related_rules: [],
    related_notifications: [],
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
  circular_id: string;
  constructor(
    private _circular: CircularDetailService,
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
      this.circular_id = params['circular_id'] || '';
      this.name = params['name'] || '';
      if (this.circular_id) {
        this._circular
          .getCircularById(
            this.law_id,
            this.act_id,
            this.chap_id,
            this.circular_id
          )
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            const circular = {
              id: snap.id,
              ...snap.data()
            };
            this.populateCircular(circular);
          });
      } else if (this.name) {
        this._circular
          .getCircularById(this.law_id, this.act_id, this.chap_id, this.name)
          .then((snap: any[]) => {
            snap.forEach(doc => {
              const circular = {
                id: doc.id,
                ...doc.data()
              };
              this.populateCircular(circular);
            });
          });
      }
    });
  }

  populateCircular(circular: any) {
    this.circular = {
      ...this.circular,
      ...circular
    };
    this.htmlText = this._dom.bypassSecurityTrustHtml(
      this.circular.text
    );
    this.htmlAnalysis = this._dom.bypassSecurityTrustHtml(
      this.circular.analysis
    );
  }

}
