import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-handify',
  templateUrl: 'handify.html'
})
export class HandifyPage {

  constructor(public navCtrl: NavController, public authData: AuthData) {

  }

  logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(HomePage);
  });
}
}
