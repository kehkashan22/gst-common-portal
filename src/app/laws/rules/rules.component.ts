import { ActivatedRoute, Router, Params } from '@angular/router';
import { LawsService } from './../laws.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit, OnDestroy {
  law_id: string;
  private sub: any;
  rules = [];
  filter = [];
  constructor(private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe((params: Params) => {
      console.log(params);
      this.law_id = params['id'];
      console.log(this.law_id);
      this._law.getRules(this.law_id).then((snap: any[]) => {
        this.rules = [];
        console.log('here');
        snap.forEach(doc => {
          this.rules.push({
            id: doc.id,
            ...doc.data()
          });
          console.log(this.rules);
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
