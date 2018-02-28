import { NotifyService } from './../../auth/notify.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { PasswordValidation } from '../../shared/password-validation';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  passwordForm: FormGroup;
  emailForm: FormGroup;
  errMsg = '';
  emailErrMsg = '';
  editEmail = false;
  constructor(
    public _auth: AuthService,
    private fb: FormBuilder,
    private _notify: NotifyService
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: new FormControl(null, Validators.required),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]),
        confirmPassword: new FormControl(null, Validators.required)
      },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );
  }

  editEmailForm() {
    this.editEmail = !this.editEmail;
    this.emailForm = this.fb.group({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z][a-zA-Z0-9]+')
      ]),
      newEmail: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  updateEmail(email) {
    console.log(email);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, this.emailForm.get('password').value)
      .then(user => {
        user
          .updateEmail(this.emailForm.get('newEmail').value)
          .then(data => {
            this.emailErrMsg = '';
            this._notify.update(
              'Email reset successfully. Please log in again.',
              'success'
            );
            this._auth.signOut();
          })
          .catch(err => (this.emailErrMsg = 'Email could not be reset'));
      })
      .catch(err => (this.emailErrMsg = 'Password incorrect! Cannot Authenticate. Try again.'));
  }

  onSubmit() {
    if (
      this.passwordForm.get('oldPassword').value ===
      this.passwordForm.get('password').value
    ) {
      this.errMsg = 'Old and New Passwords cannot be same! Please try again';
    } else {
      this.updatePassword(
        this.passwordForm.get('oldPassword').value,
        this.passwordForm.get('password').value
      );
    }

    this.passwordForm.reset();
  }

  updatePassword(oldPassword, newPassword) {
    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          oldPassword
        )
      )
      .then(data => {
        firebase
          .auth()
          .currentUser.updatePassword(newPassword)
          .then(data2 => {
            this.errMsg = '';
            this._notify.update(
              'Password reset successfully. Please log in again.',
              'success'
            );
            this._auth.signOut();
          })
          .catch(err2 => {
            this.errMsg = 'Could not reset password. Please try again.';
          });
      })
      .catch(err => {
        this.errMsg = 'You have entered Wrong Password! Please try again!';
      });
  }
}
