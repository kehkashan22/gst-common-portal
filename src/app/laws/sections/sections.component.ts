import { LawsService } from './../laws.service';
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
  chapters = [];
  fragment = '';
  private sub: any;
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.route.pathFromRoot);
    this.sub = this.route.parent.params.subscribe((params: Params) => {
      this.chapters = [];
      console.log(params);
      this.law_id = params['id'];
      this.act_id = params['act_id'];
      console.log(this.law_id, this.act_id);
      this._law.getSections(this.law_id, this.act_id).then((snap: any[]) => {
        this.chapters = [];
        console.log('here');
        snap.forEach(doc => {
          this.chapters.push({
            id: doc.id,
            ...doc.data()
          });
          this.chapters.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0) );
        });
      });
    });
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
  }
}
