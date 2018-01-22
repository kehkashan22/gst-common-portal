import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class RuleDetailService {
  firestore = firebase.firestore();
  constructor() {}

  getRule(law_id, rule_id, chap_id, rule_name) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('rules')
      .doc(rule_id)
      .collection('chapters')
      .doc(chap_id)
      .collection('rules')
      .where('name', '==', rule_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getRuleById(law_id, rule_parent_id, chap_id, rule_id) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('rules')
      .doc(rule_parent_id)
      .collection('chapters')
      .doc(chap_id)
      .collection('rules')
      .doc(rule_id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          resolve(snapshot);
        });
    });
  }


}
