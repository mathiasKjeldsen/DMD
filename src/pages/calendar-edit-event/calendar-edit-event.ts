import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/events';
import { CalendarData } from '../../providers/calendar-data';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-calendar-edit-event',
  templateUrl: 'calendar-edit-event.html'
})

export class CalendarEditEventPage {

  eventId: any;
  assignedTo: any;
  startTime: any;
  endTime: any;
  note: any;

  public editEventForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider, public calendarData: CalendarData, public formBuilder: FormBuilder) {
    this.eventId = navParams.get("eventId");
    this.assignedTo = navParams.get("assignedTo");
    this.startTime = navParams.get("startTime");
    this.endTime = navParams.get("endTime");
    this.note = navParams.get("note");


    this.editEventForm = this.formBuilder.group({
      'start': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'end': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'note': ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });

  }

  isValid(field: string) {
    let formField = this.editEventForm.get(field);
    return formField.valid || formField.pristine;
  }

  //updateCalendarEvent() {
  //   if (this.startTime < this.endTime) {
  //    this.calendarData.updateCalendarEvent(this.startTime, this.endTime, this.editEventForm.note, this.assignedTo, this.eventId).then(() => {
  //     alert("Event updated!")
  //     this.navCtrl.pop();
  //    });
  //   } else {
  //    alert("Start time must be before end time")
  // }
  // }

  updateCalendarEvent() {
    if (this.editEventForm.controls.start.dirty && this.startTime < this.endTime) {
      this.calendarData.updateCalendarEventStart(this.startTime, this.assignedTo, this.eventId).then(() => {
      });
    } else if (this.editEventForm.controls.start.dirty && this.startTime > this.endTime) {
      alert("Start time must be before end time")
    }
    console.log(this.startTime);

    if (this.editEventForm.controls.end.dirty && this.startTime < this.endTime) {
      this.calendarData.updateCalendarEventEnd(this.endTime, this.assignedTo, this.eventId).then(() => {

      });
    } else if (this.editEventForm.controls.end.dirty && this.startTime > this.endTime) {
      alert("Start time must be before end time")
    }
    console.log(this.endTime);
    if (this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      this.calendarData.updateCalendarEventNote(this.note, this.assignedTo, this.eventId).then(() => {
      });
    } else if (this.editEventForm.controls.note.dirty && this.startTime > this.endTime) {
      alert("Start time must be before end time")
    }
    console.log(this.note);
    if (this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      alert("Updated event");
      this.navCtrl.pop();
    }
    if (!this.editEventForm.controls.start.dirty && !this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      alert("Updated note");
      this.navCtrl.pop();
    }
    if (this.editEventForm.controls.start.dirty && !this.editEventForm.controls.end.dirty && !this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      alert("Updated start time");
      this.navCtrl.pop();
    }

    if (!this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && !this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      alert("Updated end time");
      this.navCtrl.pop();
    }

    if (!this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      alert("Updated end time and note");
      this.navCtrl.pop();
    }

    if (this.editEventForm.controls.start.dirty && !this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      alert("Updated start time and note");
      this.navCtrl.pop();
    }

    if (this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && !this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      alert("Updated start and end time");
      this.navCtrl.pop();
    }

    if (this.startTime == this.endTime) {
      alert("Start time must be before end time")
    }

  }



  // updateCalendarEvent(day: string, month: string, startTime: string, endTime: string, note: string, 
  // isUserCoordinator, fullName: string, assignedTo: string, assignedBy: string, eventId: string)

}
