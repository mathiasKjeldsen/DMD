import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
      
  constructor(public navCtrl: NavController) {
  }
}