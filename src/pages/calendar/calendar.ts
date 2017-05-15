import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarNewEventPage } from '../calendar-new-event/calendar-new-event';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  constructor(public navCtrl: NavController) {

  }

  newCalendarEvent() {
    this.navCtrl.push(CalendarNewEventPage);
  }
}