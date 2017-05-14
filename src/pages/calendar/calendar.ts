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

  private nav: NavController;

  constructor(public navCtrl: NavController) {

    this.nav = navCtrl;

    this.title = 'Event 1';
    this.note = 'Creating an event !';
    this.startDate = new Date();
    this.startDate.setMinutes(this.startDate.getMinutes() + 10);
    this.endDate = new Date();
    this.endDate.setHours(this.startDate.getHours() + 1);

    this.titleUpdated = 'Event updated';
    this.noteUpdated = 'We update the event !';
  }

  public createEvent():void{

    let options:any = {
      firstReminderMinutes:5
    };

    Calendar.createEventWithOptions(this.title, null, this.note, this.startDate, this.endDate, options).then(() => {
      alert("created");
    });
  }

  public deleteEvent():void{
    Calendar.deleteEvent(this.title, null, this.note, this.startDate, this.endDate).then(data => {
      alert("deleted/notdeleted")
    });
  }

  public openCalendar():void{
    Calendar.openCalendar(this.startDate);
  }
}