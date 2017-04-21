import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {
  public userProfile: any;
  public birthDate: string;
  public profileData: any;

  public newInfoForm;

  constructor(public navCtrl: NavController, public profileDataA: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public formBuilder: FormBuilder) {

    this.profileData = profileDataA;

    this.newInfoForm = this.formBuilder.group({

      'city': ['', Validators.compose([Validators.pattern(/^[a-zÆØÅæøå ,.'-é]+$/i)])],
      'address': ['', Validators.compose([Validators.pattern(/^[a-zÆØÅæøå ,.'-é]+$/i)])],
      'firstName': ['', Validators.compose([Validators.pattern(/^[a-zÆØÅæøå ,.'-é]+$/i)])],
      'lastName': ['', Validators.compose([Validators.pattern(/^[a-zÆØÅæøå ,.'-é]+$/i)])],
      'zip': ['', Validators.compose([Validators.pattern(/^[0-9]*$/)])],
      'country': ['', Validators.compose([Validators.pattern(/^[a-zÆØÅæøå ,.'-é]+$/i)])],
      'birthDate': ['',]

    });


    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  updateInfo() {
    console.log(this.newInfoForm);
    if (this.newInfoForm.controls.city.dirty) {
      this.profileData.updateCity(this.newInfoForm.city);
    }
    if (this.newInfoForm.controls.address.dirty) {
      this.profileData.updateAddress(this.newInfoForm.address);
    }
    if (this.newInfoForm.controls.firstName.dirty) {
      this.profileData.updateFirstName(this.newInfoForm.firstName);
    }
    if (this.newInfoForm.controls.lastName.dirty) {
      this.profileData.updateLastName(this.newInfoForm.lastName);
    }
    if (this.newInfoForm.controls.zip.dirty) {
      this.profileData.updateZip(this.newInfoForm.zip);
    }
    if (this.newInfoForm.controls.country.dirty) {
      this.profileData.updateCountry(this.newInfoForm.country);
    }
    if (this.newInfoForm.controls.birthDate.dirty) {
      this.profileData.updateDOB(this.newInfoForm.birthDate);
    }
    this.navCtrl.pop();
  }

  goToProfileSettings() {
    this.navCtrl.push(ProfileSettingsPage);
  }


}