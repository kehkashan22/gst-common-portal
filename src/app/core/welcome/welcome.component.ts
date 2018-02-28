import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {NgStickyDirective} from 'ng-sticky';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
    auth.user.subscribe(data => {
      if (data) {
        router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {}
}
