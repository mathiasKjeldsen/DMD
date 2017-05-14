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
              country: snap.val().country,
            });
            return false
          });
          resolve(rawList);
        });
    });
  }

}