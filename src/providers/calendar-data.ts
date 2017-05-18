import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class CalendarData {
  public CalendarDatabase: firebase.database.Reference;
  public currentUser: firebase.User;

  public eventNumber: any;
  public dateNumber = 0;
  public randomLetter;
  public randomLetterTwo;
  public eventApprovedByCoordinater;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.CalendarDatabase = firebase.database().ref('/Calendar/');
  }

  newCalendarEvent(day: string, month: string, startTime: string, endTime: string, note: string, isUserCoordinator, fullName: string, assignedTo: string, assignedBy: string): firebase.Promise<any> {

    this.randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    this.randomLetterTwo = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    this.dateNumber = Date.now();
    this.eventNumber = this.dateNumber + this.randomLetter + this.randomLetterTwo;

    return this.CalendarDatabase.child(assignedTo + '/' + this.eventNumber).update({
      day: day,
      month: month,
      startTime: startTime,
      endTime: endTime,
      note: note,
      blueStampedByCoordinator: isUserCoordinator,
      userName: fullName,
      eventId: this.eventNumber,
      assignedTo: assignedTo,
      assignedBy: assignedBy
    });
  }


  updateCalendarEventStart(startTime: string, assignedTo: string, eventId: string): firebase.Promise<any> {
    return this.CalendarDatabase.child(assignedTo + '/' + eventId).update({
      startTime: startTime,
      assignedTo: assignedTo,
    });
  }

   updateCalendarEventEnd(endTime: string, assignedTo: string, eventId: string): firebase.Promise<any> {
    return this.CalendarDatabase.child(assignedTo + '/' + eventId).update({
      endTime: endTime,
      assignedTo: assignedTo,
    });
  }

   updateCalendarEventNote(note: string, assignedTo: string, eventId: string): firebase.Promise<any> {
    return this.CalendarDatabase.child(assignedTo + '/' + eventId).update({
      note: note,
      assignedTo: assignedTo,
    });
  }




  //updateCalendarEvent(startTime: string, endTime: string, note: string, assignedTo: string, eventId: string): firebase.Promise<any> {
  //  return this.CalendarDatabase.child(assignedTo + '/' + eventId).update({
   //   startTime: startTime,
   //   endTime: endTime,
  //    note: note,
   //   assignedTo: assignedTo,
   // });
 // }

  deleteCalendarEvent(eventId: string, assignedTo: string) {
    return this.CalendarDatabase.child(assignedTo + '/' + eventId).remove().then(() => {
      alert("Event succesfully removed")
    });
  }

  blueStamp(blueStampedByCoordinator: boolean, id: string, assignedTo: string): firebase.Promise<any> {
    return this.CalendarDatabase.child(assignedTo + '/' + id).update({
      blueStampedByCoordinator: blueStampedByCoordinator,
    });
  }

}