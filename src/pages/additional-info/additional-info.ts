import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HandifyPage } from '../handify/handify';

@Component({
  selector: 'page-additional-info',
  templateUrl: 'additional-info.html'
})
export class AdditionalInfoPage {

  constructor(public navCtrl: NavController) {

  }
backToPreviousPage() {
    this.navCtrl.pop();
}

goToHandify() {
    this.navCtrl.setRoot(HandifyPage);
}

}
