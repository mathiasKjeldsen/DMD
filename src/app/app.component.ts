import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HandifyPage } from '../pages/handify/handify';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any, icon: string }>;
  zone: NgZone;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyDMQMgiCRNkWyMrtzo965vHY2TMEQcwzBA",
      authDomain: "handify-7873c.firebaseapp.com",
      databaseURL: "https://handify-7873c.firebaseio.com",
      projectId: "handify-7873c",
      storageBucket: "handify-7873c.appspot.com",
      messagingSenderId: "504959669227"
    });

    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.rootPage = HomePage;
          unsubscribe();
        } else {
          this.rootPage = HandifyPage;
          unsubscribe();
        }
      });
    });



    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HandifyPage, icon: "md-home" },
      { title: 'Profile', component: ProfilePage, icon: "md-person" },
      { title: 'Calender', component: HandifyPage, icon: "ios-calendar-outline" },
      { title: 'Log out', component: HomePage, icon: "ios-exit-outline" }

    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }




}

