import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Calendar } from 'ionic-native';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  public title: string;
  public note: string;
  public startDate: Date;
  public endDate: Date;
  public titleUpdated: string;
  public noteUpdated: string;

  constructor(public navCtrl: NavController) {

    this.startDate = new Date();
    this.startDate.setMinutes(this.startDate.getMinutes() + 10);
    this.endDate = new Date();
    this.endDate.setHours(this.startDate.getHours() + 1);

    console.log(this.startDate);
    console.log(this.endDate);
  }

  createEvent() {
    Calendar.createEvent("Event test", null, "Creating an event through Handify", this.startDate, this.endDate).then(() => {
      alert("created");
    });
  }

  createEventInteractively() {
    Calendar.createEventInteractively("Event test", null, "Creating an event through Handify", this.startDate, this.endDate).then(() => {
      alert("created");
    });
  }

  deleteEvent() {
    Calendar.deleteEvent("Event test", null, "Creating an event through Handify", this.startDate, this.endDate).then(data => {
      alert("deleted/notdeleted")
    });
  }

  openCalendar() {
    Calendar.openCalendar(this.startDate);
  }

  testStuff() {
    Calendar.requestReadWritePermission()
  }

}