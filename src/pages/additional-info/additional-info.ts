import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { AdditionalInfoTwoPage } from '../additional-info-two/additional-info-two';
@Component({
  selector: 'page-additional-info',
  templateUrl: 'additional-info.html'
})
export class AdditionalInfoPage {
  public additionalForm;
  additionalInfo: { first: string, second: string, date: string} = { first: '', second: '', date: ''};

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.additionalForm = this.formBuilder.group({

      'first': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])],
      'second': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])],
      'date': ['', Validators.compose([Validators.minLength(6), Validators.required])]

    });
  }

   isValid(field: string) {
    let formField = this.additionalForm.get(field);
    return formField.valid || formField.pristine;
  }

  backToPreviousPage() {
    this.navCtrl.pop();
  }

  goToNextStep() {
    this.navCtrl.push(AdditionalInfoTwoPage);
  }

}