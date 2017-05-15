import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarData } from '../../providers/calendar-data';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from '../../providers/profile-data';


@Component({
  selector: 'page-calendar-new-event',
  templateUrl: 'calendar-new-event.html'
})
export class CalendarNewEventPage {
  public eventForm;
  public userProfile: any;
  public birthDate: string;

  constructor(public navCtrl: NavController, public calendarData: CalendarData, public formBuilder: FormBuilder, public profileData: ProfileData) {


    this.eventForm = this.formBuilder.group({
      'date': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'start': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'end': ['', Validators.compose([Validators.minLength(1), Validators.required])],
      'note': ['', Validators.compose([Validators.minLength(1), Validators.required])]
    });
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  isValid(field: string) {
    let formField = this.eventForm.get(field);
    return formField.valid || formField.pristine;
  }

  updateNote() {
    this.calendarData.newCalendarEvent(this.eventForm.date, this.eventForm.start, this.eventForm.end, this.eventForm.note).then(() => {
      alert("added to firebase")
    });
  }
}
