import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { CalendarPage } from '../calendar/calendar';
import { LogOutPage } from '../log-out/log-out';
import { ProfilePage } from '../profile/profile';
import { ManageHelpersPage } from '../manage-helpers/manage-helpers';
import { MyCoordinatorPage } from '../my-coordinator/my-coordinator';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-handify',
  templateUrl: 'handify.html'
})
export class HandifyPage {
  public userProfile: any;
  helperPages: Array<{ title: string, component: any, icon: string, color: string, }>;
  coordinatorPages: Array<{ title: string, component: any, icon: string, color: string, }>;

  constructor(public navCtrl: NavController, public authData: AuthData, public profileData: ProfileData) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });

    this.helperPages = [
      { title: 'Calendar & tasks', component: CalendarPage, icon: "md-calendar", color: "#5AD864" },
      { title: 'My Coordinator', component: MyCoordinatorPage, icon: "md-paper", color: "#3FBECA" },
      { title: 'Profile', component: ProfilePage, icon: "md-person", color: "#D96A68" },
      { title: 'About', component: AboutPage, icon: "ios-book-outline", color: "#8367C7" },
      // { title: 'Settings', component: SettingsPage, icon: "md-cog", color: "#FCCE00" },
      { title: 'Log out', component: LogOutPage, icon: "md-exit", color: " #E57401" },
    ];

    this.coordinatorPages = [
      { title: 'Calendar & tasks', component: CalendarPage, icon: "md-calendar", color: "#5AD864" },
      { title: 'Manage helpers', component: ManageHelpersPage, icon: "md-paper", color: "#3FBECA" },
      { title: 'Profile', component: ProfilePage, icon: "md-person", color: "#D96A68" },
      { title: 'About', component: AboutPage, icon: "ios-book-outline", color: "#8367C7" },
      //  { title: 'Settings', component: SettingsPage, icon: "md-cog", color: "#FCCE00" },
      { title: 'Log out', component: LogOutPage, icon: "md-exit", color: "#E57401"},
      //Den helt blå farve til knapperne hedder #3a515b
    ];
  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }

}
