import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/events'

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  public currentEvent: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
  }

  ionViewDidEnter() {
    this.eventProvider.getEventDetail(this.navParams.get('eventId'))
      .then(eventSnap => {
        this.currentEvent = eventSnap;
      });
  }

}