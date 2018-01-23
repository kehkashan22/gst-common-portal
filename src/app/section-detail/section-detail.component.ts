import { SectionDetailService } from './section-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit {
  section = {
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
  section_id: string;
  constructor(
    private _section: SectionDetailService,
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
      this.section_id = params['section_id'] || '';
      this.name = params['name'] || '';
      if (this.section_id) {
        this._section
          .getSectionById(
            this.law_id,
            this.act_id,
            this.chap_id,
            this.section_id
          )
          .then((snap: firebase.firestore.DocumentSnapshot) => {
            const section = {
              id: snap.id,
              ...snap.data()
            };
            this.populateSection(section);
          });
      } else if (this.name) {
        this._section
          .getSection(this.law_id, this.act_id, this.chap_id, this.name)
          .then((snap: any[]) => {
            console.log('here');
            snap.forEach(doc => {
              const section = {
                id: doc.id,
                ...doc.data()
              };
              this.populateSection(section);
            });
          });
      }
    });
  }

  populateSection(section) {
    this.section = {
      ...this.section,
      ...section
    };
    this.htmlText = this._dom.bypassSecurityTrustHtml(
      this.section.text
    );
    this.htmlAnalysis = this._dom.bypassSecurityTrustHtml(
      this.section.analysis
    );
  }
}
