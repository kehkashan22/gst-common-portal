import { AuthService } from 'app/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import * as firebase from 'firebase';
interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  image: string;
  isImage: boolean;
  // Main task
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    public auth: AuthService,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((doc: any) => {
      this.user = {
        ...doc
      };
      console.log(this.user);
      this.userForm.patchValue({
        userData: {
          displayName: this.user.displayName
        }
      });
      this.image = this.user.photoURL;
    });

    this.userForm = new FormGroup({
      userData: new FormGroup({
        displayName: new FormControl(null, Validators.required)
      })
    });
  }

  /** IMAGE  */
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    // The storage path
    const path = `test/${this.user.uid}`;

    // The main task
    this.task = this.storage.upload(path, file);
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    // The file's download URL

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          // this.db.collection('photos').add( { path, size: snap.totalBytes })
          this.downloadURL = this.task.downloadURL();
          this.downloadURL.subscribe(data => {
            console.log('DOWNLOAD', data);
          });
          const storageRef = firebase
            .storage()
            .ref()
            .child(path);
          storageRef.getDownloadURL().then(url => {
            this.isImage = true;
            this.image = url;
          });
        }
      })
    );
  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  onSubmit() {
    this.user = {
      ...this.user,
      ...this.userForm.value.userData,
      photoURL: this.image
    };
    console.log(this.user);
    this.auth.updateUserData(this.user);
    this.userForm.reset();
  }
}
