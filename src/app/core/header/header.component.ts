import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    public auth: AuthService) {
  }

  onLogout() {
    this.auth.signOut();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
