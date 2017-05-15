import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class CalendarData {
  public CalendarDatabase: firebase.database.Reference;
  public currentUser: firebase.User;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.CalendarDatabase = firebase.database().ref('/Calendar');
  }

  newCalendarEvent(note: string, starts: string, ends: string, date: string): firebase.Promise<any> {
    return this.CalendarDatabase.child(this.currentUser.uid).update({
      Date: date,
      Starts: starts,
      Ends: ends,
      Note: note,
    });
  }
}