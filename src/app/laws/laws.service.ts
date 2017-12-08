import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class LawsService {
  firestore = firebase.firestore();
  constructor() {}

  getLaws() {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getActs(id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(id)
        .collection('acts')
        .get()
        .then(snapshot => {
          const acts = [];
          resolve(snapshot);
        });
    });
  }

  getSections(law_id, act_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('acts')
        .doc(act_id)
        .collection('chapters')
        .get()
        .then(snapshot => {
          console.log(snapshot);
          resolve(snapshot);
        });
    });
  }

  getSectionDetails(law_id, act_id, chap_id, section_name) {
    const collectionRef = this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('acts')
      .doc(act_id)
      .collection('chapters')
      .doc(chap_id)
      .collection('sections_detail');

    return new Promise((resolve, reject) => {
      collectionRef
        .where('name', '==', section_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }
}
