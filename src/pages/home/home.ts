import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

swag() {
    this.navCtrl.push(LogInPage);
}


}
