import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  loading: boolean;
  loadedFeature = 'wiki';
  name = '';
  constructor(public _authStart: AuthService, private router: Router
  ) {
      this.loading = true;
  }

  ngOnInit() {
    // this._authStart.user.subscribe((data) => {
    //     this.name = data ? data.displayName : 'guest';
    // });
  }

  ngAfterViewInit() {
    this.router.events
        .subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.loading = true;
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
                ) {
                this.loading = false;
            }
        });
}

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}




