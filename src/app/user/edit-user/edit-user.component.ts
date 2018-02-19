import { User } from './../../core/user';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { Router } from '@angular/router';
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
import * as moment from 'moment';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  member_since: any;
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

  qualifications = [
    'Graduate',
    'Post Graduate',
    'CA in Practice',
    'CA in Job/Business',
    'CFA',
    'CS',
    'CMA',
    'MBA',
    'LLB/Advocate',
    'Student - CA/CS/CMA',
    'Student - Other',
    'Other'
  ];

  dob: moment.Moment;
  options3: any = {
    locale: {
      format: 'MMM DD, YYYY'
    },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    showDropdowns: true
  };

  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;

  constructor(
    public auth: AuthService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((doc: any) => {
      this.user = {
        ...doc
      };
      console.log(this.user);
      this.userForm.patchValue({
        userData: {
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          dob: moment(this.user.dob).format('MMM DD, YYYY'),
          mob: this.user.mob,
          qualification: this.user.qualification,
          designation: this.user.designation,
          member_since: moment(this.user.member_since).format('MMM DD, YYYY'),
          company: this.user.company
        }
      });
      this.image = this.user.photoURL;
    });

    this.userForm = new FormGroup({
      userData: new FormGroup({
        displayName: new FormControl(null, Validators.required),
        mob: new FormControl(null, [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]+')
        ]),
        dob: new FormControl(null),
        qualification: new FormControl('Choose'),
        designation: new FormControl(null),
        member_since: new FormControl(null),
        company: new FormControl(null)
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

  public selectedDate(value: any, datepicker?: any) {
    this.dob = value.start.format();
  }

  public selectedMemberDate(value: any, datepicker?: any) {
    this.member_since = value.start.format();
  }

  onSubmit() {
    this.user = {
      ...this.user,
      ...this.userForm.value.userData,
      photoURL: this.image,
      dob: this.dob || this.user.dob,
      member_since: this.member_since || this.user.member_since
    };
    this.auth.updateUserData(this.user);
    this.router.navigate(['user']);
  }
}
