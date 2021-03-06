import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()

export class EventProvider {

  constructor() {

  }

  getUserList(userID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref(`userProfile/`).orderByChild('connectedToUser').equalTo(userID)
        .on('value', snapshot => {
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              id: snap.key,
              fullName: snap.val().fullName,
              profilePhoto: snap.val().profilePhoto,
              email: snap.val().email,
              connectedToUser: snap.val().connectedToUser,
              city: snap.val().city,
              address: snap.val().address,
              zip: snap.val().zip,
              userId: snap.val().userId,
            });
            return false
          });
          resolve(rawList);
        });
    });
  }

  findMyCoordinator(connectedToInput: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref(`userProfile/`).orderByChild('userId').equalTo(connectedToInput)
        .on('value', snapshot => {
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              id: snap.key,
              fullName: snap.val().fullName,
              profilePhoto: snap.val().profilePhoto,
              email: snap.val().email,
              city: snap.val().city,
              address: snap.val().address,
              zip: snap.val().zip,
              birthDate: snap.val().birthDate,
              summary: snap.val().summary,
            });
            return false
          });
          resolve(rawList);
        });
    });
  }

  readFromCalendar(userID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      //firebase.database().ref(`Calendar/`).orderByChild('Note').equalTo("asd").on('value', snapshot => {
      //firebase.database().ref(`Calendar/`+userID).on('value', snapshot => {
      firebase.database().ref(`Calendar/` + userID + '/').on('value', snapshot => {
        let rawList = [];
        snapshot.forEach(snap => {
          //console.log(snap.val());
          rawList.push({
            id: snap.key,
            day: snap.val().day,
            month: snap.val().month,
            startTime: snap.val().startTime,
            endTime: snap.val().endTime,
            note: snap.val().note,
            blueStampedByCoordinator: snap.val().blueStampedByCoordinator,
            userName: snap.val().userName,
            eventId: snap.val().eventId,
            assignedTo: snap.val().assignedTo,
            assignedBy: snap.val().assignedBy,
          });
          return false
        });
        resolve(rawList);
      });
    });
  }

  readHelpersFromCalendar(userID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let rawList: Array<any> = [];
      firebase.database().ref('userProfile/').orderByChild('connectedToUser').equalTo(userID).once('value', snapshot => {
        snapshot.forEach(snap => {
          //console.log(snap.val().userId);
          rawList.push(snap.val());
          return false
        });
        resolve(rawList);
      });
    });
  }

  readCalendarForHelper(userID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let rawList: Array<any> = [];
      firebase.database().ref('Calendar/' + userID + '/').once('value', snapshot => {
        snapshot.forEach(snap => {
          //console.log(snap.val());
          rawList.push(snap.val());
          return false
        });
        resolve(rawList);
      });
    });
  }
}