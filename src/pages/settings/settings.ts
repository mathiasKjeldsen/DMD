import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public birthDate: any;
  public userProfile: any;
  public settingsForm;
  public passwordForm;
  public loading: any;

  constructor(public navCtrl: NavController, public profileData: ProfileData, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.settingsForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
    this.passwordForm = this.formBuilder.group({
      'newPassword': ['', Validators.compose([Validators.minLength(6), Validators.required])],
      'oldPassword': ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });




    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  isValid(field: string) {
    let formField = this.settingsForm.get(field);
    return formField.valid || formField.pristine;
  }

  isValidPass(field: string) {
    let formField = this.passwordForm.get(field);
    return formField.valid || formField.pristine;
  }



    updateEmail() {
    this.profileData.updateEmail(this.settingsForm.email, this.settingsForm.password).then(authData => {
      this.loading.dismiss().then(() => {
        this.navCtrl.pop();
      });
    }, error => {
      this.loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }


  updatePassword() {
    this.profileData.updatePassword(this.passwordForm.newPassword, this.passwordForm.oldPassword).then(authData => {
      this.loading.dismiss().then(() => {
        this.navCtrl.pop();
      });
    }, error => {
      this.loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}

