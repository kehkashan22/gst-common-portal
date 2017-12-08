import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBtCSq8hke5EBBPFxK8jZ7AsaLy5Lv9OHM',
      authDomain: 'expensify-75abf.firebaseapp.com',
      databaseURL: 'https://expensify-75abf.firebaseio.com',
      projectId: 'expensify-75abf',
      storageBucket: 'expensify-75abf.appspot.com',
      messagingSenderId: '988452474417'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
