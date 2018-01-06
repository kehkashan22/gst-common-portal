import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-law-item',
  templateUrl: './law-item.component.html',
  styleUrls: ['./law-item.component.css']
})
export class LawItemComponent implements OnInit {

  @Input() law;
  @Input() index: string;

  constructor() { }

  ngOnInit() {
    
  }

}
