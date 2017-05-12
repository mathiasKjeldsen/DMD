import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data'

@Component({
  selector: 'page-manage-helpers',
  templateUrl: 'manage-helpers.html'
})
export class ManageHelpersPage {

  constructor(public navCtrl: NavController, public profileData: ProfileData) {
    
  }

  testButton() {
    this.profileData.listProfiles().then(() => {
    }
    );
  }

}