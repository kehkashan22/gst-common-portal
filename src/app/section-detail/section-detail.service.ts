import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class SectionDetailService {
  firestore = firebase.firestore();
  constructor() {}

  getSection(law_id, act_id, chap_id, section_name) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('acts')
      .doc(act_id)
      .collection('chapters')
      .doc(chap_id)
      .collection('sections_detail')
      .where('name', '==', section_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getSectionById(law_id, act_id, chap_id, section_id) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('acts')
      .doc(act_id)
      .collection('chapters')
      .doc(chap_id)
      .collection('sections_detail')
      .doc(section_id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          resolve(snapshot);
        });
    });
  }
}
