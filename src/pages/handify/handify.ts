import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { CalendarPage } from '../calendar/calendar';
import { LogOutPage } from '../log-out/log-out';
import { ProfilePage } from '../profile/profile';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';
@Component({
  selector: 'page-handify',
  templateUrl: 'handify.html'
})
export class HandifyPage {
  public userProfile: any;
  public birthDate: string;
  pages: Array<{ title: string, component: any, icon: string, color: string, }>;


  constructor(public navCtrl: NavController, public authData: AuthData, public profileData: ProfileData) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

    this.pages = [
      { title: 'Profile', component: ProfilePage, icon: "md-person", color: "#5AD864" },
      { title: 'Calendar & tasks', component: CalendarPage, icon: "md-calendar", color: "#E57401" },
      { title: 'Inbox', component: CalendarPage, icon: "md-mail", color: "#FCCE00" },
      { title: 'Connect to helper', component: CalendarPage, icon: "md-contacts", color: "#AD5BEA" },
      { title: 'Manage helpers', component: CalendarPage, icon: "md-paper", color: "#3FBECA" },
      { title: 'Settings', component: ProfileSettingsPage, icon: "md-cog", color: "#D96A68" },
      { title: 'Log out', component: LogOutPage, icon: "md-exit", color: "#BB8285" },


      //{ title: 'Log out', component: HomePage, icon: "ios-exit-outline" }

    ];

  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }
 

}
