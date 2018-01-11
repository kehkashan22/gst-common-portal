import { LawsService } from 'app/laws/laws.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-act-desc',
  templateUrl: './act-desc.component.html',
  styleUrls: ['./act-desc.component.css']
})
export class ActDescComponent implements OnInit, OnDestroy {
  sub: any;

  id: string;
  act_id: string;
  act = {
    name: '',
    title: '',
    year: '',
    levied_by: '',
    levied_on: '',
    levied_of: ''
  };

  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.parent.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.act_id = params['act_id']
        this._law.getAct(this.id, this.act_id).then((doc: any) => {
          console.log(this.act);
            this.act = {
              id: doc.id,
              ...doc.data()
            };
            console.log(doc.id, '=>', doc.data());
        });
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
