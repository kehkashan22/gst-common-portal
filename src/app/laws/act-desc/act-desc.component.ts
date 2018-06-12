import { DomSanitizer } from '@angular/platform-browser';
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
  htmlText: any;
  id: string;
  act_id: string;
  law = {
    name: '',
    title: '',
    year: '',
    levied_by: '',
    levied_on: '',
    levied_of: '',
    description: ''
  };

  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router,
    private _dom: DomSanitizer
  ) { }

  ngOnInit() {
    this.sub = this.route.parent.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this._law.getLaw(this.id).then((doc: any) => {
            this.law = {
              id: doc.id,
              ...doc.data()
            };
            console.log(this.law);
            this.htmlText = this._dom.bypassSecurityTrustHtml(this.law.description);
        });
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
