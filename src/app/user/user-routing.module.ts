import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAccountComponent } from './edit-account/edit-account.component';

const routes: Routes = [
  {path: '', component: UserComponent, children: [
    {path: '', component: UserDetailsComponent},
    {path: 'edit-profile', component: EditUserComponent},
    {path: 'edit-account', component: EditAccountComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
