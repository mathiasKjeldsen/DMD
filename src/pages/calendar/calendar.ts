import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarNewEventPage } from '../calendar-new-event/calendar-new-event';
import { EventProvider } from '../../providers/events';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  public eventList: Array<any>;
  day = 17;
  month = 1;
  public userProfile: any;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public profileData: ProfileData) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });

  }

  ionViewDidEnter() {
    this.eventProvider.readFromCalendar(this.userProfile.userId).then(eventListSnap => {
      this.eventList = eventListSnap;
    });
  }

  newCalendarEvent() {
    this.navCtrl.push(CalendarNewEventPage, { day: this.day, month: this.month });
  }

  monthMinus() {
    if (this.month > 1) {
      this.month -= 1;
    }
  }

  monthPlus() {
    if (this.month < 3) {
      this.month += 1;
    }
  }


  monthMay() {
    this.month = 1;
  }

  monthJune() {
    this.month = 2;
  }

  monthJuly() {
    this.month = 3;
  }

  dayOne() {
    this.day = 1;
  }
  dayTwo() {
    this.day = 2;
  }
  dayThree() {
    this.day = 3;
  }
  dayFour() {
    this.day = 4;
  }
  dayFive() {
    this.day = 5;
  }
  daySix() {
    this.day = 6;
  }
  daySeven() {
    this.day = 7;
  }
  dayEight() {
    this.day = 8;
  }
  dayNine() {
    this.day = 9;
  }
  dayTen() {
    this.day = 10;
  }
  dayEleven() {
    this.day = 11;
  }
  dayTwelve() {
    this.day = 12;
  }
  dayThirteen() {
    this.day = 13;
  }
  dayFourteen() {
    this.day = 14;
  }
  dayFifteen() {
    this.day = 15;
  }
  daySixteen() {
    this.day = 16;
  }
  daySeventeen() {
    this.day = 17;
  }
  dayEighteen() {
    this.day = 18;
  }
  dayNineteen() {
    this.day = 19;
  }
  dayTwenty() {
    this.day = 20;
  }
  dayTwentyOne() {
    this.day = 21;
  }
  dayTwentyTwo() {
    this.day = 22;
  }
  dayTwentyThree() {
    this.day = 23;
  }
  dayTwentyFour() {
    this.day = 24;
  }
  dayTwentyFive() {
    this.day = 25;
  }
  dayTwentySix() {
    this.day = 26;
  }
  dayTwentySeven() {
    this.day = 27;
  }
  dayTwentyEight() {
    this.day = 28;
  }
  dayTwentyNine() {
    this.day = 29;
  }
  dayThirty() {
    this.day = 30;
  }
  dayThirtyOne() {
    this.day = 31;
  }
}