import { RuleDetailService } from './rule-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.css']
})
export class RuleDetailComponent implements OnInit {
  rule = {
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
      this.act_id = params['act_id'];
      this.chap_id = params['chap_id'];
      this.name = params['name'];
      this._rule.getRule(this.law_id, this.act_id, this.chap_id, this.name).then((snap: any[]) => {
        console.log('here');
        snap.forEach(doc => {
          const rule = {
            id: doc.id,
            ...doc.data()
          };
          this.rule = {
            ...this.rule,
            ...rule
          }
          this.htmlText = this._dom.bypassSecurityTrustHtml(this.rule.text);
        });
      });
    });
  }
}
