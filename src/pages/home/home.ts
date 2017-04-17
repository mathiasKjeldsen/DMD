import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HandifyPage } from '../handify/handify';
import { SignUpPage } from '../sign-up/sign-up';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loginForm;
  loginInfo: { email: string, password: string } = { email: '', password: '' };

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public menuCtrl: MenuController) {

    this.loginForm = this.formBuilder.group({

      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  isValid(field: string) {
    let formField = this.loginForm.get(field);
    return formField.valid || formField.pristine;
  }

  logIn() {
    this.navCtrl.setRoot(HandifyPage);
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }

ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false, 'mainMenu');
  }

}
