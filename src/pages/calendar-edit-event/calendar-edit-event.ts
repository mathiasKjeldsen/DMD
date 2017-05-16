import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/events';
import { CalendarData } from '../../providers/calendar-data';
@Component({
  selector: 'page-calendar-edit-event',
  templateUrl: 'calendar-edit-event.html'
})

export class CalendarEditEventPage {

  eventId: any;
  assignedTo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider, public calendarData: CalendarData) {
    this.eventId = navParams.get("eventId");
    this.assignedTo = navParams.get("assignedTo");
  }

  updateCalendarEvent() {
    this.calendarData.updateCalendarEvent("dasup nerd", "monthxx", "sddtartTime", "ddendTime", "note", true, this.assignedTo, this.eventId)
  }

  // updateCalendarEvent(day: string, month: string, startTime: string, endTime: string, note: string, 
  // isUserCoordinator, fullName: string, assignedTo: string, assignedBy: string, eventId: string)

}
