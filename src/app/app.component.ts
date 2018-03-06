import { NotifyService } from 'app/auth/notify.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  loading: boolean;
  loadedFeature = 'wiki';
  name = '';
  closeResult: string;

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

  hideModal(): void {
    this.autoShownModal.hide();
    this._notify.clear();
  }

  constructor(public auth: AuthService, private router: Router, public _notify: NotifyService) {
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




