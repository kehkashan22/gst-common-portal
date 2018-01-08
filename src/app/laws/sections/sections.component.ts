import { LawsService } from './../laws.service';
import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit, AfterViewInit {
  law_id: string;
  act_id: string;
  chapters = [];
  fragment = '';
  constructor(
    private _law: LawsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.chapters = [];
      this.law_id = params['id'];
      this.act_id = params['act_id'];
      console.log(this.law_id, this.act_id);
      this._law.getSections(this.law_id, this.act_id).then((snap: any[]) => {
        this.chapters = [];
        console.log('here');
        snap.forEach(doc => {
          this.chapters.push({
            id: doc.id,
            ...doc.data()
          });
          console.log(doc.id, '=>', doc.data());
        });
      });
    });

    // this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

    // this.router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     const tree = this.router.parseUrl(this.router.url);
    //     if (tree.fragment) {
    //       const element = document.querySelector('#' + tree.fragment);
    //       if (element) { element.scrollIntoView(true); }
    //     }
    //   }
    // });

  }

  ngAfterViewInit(): void {
    // document.querySelectorAll('a[href^=\'#\']').
    // forEach(node => {
    //   node.addEventListener('click', e => {
    //     e.preventDefault();
    //     console.log(e.target.href);
    //   });
    // })
    const anchors = document.querySelectorAll('a[href^=\'#\']');
    let index = 0;
    for ( index  = 0; index < anchors.length; index++ ) {
      console.log(anchors[index]);
}
  }

  toSection(chap_id, name) {
    this.router.navigate(['/section'], {
      queryParams: {
        law_id: this.law_id,
        act_id: this.act_id,
        chap_id,
        name
      }
    });
  }
}

