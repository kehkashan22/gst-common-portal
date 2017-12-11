import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class RuleDetailService {
  firestore = firebase.firestore();
  constructor() {}

  getRule(law_id, act_id, chap_id, section_name) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('acts')
      .doc(act_id)
      .collection('rules_chapters')
      .doc(chap_id)
      .collection('rules')
      .where('name', '==', section_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }
}
