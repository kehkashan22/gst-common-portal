import { LawsService } from './../laws.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-laws-list',
  templateUrl: './laws-list.component.html',
  styleUrls: ['./laws-list.component.css']
})
export class LawsListComponent implements OnInit {
  laws = [];
  selectedRow: number;
  constructor(
    private _laws: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this._laws.getUmbrella().then((snapshot: any[]) => {
      snapshot.forEach(doc => {
        this.laws.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }

  toActs(index, lawEl) {
    this.selectedRow = index;
    if (lawEl.id.toLowerCase() === 'sgst') {
      this.router.navigate([lawEl.id], { relativeTo: this.route });
    } else {
      this._laws.getUmbrellaLaws(lawEl.id).then((snap: any[]) => {
        let act_id = '';
        snap.forEach(doc => {
          act_id = doc.data().law_id;
          this.router.navigate([act_id, 'law', 'desc'], {
            relativeTo: this.route
          });
        });
      });
    }
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
