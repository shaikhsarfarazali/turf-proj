import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import * as moment from 'moment';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage implements OnInit {
  event: any = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  }
  minDate = new Date().toISOString();

  constructor(public navParans: NavParams, private modalCtrl: ModalController) {
    let preSelectedDate = moment(this.navParans.get('selectedDay')).format();
    this.event.startTime = preSelectedDate;
    this.event.endTime = preSelectedDate;
  }

  ngOnInit() {
  }

  save() {
    // console.log(this.event);
    this.modalCtrl.dismiss(this.event);
  }

  dismissModal() {
    this.modalCtrl.dismiss()
  }

}
