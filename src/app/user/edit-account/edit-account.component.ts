import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  constructor(public _auth: AuthService) {}

  ngOnInit() {}

  updateEmail() {

  }

  updatePassword(oldPassword) {
    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          oldPassword
        )
      )
      .then(data => {
        console.log('Yo');
      })
      .catch(err => {
        console.log('Wrong Password');
      });
  }
}
