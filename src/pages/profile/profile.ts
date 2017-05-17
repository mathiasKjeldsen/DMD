import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileSettingsTwoPage } from '../profile-settings-two/profile-settings-two';
import { SettingsPage } from '../settings/settings';
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
    this.navCtrl.push(ProfileSettingsTwoPage);
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  updateSummary(summary: string) {
    this.profileData.updateSummary(this.profilePageForm.summary).then(() => {
      alert("success!")
    });
  }


}