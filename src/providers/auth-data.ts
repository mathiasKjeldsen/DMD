import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, fullName: string, coordinator: boolean): firebase.Promise<any> {
    var lowCaseEmail = email.toLowerCase();
    return this.fireAuth.createUserWithEmailAndPassword(lowCaseEmail, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({ email: lowCaseEmail, fullName: fullName, userIsCoordinator: coordinator, profilePhoto: "assets/img/placeholder.jpg", userId: newUser.uid });
      });
  }
  
  resetPassword(email: string): firebase.Promise<any> {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.fireAuth.signOut();
  }



}