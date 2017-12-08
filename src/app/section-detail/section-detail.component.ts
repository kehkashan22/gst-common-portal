import { SectionDetailService } from './section-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

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
    related_rules: [],
    footnotes: [],
    text: ''
  };

  htmlText: any;
  law_id: string;
  act_id: string;
  chap_id: string;
  name: string;
  constructor(
    private _section: SectionDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private _dom: DomSanitizer
  ) {}

  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.law_id = params['law_id'];
      this.act_id = params['act_id'];
      this.chap_id = params['chap_id'];
      this.name = params['name'];
      this._section.getSection(this.law_id, this.act_id, this.chap_id, this.name).then((snap: any[]) => {
        console.log('here');
        snap.forEach(doc => {
          const section = {
            id: doc.id,
            ...doc.data()
          };
          this.section = {
            ...section
          }
          this.htmlText = this._dom.bypassSecurityTrustHtml(this.section.text);
          console.log(doc.id, '=>', doc.data());
        });
      });
    });
  }
}
