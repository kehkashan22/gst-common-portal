import { Subscription } from 'rxjs/Subscription';
import { LawsService } from 'app/laws/laws.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit, OnDestroy {
  sub2: Subscription;
  law_id: string;
  rule_id: string;
  rule = {
    id: '',
    name: '',
    year: ''
  }
  chapters = [];
  rules = [];
  fragment = '';
  filter = '';
  filter2 = '';
  p1 = 1;
  p2 = 1;
  private sub: any;
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.chapters = [];
      this.rules = [];
      this.sub2 = this.route.parent.params.subscribe((parent: Params) => {
        this.law_id = parent['id'];
      });
      this.rule_id = params['rule_id'];
      console.log(this.law_id, this.rule_id);
      this.getRule();
      this.getChapters();
    });
  }

  getRule() {
    this._law.getRule(this.law_id, this.rule_id).then((snap: any) => {
      this.rule = {
        id: snap.id,
        ...snap.data()
      }
    });
  }

  getChapters() {
    this._law.getRuleChapters(this.law_id, this.rule_id).then((snap: any[]) => {
      this.chapters = [];
      this.rules = [];
      console.log('here');
      snap.forEach(doc => {
        this.chapters.push({
          id: doc.id,
          ...doc.data()
        });
        this.rules.push(...doc.data().rules)
        this.rules.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0) );
        this.chapters.sort((a, b) => {
          return this.fromRoman(a.number) - this.fromRoman(b.number)
      });
      });
    });
  }

fromRoman(s) {
  s = s.toUpperCase();
  let sum = 0, i = 0, next, val;
  const romans = {
      M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1
  };
  while ( i < s.length) {
      val = s.charAt( i++ );
      if (!romans[val]) {
        return NaN;
      }
      val = romans[val];
      next = romans[(s.charAt(i) || 'N')] || 0;
      if (next > val) {
        val *= -1;
      }
      sum += val;
  }
  return sum
}

  toRule(chap_id, name) {
    this.router.navigate(['/rule'], {
      queryParams: {
        law_id: this.law_id,
        rule_id: this.rule_id,
        chap_id,
        name
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}

