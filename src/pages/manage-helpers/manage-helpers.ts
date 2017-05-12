import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data'

@Component({
  selector: 'page-manage-helpers',
  templateUrl: 'manage-helpers.html'
})
export class ManageHelpersPage {

  public userProfile: any;
  public birthDate: string;

  constructor(public navCtrl: NavController, public profileData: ProfileData) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });
  }

  testButton() {
    this.profileData.listProfiles().then(() => {
      ///idk why this has to be here but it does
    });
  }

  testButtonTwo() {
  //  this.profileData.helperTestConnectedTo(this.userProfile.userId)
  }

  testButtonThree() {
    this.profileData.findUidByEmail("helper@test.account", this.userProfile.userId)
  }



}