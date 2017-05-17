import { Component } from '@angular/core';
import {
  NavController, LoadingController,
  AlertController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from '../../providers/profile-data';
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html'
})
export class ProfileSettingsPage {
  public profileInfoForm;
  public dateForm;
  public datepicker: string;
  public userProfile: any;
  public profilePageForm;
  loading: any;


  profileInfoInfo: { fullName: string, address: string, zip: string, city: string} = { fullName: '', address: '', zip: '', city: ''};
  dateInfo: { datepicker: string } = { datepicker: '' };

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public profileData: ProfileData, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.profileInfoForm = this.formBuilder.group({
      'fullName': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'address': ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.pattern(/^[a-zÆØÅæøå0-9é ,.'-]+$/i)])],
      'zip': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[0-9]*$/)])],
      'city': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
    });

    this.dateForm = this.formBuilder.group({
      'datepicker': ['', Validators.compose([Validators.minLength(1), Validators.required])]
    });

      this.profilePageForm = this.formBuilder.group({
      'summary': ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });


    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
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
    console.log(this.profileInfoForm.fullName);
    console.log(this.profileInfoForm.city);
    console.log(this.profileInfoForm.address);
    console.log(this.profileInfoForm.zip);
    console.log(this.dateForm.datepicker);

    if (this.profileInfoForm.controls.fullName.dirty) {
      this.profileData.updatefullName(this.profileInfoForm.fullName);
    }
    if (this.profileInfoForm.controls.city.dirty) {
      this.profileData.updateCity(this.profileInfoForm.city);
    }
    if (this.profileInfoForm.controls.address.dirty) {
      this.profileData.updateAddress(this.profileInfoForm.address);
    }

    if (this.profileInfoForm.controls.zip.dirty) {
      this.profileData.updateZip(this.profileInfoForm.zip);
    }
    if (this.dateForm.controls.datepicker.dirty) {
      this.profileData.updateDOB(this.dateForm.datepicker);
    }

    this.navCtrl.pop();
  }

  updatePic() {
    this.profileData.updatePhoto("https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/10403542_10207811032208273_8884013213151836092_n.jpg?oh=44c4e880cae45d2c864fadfad7432b81&oe=59926D43");
  }

  
  updateSummary(summary: string) {
    this.profileData.updateSummary(this.profilePageForm.summary).then(() => {
      this.navCtrl.pop();
    });
  }

}