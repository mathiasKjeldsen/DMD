import { NavController} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AdditionalInfoPage} from '../additional-info/additional-info';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  public signupForm;
  userInfo: { email: string, password: string, confirm: string } = { email: '', password: '', confirm: '' };

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.signupForm = this.formBuilder.group({

      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.minLength(6), Validators.required])],
      'confirmPassword': ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});

    

  }
  
matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
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


goToAdditionalInfo() {
    this.navCtrl.push(AdditionalInfoPage);
}


}

