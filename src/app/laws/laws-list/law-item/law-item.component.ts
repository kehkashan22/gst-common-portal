import { LawsService } from './../../laws.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-law-item',
  templateUrl: './law-item.component.html',
  styleUrls: ['./law-item.component.css']
})
export class LawItemComponent implements OnInit {

  @Input() law;
  @Input() law_id;
  @Input() index: string;

  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

  toActs() {
    if ( this.law.id.toLowerCase() === 'sgst' ) {
      this.router.navigate([this.index], {relativeTo: this.route});
    } else {
      this._law.getUmbrellaLaws(this.index).then((snap: any[]) => {
        let act_id = '';
        snap.forEach(doc => {
           act_id = doc.data().law_id;
           this.router.navigate([act_id, 'law', 'desc'], {relativeTo: this.route});
        });
      });
    }

  }

  onEdit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


}
