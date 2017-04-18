import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-log-out',
  templateUrl: 'log-out.html'
})
export class LogOutPage {
public profileData: any;
public userProfile: any;
  public birthDate: string;
  constructor(public navCtrl: NavController, public authData: AuthData, public profileDataA: ProfileData) {

this.profileData = profileDataA;

  this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(HomePage);
  });
}

}
