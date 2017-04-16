import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

}
