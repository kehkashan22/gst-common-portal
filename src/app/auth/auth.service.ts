// import { NotifyService } from './notify.service';
// import { Router } from '@angular/router';
// import * as firebase from 'firebase';
// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap'

// interface User {
//   uid: string;
//   email: string;
//   photoURL?: string;
//   displayName?: string;
//   favoriteColor?: string;
// }

// @Injectable()
// export class AuthService {
//   token: string;
//   user: Observable<User>;
//   constructor(private afAuth: AngularFireAuth,
//               private afs: AngularFirestore,
//               private router: Router,
//               private notify: NotifyService) {
//       //// Get auth data, then get firestore user document || null
//       this.user = this.afAuth.authState
//         .switchMap(user => {
//           if (user) {
//             return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
//           } else {
//             return Observable.of(null)
//           }
//         })
//   }

//   googleLogin() {
//     const provider = new firebase.auth.GoogleAuthProvider()
//     return this.oAuthLogin(provider);
//   }
//   private oAuthLogin(provider) {
//     return this.afAuth.auth.signInWithPopup(provider)
//       .then((credential) => {
//         this.updateUserData(credential.user)
//       })
//   }

//   private updateUserData(user) {
//     // Sets user data to firestore on login
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
//     const data: User = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL
//     }
//     return userRef.set(data)
//   }

//   // signupUser(email: string, password: string) {
//   //   firebase.auth().createUserWithEmailAndPassword(email, password)
//   //     .catch(
//   //       error => console.log(error)
//   //     )
//   // }

//   // signinUser(email: string, password: string) {
//   //   firebase.auth().signInWithEmailAndPassword(email, password)
//   //     .then(
//   //       response => {
//   //         this.router.navigate(['/']);
//   //         firebase.auth().currentUser.getToken()
//   //           .then(
//   //             (token: string) => this.token = token
//   //           )
//   //       }
//   //     )
//   //     .catch(
//   //       error => console.log(error)
//   //     );
//   // }

//   // logout() {
//   //   firebase.auth().signOut();
//   //   this.token = null;
//   // }

//   signOut() {
//     this.afAuth.auth.signOut().then(() => {
//         this.router.navigate(['/']);
//     });
//   }

//   getToken() {
//     firebase.auth().currentUser.getToken()
//       .then(
//         (token: string) => this.token = token
//       );
//     return this.token;
//   }

//   get authenticated(): boolean {
//     return this.authState !== null;
//   }

//   // Returns current user
// get currentUser(): any {
//   return this.authenticated ? this.authState.auth : null;
// }
// // Returns current user UID
// get currentUserId(): string {
//   return this.authenticated ? this.authState.uid : '';
// }


//     //// Email/Password Auth ////
//     emailSignUp(email: string, password: string) {
//       return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
//         .then((user) => {
//           this.notify.update('Welcome to Firestarter!!!', 'success');
//           return this.updateUserData(user); // if using firestore
//         })
//         .catch((error) => this.handleError(error) );
//     }

//     emailLogin(email: string, password: string) {
//       return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//         .then((user) => {
//           this.notify.update('Welcome to Firestarter!!!', 'success')
//           return this.updateUserData(user); // if using firestore
//         })
//         .catch((error) => this.handleError(error) );
//     }

//     // Sends email allowing user to reset password
//     resetPassword(email: string) {
//       const fbAuth = firebase.auth();

//       return fbAuth.sendPasswordResetEmail(email)
//         .then(() => this.notify.update('Password update email sent', 'info'))
//         .catch((error) => this.handleError(error));
//     }

//     // If error, console log and notify user
//     private handleError(error: Error) {
//       console.error(error);
//       this.notify.update(error.message, 'error');
//     }

// }


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';
import { switchMap, take, map, tap } from 'rxjs/operators';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });

      this.afAuth.authState.subscribe(data => {
        console.log('AUTH', data);
      })
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        this.router.navigate(['/wiki']);
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error) );
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.notify.update('Welcome to Firestarter!!!', 'success');
        this.router.navigate(['/signin']);
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.notify.update('Welcome to Firestarter!!!', 'success')
        this.router.navigate(['/wiki']);
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/signin']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
    };
    return userRef.set(data);
  }

  isAuthenticated() {
    console.log(this.afAuth.authState);
    return this.afAuth.authState;
  }
}
