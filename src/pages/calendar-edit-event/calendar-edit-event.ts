import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-calendar-edit-event',
  templateUrl: 'calendar-edit-event.html'
})

export class CalendarEditEventPage {

  eventId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eventId = navParams.get("eventId");
    console.log(this.eventId);
  }

}
