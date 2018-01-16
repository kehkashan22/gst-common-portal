import { LawsService } from './../laws.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-acts-list',
  templateUrl: './acts-list.component.html',
  styleUrls: ['./acts-list.component.css']
})
export class ActsListComponent implements OnInit {
  id: number;
  acts = [];
  filter = '';
  p = 1;
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.acts = [];
        this.id = params['id'];
        this._law.getActs(this.id).then((snap: any[]) => {
          this.acts = [];
          snap.forEach(doc => {
            this.acts.push({
              id: doc.id,
              ...doc.data()
            });
          });
        });
      }
    );
  }
}
