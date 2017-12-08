import { LawsService } from './laws.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.css']
})
export class LawsComponent implements OnInit {
  laws = [];
  constructor(private _laws: LawsService) { }

  ngOnInit() {

}

}
