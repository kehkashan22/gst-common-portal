import { AuthComponent } from './auth.component';
import { PreventLoggedInAccessService } from './prevent-logged-in-access.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth-guard.service';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: SigninComponent,
        canActivate: [PreventLoggedInAccessService]
      },
      {
        path: 'register',
        component: SignupComponent,
        canActivate: [PreventLoggedInAccessService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
