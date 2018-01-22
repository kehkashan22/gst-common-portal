import { LawsService } from 'app/laws/laws.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit, OnDestroy {
  law_id: string;
  rule_id: string;
  chapters = [];
  fragment = '';
  filter = '';
  filter2 = '';
  p = 1;
  private sub: any;
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.route.pathFromRoot);
    this.sub = this.route.params.subscribe((params: Params) => {
      const id = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.params['id'];
      this.chapters = [];
      this.law_id = id;
      this.rule_id = this.route.pathFromRoot[this.route.pathFromRoot.length - 1].snapshot.params['rule_id'];
      console.log(this.law_id, this.rule_id);
      this._law.getRuleChapters(this.law_id, this.rule_id).then((snap: any[]) => {
        this.chapters = [];
        console.log('here');
        snap.forEach(doc => {
          this.chapters.push({
            id: doc.id,
            ...doc.data()
          });
          // this.chapters.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0) );
          this.chapters.sort((a, b) => {
            return this.fromRoman(a.number) - this.fromRoman(b.number)
        });
        });
      });
    });
  }

  sortRomanIds() {

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
  }
}

