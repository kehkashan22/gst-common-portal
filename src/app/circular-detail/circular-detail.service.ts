import { Injectable } from '@angular/core';


import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class CircularDetailService {

  firestore = firebase.firestore();
  constructor() {}

  getCircular(law_id, act_id, chap_id, circular_name) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('acts')
      .doc(act_id)
      .collection('circular_details')
      .where('name', '==', circular_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getCircularById(law_id, act_id, chap_id, circular_id) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('acts')
      .doc(act_id)
      .collection('circular_details')
      .doc(circular_id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          resolve(snapshot);
        });
    });
  }

}

