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
  type: any;

  circular = {
    id: '',
    video_url: '',
    name: '',
    number: '',
    related_sections: [],
    related_rules: [],
    related_notifications: [],
    related_circulars: [],
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
  search_id: string;
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
      this.search_id = params['id'] || '';
      this.name = params['name'] || '';
      this.type = params['type'] || 'circular';
      if (this.search_id) {
        this._circular
          .getCircularById(
            this.law_id,
            this.search_id,
            this.type
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
          .getCircular(this.law_id, this.name, this.type)
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
