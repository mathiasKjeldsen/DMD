import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/events';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-my-coordinator',
  templateUrl: 'my-coordinator.html'
})

export class MyCoordinatorPage {

  public eventList: Array<any>;
  public userProfile: any;
  public birthDate: string;

  constructor(public navCtrl: NavController, public profileData: ProfileData, public eventProvider: EventProvider) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });
  }

  ionViewDidEnter() {
    this.eventProvider.findMyCoordinator(this.userProfile.connectedToUser).then(eventListSnap => {
      this.eventList = eventListSnap;
    });
  }
}