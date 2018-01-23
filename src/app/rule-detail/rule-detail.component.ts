import { RuleDetail } from './rule-detail.model';
import { RuleDetailService } from './rule-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


import * as firebase from 'firebase';
@Component({
  selector: 'app-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.css']
})
export class RuleDetailComponent implements OnInit {
  htmlAnalysis: any;
  rule = {
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
  law_id: string;
  rule_parent_id: string;
  chap_id: string;
  name: string;
  rule_id: string;

  constructor(
    private _rule: RuleDetailService,
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
      this.rule_parent_id = params['rule_id'];
      this.chap_id = params['chap_id'];
      this.name = params['name'] || '';
      this.rule_id = params['r_id'] || '';
      if (this.rule_id) {
        this._rule.getRuleById(this.law_id, this.rule_parent_id, this.chap_id, this.rule_id)
          .then((snap: firebase.firestore.DocumentSnapshot) => {
          console.log('here');
          console.log(snap);

            const rule = {
              id: snap.id,
              ...snap.data()
            };

            this.populateRule(rule);

        });
      }else if (this.name) {
        this._rule.getRule(this.law_id, this.rule_parent_id, this.chap_id, this.name).then((snap: any[]) => {
          console.log('here');
          snap.forEach(doc => {
            const rule = {
              id: doc.id,
              ...doc.data()
            };
            this.populateRule(rule);
          });
        });
      }

    });
  }

  populateRule(rule) {
    this.rule = {
      ...this.rule,
      ...rule
    }
    console.log(this.rule.related_notifications);
    this.htmlText = this._dom.bypassSecurityTrustHtml(this.rule.text);
    this.htmlAnalysis = this._dom.bypassSecurityTrustHtml(this.rule.analysis);
  }
}
