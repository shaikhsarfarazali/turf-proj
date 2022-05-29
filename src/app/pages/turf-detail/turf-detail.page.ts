import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { EventModalPage } from '../event-modal/event-modal.page';
@Component({
  selector: 'app-turf-detail',
  templateUrl: './turf-detail.page.html',
  styleUrls: ['./turf-detail.page.scss'],
})
export class TurfDetailPage implements OnInit {
  @ViewChild(CalendarComponent) myCal: CalendarComponent

  eventSource: [];
  viewTitle: string;
  selectedBy = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }

  slots = [{
    name: 'Shaikh Sarfaraz Ali',
    time: new Date(),
    address: 'Sharifa Road, Amrut Nagar, Mumbra Thane- 400612'
  }, {
    name: 'Shaikh Sarfaraz Ali',
    time: new Date(),
    address: 'Sharifa Road, Amrut Nagar, Mumbra Thane- 400612'
  }, {
    name: 'Shaikh Sarfaraz Ali',
    time: new Date(),
    address: 'Sharifa Road, Amrut Nagar, Mumbra Thane- 400612'
  }, {
    name: 'Shaikh Sarfaraz Ali',
    time: new Date(),
    address: 'Sharifa Road, Amrut Nagar, Mumbra Thane- 400612'
  }, {
    name: 'Shaikh Sarfaraz Ali',
    time: new Date(),
    address: 'Sharifa Road, Amrut Nagar, Mumbra Thane- 400612'
  }]

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  removeEvents() {
    this.eventSource = [];
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
}
