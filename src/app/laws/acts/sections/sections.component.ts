import { LawsService } from 'app/laws/laws.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit, OnDestroy {
  law_id: string;
  act_id: string;
  act = {
    id: '',
    name: '',
    year: ''
  }
  chapters = [];
  sections = [];
  fragment = '';
  filter = '';
  filter2 = '';
  p1 = 1;
  p2 = 1;
  private sub: any;
  private sub2: any;
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      // const id = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.params['id'];
      this.chapters = [];
      this.sections = [];
      this.sub2 = this.route.parent.params.subscribe((parent: Params) => {
        this.law_id = parent['id'];
      });
      this.act_id = params['act_id'];
      // this.route.pathFromRoot[this.route.pathFromRoot.length - 1].snapshot.params['act_id'];
      this.getAct();
      this.getSections();
    });
  }

  getSections() {
    this._law.getSections(this.law_id, this.act_id).then((snap: any[]) => {
      this.chapters = [];
      this.sections = [];
      console.log('here');
      snap.forEach(doc => {
        this.chapters.push({
          id: doc.id,
          ...doc.data()
        });
        doc.data().sections.forEach(element => {
          this.sections.push({
            chap_id: doc.id,
            ...element
          })
        });
        const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
        this.sections.sort((a, b) =>  collator.compare(a.number, b.number));
        this.chapters.sort((a, b) => this.fromRoman(a.number) - this.fromRoman(b.number));
      });
    });
  }

  getAct() {
    this._law.getAct(this.law_id, this.act_id).then((snap: any) => {
      this.act = {
        id: snap.id,
        ...snap.data()
      };
    });
  }

  fromRoman(s) {
    s = s.toUpperCase();
    let sum = 0,
      i = 0,
      next,
      val;
    const romans = {
      M: 1000,
      D: 500,
      C: 100,
      L: 50,
      X: 10,
      V: 5,
      I: 1
    };
    while (i < s.length) {
      val = s.charAt(i++);
      if (!romans[val]) {
        return NaN;
      }
      val = romans[val];
      next = romans[s.charAt(i) || 'N'] || 0;
      if (next > val) {
        val *= -1;
      }
      sum += val;
    }
    return sum;
  }

  toSection(chap_id, name) {
    this.router.navigate(['/section'], {
      queryParams: {
        law_id: this.law_id,
        act_id: this.act_id,
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
