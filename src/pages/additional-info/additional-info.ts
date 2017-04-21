import { Component } from '@angular/core';
import {
  NavController, LoadingController,
  AlertController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from '../../providers/profile-data';
import { HandifyPage } from '../handify/handify';
@Component({
  selector: 'page-additional-info',
  templateUrl: 'additional-info.html'
})
export class AdditionalInfoPage {
  public profileInfoForm;
  public dateForm;
  loading: any;
  profileInfoInfo: { birthDate: string, address: string, zip: string, city: string, country: string } = { birthDate: '', address: '', zip: '', city: '', country: '', };
  dateInfo: { datepicker: string } = { datepicker: '' };

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public profileData: ProfileData, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.profileInfoForm = this.formBuilder.group({

      'birthDate': ['', Validators.compose([Validators.minLength(0), Validators.required])],
      'address': ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'zip': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[0-9]*$/)])],
      'city': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'country': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])]

    });
    this.dateForm = this.formBuilder.group({
      'datepicker': ['', Validators.compose([Validators.minLength(1), Validators.required])]
    });

  }

  isValid(field: string) {
    let formField = this.profileInfoForm.get(field);
    return formField.valid || formField.pristine;
  }

  testIsValid(field: string) {
    let formField = this.dateForm.get(field);
    return formField.valid || formField.pristine;
  }

  backToPreviousPage() {
    this.navCtrl.pop();
  }

  updateProfile() {
    console.log(this.profileInfoForm);

    if (this.profileInfoForm.controls.city.dirty) {
      this.profileData.updateCity(this.profileInfoForm.city);
    }
    if (this.profileInfoForm.controls.address.dirty) {
      this.profileData.updateAddress(this.profileInfoForm.address);
    }

    if (this.profileInfoForm.controls.zip.dirty) {
      this.profileData.updateZip(this.profileInfoForm.zip);
    }

    if (this.profileInfoForm.controls.country.dirty) {
      this.profileData.updateCountry(this.profileInfoForm.country);
    }
    
    if (this.profileInfoForm.controls.birthDate.dirty) {
    this.profileData.updateDOB(this.profileInfoForm.birthDate);
    }

    this.navCtrl.setRoot(HandifyPage);
  }

}
