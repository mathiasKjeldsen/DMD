import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class CalendarData {
  public CalendarDatabase: firebase.database.Reference;
  public currentUser: firebase.User;

  public EventNumber = 0;
  public dateNumber = 0;
  public randomLetter;
  public randomLetterTwo;
  public eventApprovedByCoordinater;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.CalendarDatabase = firebase.database().ref('/Calendar/'+this.currentUser.uid);
  }

  newCalendarEvent(date: string, startTime: string, endTime: string, note: string, isUserCoordinator): firebase.Promise<any> {

    this.randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    this.randomLetterTwo = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    this.dateNumber = Date.now();
    this.EventNumber = this.dateNumber + this.randomLetter + this.randomLetterTwo;

    return this.CalendarDatabase.child("Calendar Event " + this.EventNumber).update({
      Date: date,
      StartTime: startTime,
      EndTime: endTime,
      Note: note,
      blueStampedByCoordinator: isUserCoordinator,
    });
  }

}