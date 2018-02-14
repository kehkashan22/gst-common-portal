import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService) {
  }

  onLogout() {
    this.authService.signOut();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
    // !!this.authService.user;
      // this.authService.isAuthenticated().subscribe(data => {
      //   return data ? true : false;
      // });
  }
}
