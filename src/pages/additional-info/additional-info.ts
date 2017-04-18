import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'page-additional-info',
  templateUrl: 'additional-info.html'
})
export class AdditionalInfoPage {
  public additionalForm;
  public dateForm;
  additionalInfo: { first: string, second: string, date: string } = { first: '', second: '', date: '' };
  dateInfo: { datepicker: string } = { datepicker: '' };
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.additionalForm = this.formBuilder.group({

      'first': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])],
      'second': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)])]

    });
    this.dateForm = this.formBuilder.group({
      'datepicker': ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  isValid(field: string) {
    let formField = this.additionalForm.get(field);
    return formField.valid || formField.pristine;
  }

  testIsValid(field: string) {
    let formField = this.dateForm.get(field);
    return formField.valid || formField.pristine;
  }

  backToPreviousPage() {
    this.navCtrl.pop();
  }

}