import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from '../../providers/profile-data';
@Component({
  selector: 'page-additional-info',
  templateUrl: 'additional-info.html'
})
export class AdditionalInfoPage {
  public profileInfoForm;
  public dateForm;
  profileInfoInfo: { birthDate: string, address: string, zip: string, city: string, country: string } = { birthDate: '', address: '', zip: '', city: '', country: '',};
  dateInfo: { datepicker: string } = { datepicker: '' };

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public profileData: ProfileData) {

    this.profileInfoForm = this.formBuilder.group({

      'birthDate': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])],
      'address': ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])],
      'zip': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])],
      'city': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])],
      'country': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])]

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
    this.profileData.updateDOB(this.profileInfoForm.data.birthDate);
    this.profileData.updateAddress(this.profileInfoForm.data.address);
    this.profileData.updateZip(this.profileInfoForm.data.zip);
    this.profileData.updateCity(this.profileInfoForm.data.city);
    this.profileData.updateCountry(this.profileInfoForm.data.country);
  }

}