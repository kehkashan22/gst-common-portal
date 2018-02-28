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
  selectedRow: string;
  constructor(
    private _laws: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.route.firstChild.params.subscribe(params => {
      const id = params['law_id'];
      console.log('child route:', id);
      this.selectedRow = id || 'none';
      console.log(this.selectedRow);
    });
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
    this.selectedRow = lawEl.id;
    if (lawEl.id.toLowerCase() === 'sgst') {
      this.router.navigate([lawEl.id], { relativeTo: this.route });
    } else {
      this._laws.getUmbrellaLaws(lawEl.id).then((snap: any[]) => {
        let law_id = '';
        snap.forEach(doc => {
          law_id = doc.data().law_id;
          this.router.navigate([lawEl.id, 'law', law_id, 'desc'], {
            relativeTo: this.route
          });
        });
      });
    }
  }
}
