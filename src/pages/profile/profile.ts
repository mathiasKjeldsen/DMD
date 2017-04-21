import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder } from '@angular/forms';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  public profileData: any;

  public newInfoForm;

  constructor(public navCtrl: NavController, public profileDataA: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public formBuilder: FormBuilder) {

    this.profileData = profileDataA;

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  
  goToProfileSettings() {
    this.navCtrl.push(ProfileSettingsPage);
  }


}