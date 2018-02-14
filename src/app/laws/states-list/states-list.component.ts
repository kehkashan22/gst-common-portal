import { LawsService } from './../laws.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.css']
})
export class StatesListComponent implements OnInit {
  id: number;
  states = [];
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
        this.states = [];
        this.id = params['law_id'];
        this._law.getUmbrellaLaws(this.id).then((snap: any[]) => {
          this.states = [];
          snap.forEach(doc => {
            this.states.push({
              id: doc.id,
              ...doc.data()
            });
          });
        });
      }
    );
  }
}
