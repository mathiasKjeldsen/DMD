import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { CalendarPage } from '../calendar/calendar';
import { LogOutPage } from '../log-out/log-out';
import { ProfilePage } from '../profile/profile';
import { LinkHelpersPage } from '../link-helpers/link-helpers';
import { ManageHelpersPage } from '../manage-helpers/manage-helpers';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-handify',
  templateUrl: 'handify.html'
})
export class HandifyPage {
  public userProfile: any;
  public birthDate: string;
  helperPages: Array<{ title: string, component: any, icon: string, color: string, }>;
  coordinatorPages: Array<{ title: string, component: any, icon: string, color: string, }>;


  constructor(public navCtrl: NavController, public authData: AuthData, public profileData: ProfileData) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

    this.helperPages = [
      { title: 'Calendar & tasks', component: CalendarPage, icon: "md-person", color: "#5AD864" },
      { title: 'Connect to coordinator', component: LinkHelpersPage, icon: "md-contacts", color: "#AD5BEA" },
      //{ title: 'Inbox', component: xxxxxPage, icon: "md-mail", color: "#BB8285" },
      { title: 'Profile', component: ProfilePage, icon: "md-calendar", color: "#E57401" },
      { title: 'Settings', component: SettingsPage, icon: "md-cog", color: "#FCCE00" },
      { title: 'Log out', component: LogOutPage, icon: "md-exit", color: " #D96A68" },
    ];

    this.coordinatorPages = [
      { title: 'Profile Calendar & tasks', component: CalendarPage, icon: "md-person", color: "#5AD864" },
      { title: 'Connect to helper', component: LinkHelpersPage, icon: "md-contacts", color: "#AD5BEA" },
      { title: 'Manage helpers', component: ManageHelpersPage, icon: "md-paper", color: "#3FBECA" },
      //{ title: 'Inbox', component: xxxxxPage, icon: "md-mail", color: "#BB8285" },
      { title: 'Profile', component: ProfilePage, icon: "md-calendar", color: "#E57401" },
      { title: 'Settings', component: SettingsPage, icon: "md-cog", color: "#FCCE00" },
      { title: 'Log out', component: LogOutPage, icon: "md-exit", color: " #D96A68" },
    ];

  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }


}
