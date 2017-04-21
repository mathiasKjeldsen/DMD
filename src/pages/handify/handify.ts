import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-handify',
  templateUrl: 'handify.html'
})
export class HandifyPage {
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

  logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  updatePhotoTest() {

    this.profileData.updatePhoto("https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/10403542_10207811032208273_8884013213151836092_n.jpg?oh=44c4e880cae45d2c864fadfad7432b81&oe=59926D43");
    console.log("updating photo");
  }

}
