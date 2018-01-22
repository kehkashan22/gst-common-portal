import { LawsService } from './../laws.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-acts',
  templateUrl: './acts.component.html',
  styleUrls: ['./acts.component.css']
})
export class ActsComponent implements OnInit, OnDestroy {
  law_id: string;
  private sub: any;
  acts = [];
  constructor(private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe((params: Params) => {
      console.log(params);
      this.law_id = params['id'];
      console.log(this.law_id);
      this._law.getActs(this.law_id).then((snap: any[]) => {
        this.acts = [];
        console.log('here');
        snap.forEach(doc => {
          this.acts.push({
            id: doc.id,
            ...doc.data()
          });
          console.log(this.acts);
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
