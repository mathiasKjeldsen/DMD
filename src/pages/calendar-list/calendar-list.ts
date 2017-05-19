import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/events';
import { ProfileData } from '../../providers/profile-data';
import { CalendarData } from '../../providers/calendar-data';

@Component({
  selector: 'page-calendar-list',
  templateUrl: 'calendar-list.html'
})
export class CalendarListPage {

  month: any;
  public eventList: Array<any>;
  public eventListTwo: Array<any> = [];
  public userProfile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider, public profileData: ProfileData, public calendarData: CalendarData) {

    this.month = navParams.get("month");

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });

  }

  ionViewDidEnter() {
    this.eventListTwo = [];
    var self = this;

    if (!this.userProfile.userIsCoordinator) {
      this.eventProvider.readFromCalendar(this.userProfile.userId).then(eventListSnap => {
        this.eventList = eventListSnap;
      });

    } else {
      this.eventProvider.readHelpersFromCalendar(this.userProfile.userId).then(helpers => {
        helpers.forEach(helper => {
          self.eventProvider.readCalendarForHelper(helper.userId).then(eventListSnap => {
            self.eventListTwo = self.eventListTwo.concat(eventListSnap);
          });
        });
      });
    }
  }

  
}