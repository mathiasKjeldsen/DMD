import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider, public calendarData: CalendarData, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
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

  updateCalendarEvent() {
    if (this.editEventForm.controls.start.dirty && this.startTime < this.endTime) {
      this.calendarData.updateCalendarEventStart(this.startTime, this.assignedTo, this.eventId).then(() => {
      });
    } else if (this.editEventForm.controls.start.dirty && this.startTime > this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Start time must be before end time",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
    
    console.log(this.startTime);

    if (this.editEventForm.controls.end.dirty && this.startTime < this.endTime) {
      this.calendarData.updateCalendarEventEnd(this.endTime, this.assignedTo, this.eventId).then(() => {

      });
    } else if (this.editEventForm.controls.end.dirty && this.startTime > this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Start time must be before end time",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
    console.log(this.endTime);
    if (this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      this.calendarData.updateCalendarEventNote(this.note, this.assignedTo, this.eventId).then(() => {
      });
    } else if (this.editEventForm.controls.note.dirty && this.startTime > this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Start time must be before end time",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
    console.log(this.note);

    if (this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Updated event",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

    if (!this.editEventForm.controls.start.dirty && !this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Updated note",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

    if (this.editEventForm.controls.start.dirty && !this.editEventForm.controls.end.dirty && !this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Updated start time",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }


    if (!this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && !this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Updated end time",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }


    if (!this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Updated end time and note",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

    if (this.editEventForm.controls.start.dirty && !this.editEventForm.controls.end.dirty && this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Updated start time and note",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

    if (this.editEventForm.controls.start.dirty && this.editEventForm.controls.end.dirty && !this.editEventForm.controls.note.dirty && this.startTime < this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Updated start and end time",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

    if (this.startTime == this.endTime) {
      let alert = this.alertCtrl.create({
        message: "Start time must be before end time",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

  }



  // updateCalendarEvent(day: string, month: string, startTime: string, endTime: string, note: string, 
  // isUserCoordinator, fullName: string, assignedTo: string, assignedBy: string, eventId: string)

}
