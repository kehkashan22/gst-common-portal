import { LawsService } from './../laws.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laws-details',
  templateUrl: './laws-details.component.html',
  styleUrls: ['./laws-details.component.css']
})
export class LawsDetailsComponent implements OnInit {
  id: number;
  acts = [];
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router) { }

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
            console.log(doc.id, '=>', doc.data());
          });
        });
      }
    );
  }

  toSections(act_id) {
    this.router.navigate(['act/', act_id, 'sections'], {relativeTo: this.route});
  }

  toRules(act_id) {
    this.router.navigate(['act/', act_id, 'rules'], {relativeTo: this.route});
  }

  toNotifications(act_id) {
    this.router.navigate(['act/', act_id, 'notifications'], {relativeTo: this.route});
  }

}
