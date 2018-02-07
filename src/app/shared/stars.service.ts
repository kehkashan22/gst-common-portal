import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
export interface Star {
  userId: any;
  authorId: any;
  articleId: any;
  value: number;
}
@Injectable()
export class StarsService {
  constructor(private afs: AngularFirestore) { }
  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }
  // Get all stars that belog to a author
  getAuthorStars(authorId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('authorId', '==', authorId) );
    return starsRef.valueChanges();
  }

  getArticleStars(articleId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('articleId', '==', articleId) );
    return starsRef.valueChanges();
  }

  getUserArticleStars(userId, articleId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId).where('articleId', '==', articleId) );
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId, authorId, articleId, value) {
    // Star document data
    const star: Star = { userId, authorId, articleId, value };
    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.authorId}`;
    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }

  getAvgRating(stars): Observable<any> {
    return stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    });
  }
}
