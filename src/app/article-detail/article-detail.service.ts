import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export class ArticleDetailService {

  firestore = firebase.firestore();
  constructor() {}

  getArticle(law_id, article_name) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('articles')
      .doc(law_id)
      .collection('article_details')
      .where('list_id', '==', article_name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        });
    });
  }

  getArticleById(law_id, article_id) {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('laws')
      .doc(law_id)
      .collection('articles')
      .doc(law_id)
      .collection('article_details')
      .doc(article_id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          resolve(snapshot);
        });
    });
  }


}
