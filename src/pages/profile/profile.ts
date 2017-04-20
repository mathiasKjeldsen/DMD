import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';

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

    this.newInfoForm = this.formBuilder.group({

      'city': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'address': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'firstName': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'lastName': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'zip': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'country': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'birthDate': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])]

    });

  }

  updateInfo() {
    console.log(this.newInfoForm);
    this.profileData.updateCity(this.newInfoForm.city);
    this.profileData.updateAddress(this.newInfoForm.address);
    this.profileData.updateName(this.newInfoForm.firstName, this.newInfoForm.lastName);
    this.profileData.updateZip(this.newInfoForm.zip);
    this.profileData.updateCountry(this.newInfoForm.country);
    this.profileData.updateDOB(this.newInfoForm.birthDate);
  }

}