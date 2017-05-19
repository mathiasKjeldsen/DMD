import { SignUpInfoPage } from '../sign-up-info/sign-up-info';
import {
  NavController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  public signupForm;
  loading: any;

  clickedAny: boolean = false;
  coordinator: boolean = false;

  userInfo: { fullName: string, email: string, password: string, confirm: string } = { fullName: '', email: '', password: '', confirm: '' };

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authData: AuthData, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public profileData: ProfileData) {
    this.signupForm = this.formBuilder.group({
      'fullName': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.minLength(6), Validators.required])],
      'confirmPassword': ['', Validators.required],
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });

  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }

  }

  isValid(field: string) {
    let formField = this.signupForm.get(field);
    return formField.valid || formField.pristine;
  }

  backToPreviousPage() {
    this.navCtrl.pop();
  }

  signUpUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.fullName, this.coordinator)
        .then((newUser) => {
          this.loading.dismiss().then(() => {
            this.navCtrl.push(SignUpInfoPage);
          });
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              cssClass: 'alertcss',
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

  chooseHelper() {
    this.clickedAny = true;
    this.coordinator = false;
  }

  chooseCoordinator() {
    this.clickedAny = true;
    this.coordinator = true;
  }
}