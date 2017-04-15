import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';
import { SignUpPage } from '../sign-up/sign-up';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

goToLogIn() {
    this.navCtrl.push(LogInPage);
}

goToSignUp() {
    this.navCtrl.push(SignUpPage);
}




}
