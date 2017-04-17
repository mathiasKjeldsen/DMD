import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HandifyPage } from '../pages/handify/handify';
import { HomePage } from '../pages/home/home';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: "md-home" },
      { title: 'Settings', component: HandifyPage, icon: "ios-settings" },
      { title: 'Calender overview', component: HandifyPage, icon: "ios-calendar-outline" },
      { title: 'Exit Handify', component: HomePage, icon: "ios-exit-outline" }

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

