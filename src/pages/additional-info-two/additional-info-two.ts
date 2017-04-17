import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HandifyPage } from '../handify/handify';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'page-additional-info-two',
  templateUrl: 'additional-info-two.html'
})
export class AdditionalInfoTwoPage {
  public additionalForm;
  additionalInfo: { first: string, second: string, date: string} = { first: '', second: '', date: ''};

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.additionalForm = this.formBuilder.group({

      'first': ['', Validators.compose([Validators.minLength(6), Validators.required])],
      'second': ['', Validators.compose([Validators.minLength(6), Validators.required])],
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

  goToHandify() {
    this.navCtrl.setRoot(HandifyPage);
  }

}