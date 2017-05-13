import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-my-coordinator',
  templateUrl: 'my-coordinator.html'
})
export class MyCoordinatorPage {
      
  constructor(public navCtrl: NavController) {
  }
}