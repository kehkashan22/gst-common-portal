import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class NotificationDetailService {

  firestore = firebase.firestore();
  constructor() {}

  getNotification(law_id, act_id, chap_id, notification_name) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('notifications')
      .doc(act_id)
      .collection('notification_details')
      .where('name', '==', notification_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getNotificationById(law_id, act_id, chap_id, notification_id) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('notifications')
      .doc(act_id)
      .collection('notification_details')
      .doc(notification_id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          resolve(snapshot);
        });
    });
  }

}
