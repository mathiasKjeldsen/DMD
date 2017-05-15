import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarData } from '../../providers/calendar-data';

@Component({
  selector: 'page-calendar-new-event',
  templateUrl: 'calendar-new-event.html'
})
export class CalendarNewEventPage {

  constructor(public navCtrl: NavController, public calendarData: CalendarData) {

  }

  updateNote() {
    this.calendarData.newCalendarEvent("test", "test", "test", "test").then(() => {
      alert("added to firebase")
    });
  }
}