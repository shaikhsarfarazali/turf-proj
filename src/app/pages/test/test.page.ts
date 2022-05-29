import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { EventModalPage } from '../event-modal/event-modal.page';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  eventSource: [];
  viewTitle: string;
  selectedBy = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedBy
  }
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addEvent() {
    let modal = await this.modalCtrl.create({
      component: EventModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'selectedDay': this.selectedBy
      }

    });
    await modal.present();

    modal.onDidDismiss().then((selectedData: any) => {
      let data = selectedData.data
      if (data) {
        let eventData: any = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events: any = [];
        events.push(eventData);
        // this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        })
      }
    });
  }

  onViewTitleChanged(ev) {
    this.viewTitle = ev;
  }

  async onEventSelected(ev) {
    let start = moment(ev.startTime).format('LLLL');
    let end = moment(ev.endTime).format('LLLL');

    let alert = await this.alertCtrl.create({
      header: '' + ev.title,
      subHeader: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    await alert.present();
  }

  onTimeSelected(ev) {
    this.selectedBy = ev.selectedTime;
  }
}
