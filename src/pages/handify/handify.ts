import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { ProfileData } from '../../providers/profile-data';
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-handify',
  templateUrl: 'handify.html'
})
export class HandifyPage {
  public userProfile: any;
  public birthDate: string;
  constructor(public navCtrl: NavController, public authData: AuthData, public profileData: ProfileData) {

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

  goToCalendar() {
    this.navCtrl.push(CalendarPage);
  }
}
