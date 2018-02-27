import { User } from './../core/user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { switchMap, take, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  check: Observable<boolean | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user && user.emailVerified) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });

    this.check = this.afAuth.authState.switchMap(data => {
      if (data) {
        return Observable.of(true);
      } else {
        return Observable.of(null);
      }
    });

    this.afAuth.authState.subscribe(user => console.log(user));

  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.clear();
        this.router.navigate(['/']);
        this.afs
          .doc<User>(`users/${credential.user.uid}`)
          .snapshotChanges()
          .pipe(
            take(1),
            map(userEl => !!userEl),
            tap(userEl => {
              if (!userEl) {
                return this.updateUserData(credential.user);
              } else {
                return null;
              }
            })
          );
      })
      .catch(error => this.handleError(error));
  }

  //// Email/Password Auth ////

  emailSignUp(displayName: string, email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.notify.clear();
        this.notify.update(
          'Account creation successful. Verify your account by clicking on the verification link sent to the email.',
          'success'
        );
        this.router.navigate(['/auth/login']);
        user = {
          ...user,
          displayName
        };
        return this.updateUserData(user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.notify.clear();
        this.router.navigate(['/']);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/welcome']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      dob: user.dob || null,
      mob: user.mob || null,
      qualification: user.qualification || null,
      designation: user.designation || null,
      member_since: user.member_since || null,
      company: user.company || null
    };
    return userRef.set(data, { merge: true });
  }

  isAuthenticated() {
    return firebase.auth().currentUser;
  }
}
