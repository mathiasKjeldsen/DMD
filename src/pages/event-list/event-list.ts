import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/events';
import { EventDetailPage } from '../event-detail/event-detail';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
      public eventList: Array<any>;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider) {
  }

  ionViewDidEnter() {
  this.eventProvider.getEventList().then( eventListSnap => {
    this.eventList = eventListSnap;
  });
}

goToEventDetail(eventId){
  this.navCtrl.push(EventDetailPage, { 'eventId': eventId });
}

}