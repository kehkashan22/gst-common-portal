import { LawsService } from './../laws.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laws-list',
  templateUrl: './laws-list.component.html',
  styleUrls: ['./laws-list.component.css']
})
export class LawsListComponent implements OnInit {
  laws = [];
  constructor( private _laws: LawsService) { }

  ngOnInit() {
    this._laws.getUmbrella().then((snapshot: any[]) => {
      snapshot.forEach((doc) => {
        this.laws.push({
            id: doc.id,
            ...doc.data()
        });
    });
  });
  }
}
