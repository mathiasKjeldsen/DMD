import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder } from '@angular/forms';
import { ProfileSettingsTwoPage } from '../profile-settings-two/profile-settings-two';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor(public navCtrl: NavController, public profileDataA: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
  }
  goToProfileSettingsTwo() {
    this.navCtrl.push(ProfileSettingsTwoPage);
  }
}