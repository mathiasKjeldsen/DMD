import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarNewEventPage } from '../calendar-new-event/calendar-new-event';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  public day = 20;
  constructor(public navCtrl: NavController) {

  }

  newCalendarEvent() {
    this.navCtrl.push(CalendarNewEventPage);
  }

  dayTwenty() {
    this.day = 20;
  }

  dayTwentyOne() {
    this.day = 21;
  }
}