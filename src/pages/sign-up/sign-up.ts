import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HandifyPage } from '../handify/handify';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  constructor(public navCtrl: NavController) {

  }
backToPreviousPage() {
    this.navCtrl.pop();
}

signUp() {
    this.navCtrl.setRoot(HandifyPage);
}

}
