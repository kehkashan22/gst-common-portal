import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { docChanges } from 'angularfire2/firestore';

@Injectable()
export class AuthorsService {

  firestore = firebase.firestore();

  constructor() {}

  getAuthor(author_id) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('authors')
        .doc(author_id)
        .get()
        .then(snapshot => {
          console.log(snapshot.data());
          resolve(snapshot);
        });
    });
  }

  getArticleListByAuthor(author_id): any[] {
    // return new Promise((resolve, reject) => {
      const articles = [];
      this.firestore.collection('laws').get().then(snapshot => {
          snapshot.forEach(doc => {
            this.firestore
            .collection('laws')
            .doc(doc.id)
            .collection('articles')
            .doc(doc.id)
            .collection('articles_list')
            .where('author_id', '==', author_id)
            .get()
            .then(snapshot2 => {
              snapshot2.forEach(element => {
                articles.push({
                  law_id: doc.id,
                  article_id: element.id,
                  ...element.data()
                });
              });
            });
          });
          return articles;
      });

  return articles;
    // });
  }
}
