import { NavController} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AdditionalInfoPage} from '../additional-info/additional-info';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

        }
}
