import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CalendarData } from '../../providers/calendar-data';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from '../../providers/profile-data';
import { EventProvider } from '../../providers/events';

@Component({
  selector: 'page-calendar-new-event',
  templateUrl: 'calendar-new-event.html'
})
export class CalendarNewEventPage {
  public eventForm;
  public radioForm;
  public userProfile: any;
  birthDate: string;
  public helperList: Array<any>;

  day: any;
  month: any;
  year = 2017;
  isUserCoordinator: any;
  userIsCoordinator: boolean;
  startTime: any;
  endTime: any;


  constructor(public navCtrl: NavController, public calendarData: CalendarData, public formBuilder: FormBuilder,
    public profileData: ProfileData, public navParams: NavParams, public eventProvider: EventProvider, public alertCtrl: AlertController) {


    this.eventForm = this.formBuilder.group({
      'start': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'end': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'note': ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });

    this.radioForm = this.formBuilder.group({
      'assign': ['', Validators.compose([Validators.minLength(1), Validators.required], )]
    });

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.userIsCoordinator = this.userProfile.userIsCoordinator;
    });

    this.day = navParams.get("day");
    this.month = navParams.get("month");

    this.startTime = new Date();
    this.startTime.setHours(14);
    this.startTime.setMinutes(0);
    this.endTime = new Date();
    this.endTime.setHours(14);
    this.endTime.setMinutes(0);
    this.startTime = this.startTime.toISOString();
    this.endTime = this.endTime.toISOString();
  }

  isValid(field: string) {
    let formField = this.eventForm.get(field);
    return formField.valid || formField.pristine;
  }

  addNewEvent() {
    this.isUserCoordinator = this.userIsCoordinator;
    var splitString: Array<any> = [];

    if (this.userProfile.userIsCoordinator) {
      console.log(this.radioForm);
      console.log(this.radioForm.assign);
      splitString = this.radioForm.assign.split(/_/);
      console.log(splitString);
      console.log("user Id: " + splitString[0]);
      console.log("full Name: " + splitString[1]);
    } else {
      splitString[0] = this.userProfile.userId;
      splitString[1] = this.userProfile.fullName;
    }

    if (this.startTime < this.endTime) {
      this.calendarData.newCalendarEvent(this.day, this.month, this.startTime[11] + this.startTime[12] + this.startTime[13] + this.startTime[14] + this.startTime[15], this.endTime[11] + this.endTime[12] + this.endTime[13] + this.endTime[14] + this.endTime[15], this.eventForm.note, this.isUserCoordinator, splitString[1], splitString[0], this.userProfile.userId).then(() => {
        let alert = this.alertCtrl.create({
          message: "Event created!",
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
      });
    } else {
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

  ionViewDidEnter() {
    this.eventProvider.getUserList(this.userProfile.userId).then(eventListSnap => {
      this.helperList = eventListSnap;
      console.log(eventListSnap);
    });
  }

}
