import { Component } from '@angular/core';
import { HandifyPage } from '../handify/handify';
import { SignUpPage } from '../sign-up/sign-up';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loginForm;
  loading: any;

  loginInfo: { email: string, password: string } = { email: '', password: '' };

  testText: string;

  userProfile: any;

  constructor(public authData: AuthData, public navCtrl: NavController, public formBuilder: FormBuilder, public menuCtrl: MenuController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.loginForm = this.formBuilder.group({

      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  isValid(field: string) {
    let formField = this.loginForm.get(field);
    return formField.valid || formField.pristine;
  }


  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }
  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }


  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false, 'mainMenu');
  }

  loginUser() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HandifyPage);
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

  facebookLogin() {
    let alert = this.alertCtrl.create({
      message: "Facebook is not implemented yet!",
      cssClass: 'alertcss',
      buttons: [
        {
          cssClass: "alertButtonNormal",
          text: "Ok",
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  lostPasswordNav() {
    this.navCtrl.push(ResetPasswordPage);
  }

}