import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class ProfileData {
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');
  }

  updatePhoto(photoURL: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      profilePhoto: photoURL,
    });
  }

  getUserProfile(): firebase.database.Reference {
    this.currentUser = firebase.auth().currentUser;
    return this.userProfile.child(this.currentUser.uid);
  }

  updateSummary(summary: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      summary: summary
    });
  }

  //updateName(fullName: string, lastName: string): firebase.Promise<any> {
  //    return this.userProfile.child(this.currentUser.uid).update({
  //     fullName: fullName,
  //      lastName: lastName,
  //   });
  // }

  updatefullName(fullName: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      fullName: fullName,
    });
  }

  updateLastName(LastName: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      lastName: LastName,
    });
  }

  updateZip(zip: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      zip: zip,
    });
  }

  updateCity(city: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      city: city,
    });
  }

  updateAddress(address: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      address: address,
    });
  }

  updateCountry(country: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      country: country,
    });
  }

  updateDOB(birthDate: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  connectHelperToCurrentUser(coordinatorUid: string, helperUid: string) {
    return firebase.database().ref('/userProfile').child(helperUid).update({ 'connectedToUser': coordinatorUid });
  }

  findUidByEmailAndConnectToCurrentUser(emailInput: string, coordinatorUid) {
    var self = this;
    var foundUser = false;
    return firebase.database().ref('/userProfile').orderByChild('email').equalTo(emailInput).once('value').then(function (snapshot) {
      snapshot.forEach(childSnapshot => {
        foundUser = true;
        var user = childSnapshot.val();
        console.log(user.userId);
        alert("Succesfully added user " + emailInput + " as your helper");
        return self.connectHelperToCurrentUser(coordinatorUid, user.userId);
      });
      if (foundUser == false) {
        alert("We can not find user " + emailInput + " on the database.");
      }
    });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticate(credential).then(user => {
      this.currentUser.updateEmail(newEmail).then(user => {
        this.userProfile.child(this.currentUser.uid)
          .update({ email: newEmail });
      });
    });
  }

  updatePassword(newPass: string, oldPassword: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider
      .credential(firebase.auth().currentUser.email, oldPassword);

    return firebase.auth().currentUser.reauthenticate(credential)
      .then(user => {
        firebase.auth().currentUser.updatePassword(newPass).then(user => {
          console.log("Password Changed");
        }, error => {
          console.log(error);
        });
      });
  }
}