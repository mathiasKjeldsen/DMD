import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-calendar-list',
  templateUrl: 'calendar-list.html'
})
export class CalendarListPage {

  month: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.month = navParams.get("month");

  }
}