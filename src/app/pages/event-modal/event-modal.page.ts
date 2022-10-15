import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import * as moment from 'moment';
import { TurfApiService } from 'src/api/turf_api.service';
import { UserApiService } from 'src/api/user_api.service';
import { BaseHelper } from 'src/helper/baseHelper';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage implements OnInit {
  @Input() turfData: any;

  showPickerEnd: boolean;
  showPicker: boolean;

  event: any = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  }
  minDate = new Date().toISOString();

  constructor(public navParans: NavParams, private modalCtrl: ModalController, private turfService: TurfApiService, private b: BaseHelper, private userService: UserApiService) {
    let preSelectedDate = moment(this.navParans.get('selectedDay')).format();
    this.event.startTime = preSelectedDate;
    this.event.endTime = preSelectedDate;
  }

  ngOnInit() {
  }

  save() {
    this.event['booked_date'] = this.event.startTime.split('T')[0];
    this.event['from'] = this.event.startTime.split('T')[1];
    this.event['booked_from'] = this.event.from.split('+')[0].slice(0, -3);
    this.event['to'] = this.event.endTime.split('T')[1];
    this.event['booked_to'] = this.event.to.split('+')[0].slice(0, -3);
    this.event['turf_id'] = this.turfData.turf_id;
    console.log(this.event)
    this.checkAvailability();
  }

  dismissModal() {
    this.modalCtrl.dismiss()
  }

  checkAvailability() {
    this.turfService.getAvailability(this.event).subscribe((res) => {
      if (res.available) {
        this.createBooking();
        this.modalCtrl.dismiss(this.event);
      } else {
        this.b.toast('currently slot is not available', 2000, 'warning');
      }
    },
      (error) => {
        throw error
      });
  }

  createBooking() {
    this.userService.bookTurf(this.event).subscribe((res) => {
      if (res) {
        this.b.toast('slot booked successfully', 2000, 'success');
      }
    },
      (error) => {
        throw error
      })
  }
}
