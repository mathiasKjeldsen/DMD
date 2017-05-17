import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';
import { AccountSettingsPage } from '../account-settings/account-settings';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  public profilePageForm;
  constructor(public navCtrl: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public formBuilder: FormBuilder) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;

    });

    this.profilePageForm = this.formBuilder.group({
      'summary': ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });



  }

  goToProfileSettingsTwo() {
    this.navCtrl.push(ProfileSettingsPage);
  }

  goToSettings() {
    this.navCtrl.push(AccountSettingsPage);
  }

  updateSummary(summary: string) {
    this.profileData.updateSummary(this.profilePageForm.summary).then(() => {
      alert("success!")
    });
  }


}