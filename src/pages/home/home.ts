import { Component } from '@angular/core';
import { HandifyPage } from '../handify/handify';
import { SignUpPage } from '../sign-up/sign-up';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { Facebook } from '@ionic-native/facebook'
import firebase from 'firebase';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';

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
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, private facebook: Facebook) {

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

  loginUser(): void {
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

  // Facebook login virker. Den signer en in, og så stopper det der. Vi mangler følgende:
  // Vi skal finde ud af om man signer op eller man logger ind. For at tjekke det burde vi kunne tage "if facebook mail = mail in our system, just sign in"
  // Hvis facebook mail = not mail in our system, skal vi videre til additionalinfopage. Idéen er at den allerede skal være udfyldt for en med ens facebook stuff, men man kan ændre det hvis man vil.
  // Vi skal gemme det hele i firebase manuelt, for det gør den ikke af sig selv. Tjek hvordan min far gør det?  

  // Jeg tror det er vigtigt at differentiere mellem sign up og sign in. Eventuelt bare tjekke om mailen allerede er i systemet, og hvis den ikke er kører vi sign up koden fra ovenfor med facebook?
  // Så hvis man ikke har en Handify user, får man automatisk en, og bruger facebook til at logge ind på den. Man er ikke bare direkte logget ind på facebook.

  facebookLogin(): void {
    this.facebook.login(['email', 'public_profile']).then((response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((currentUser) => {

          this.userProfile = currentUser;
          //creates an account with asd@asd.asd as email/username, newpass33 as password and bjorn skalkam as full name
          //this.authData.signupUser(this.userProfile.email,"newpass33", this.userProfile.displayName)
          this.authData.signupUser("asd@asd.asd","newpass33","bjorn skalkam")
        .then((newUser) => {
          this.loading.dismiss().then(() => {
            this.navCtrl.push(ProfileSettingsPage); 
          });
        }, (error) => {
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
          console.log("Firebase success: " + JSON.stringify(currentUser));
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(error) });
  }
}