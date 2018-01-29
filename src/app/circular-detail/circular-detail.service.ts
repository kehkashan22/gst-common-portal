import { Injectable } from '@angular/core';


import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class CircularDetailService {

  firestore = firebase.firestore();
  constructor() {}

  getCircular(law_id, circular_name, type) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('circulars')
      .doc(law_id)
      .collection(type + '_details')
      .where('name', '==', circular_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getCircularById(law_id, circular_id, type) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('circulars')
      .doc(law_id)
      .collection(type + '_details')
      .doc(circular_id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          resolve(snapshot);
        });
    });
  }

}

