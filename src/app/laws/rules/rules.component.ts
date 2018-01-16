import { ActivatedRoute, Router, Params } from '@angular/router';
import { LawsService } from './../laws.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit, OnDestroy {
  selected: any;

  law_id: string;
  act_id: string;
  chapters = [];
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
    this.sub = this.route.parent.params.subscribe((params: Params) => {
      this.chapters = [];
      this.law_id = params['id'];
      this.act_id = params['act_id'];
      console.log(this.law_id, this.act_id);
      this._law.getRules(this.law_id, this.act_id).then((snap: any[]) => {
        this.chapters = [];
        console.log('here');
        snap.forEach(doc => {
          this.chapters.push({
            id: doc.id,
            ...doc.data()
          });
          this.chapters.sort((a, b) => {
            return this.fromRoman(a.number) - this.fromRoman(b.number)
        });
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
        act_id: this.act_id,
        chap_id,
        name
      }
    });
  }

  select(item) {
    console.log(item);
    this.selected = (this.selected === item ? null : item);
 }
 isActive(item) {
   return this.selected === item;
 }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
