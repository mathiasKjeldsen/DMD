import { NavController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { FormBuilder, Validators } from '@angular/forms';
import { EventProvider } from '../../providers/events';

@Component({
  selector: 'page-manage-helpers',
  templateUrl: 'manage-helpers.html'
})

export class ManageHelpersPage {

  public eventList: Array<any>;

  public userProfile: any;
  public birthDate: string;
  public connectHelperForm;

  constructor(public navCtrl: NavController, public profileData: ProfileData, public formBuilder: FormBuilder, public eventProvider: EventProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.connectHelperForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
    });

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });
  }

  isValid(field: string) {
    let formField = this.connectHelperForm.get(field);
    return formField.valid || formField.pristine;
  }

  findUidByEmailAndConnectToCurrentUser() {
    this.profileData.findUidByEmailAndConnectToCurrentUser(this.connectHelperForm.email, this.userProfile.userId)
  }

ionViewDidEnter() {
    this.eventProvider.getUserList(this.userProfile.userId).then(eventListSnap => {
      this.eventList = eventListSnap;
    });
  }

}