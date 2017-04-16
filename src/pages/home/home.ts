import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HandifyPage } from '../handify/handify';
import { SignUpPage } from '../sign-up/sign-up';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

logIn() {
    this.navCtrl.setRoot(HandifyPage);
}

goToSignUp() {
    this.navCtrl.push(SignUpPage);
}




}
