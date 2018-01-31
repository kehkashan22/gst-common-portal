import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class LawsService {
  firestore = firebase.firestore();
  acts: any[] = [];
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

  getUmbrella() {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('umberella')
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getUmbrellaLaws(id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('umberella')
        .doc(id)
        .collection('laws')
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getLaw(law_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }


  getActs(law_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('acts')
        .get()
        .then(snapshot => {
          const acts = [];
          resolve(snapshot);
        });
    });
  }

  getAct(law_id, act_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('acts')
        .doc(act_id)
        .get()
        .then(snapshot => {
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

  getNotificationActs(law_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('notifications')
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getNotificationAct(law_id, act_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('notifications')
        .doc(act_id)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getNotifications(law_id, act_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('notifications')
        .doc(act_id)
        .collection('notifications_list')
        .get()
        .then(snapshot => {
          console.log(snapshot);
          resolve(snapshot);
        });
    });
  }

  getCircularList(law_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('circulars')
        .doc(law_id)
        .collection('circulars_list')
        .get()
        .then(snapshot => {
          console.log(snapshot);
          resolve(snapshot);
        });
    });
  }

  getOrderList(law_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('circulars')
        .doc(law_id)
        .collection('orders_list')
        .get()
        .then(snapshot => {
          console.log(snapshot);
          resolve(snapshot);
        });
    });
  }

  getArticleList(law_id){
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('articles')
        .doc(law_id)
        .collection('articles_list')
        .get()
        .then(snapshot => {
          console.log(snapshot);
          resolve(snapshot);
        });
    });
  }

  getRules(law_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('rules')
        .get()
        .then(snapshot => {
          console.log(snapshot);
          resolve(snapshot);
        });
    });
  }

  getRule(law_id, rule_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('rules')
        .doc(rule_id)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getRuleChapters(law_id, rule_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('laws')
        .doc(law_id)
        .collection('rules')
        .doc(rule_id)
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

  getRuleDetails(law_id, act_id, chap_id, section_name) {
    const collectionRef = this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('rules')
      .doc(act_id)
      .collection('chapters')
      .doc(chap_id)
      .collection('rules');

    return new Promise((resolve, reject) => {
      collectionRef
        .where('name', '==', section_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  setActs(acts) {
      this.acts = acts;
  }

  getStoredAct(act_id) {
    return this.acts.find(act => act.id === act_id);
  }
}
