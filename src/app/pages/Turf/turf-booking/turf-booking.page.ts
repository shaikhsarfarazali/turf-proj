import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { TurfApiService } from 'src/api/turf_api.service';
import { EventModalPage } from '../../event-modal/event-modal.page';
@Component({
  selector: 'app-turf-booking',
  templateUrl: './turf-booking.page.html',
  styleUrls: ['./turf-booking.page.scss'],
})
export class TurfBookingPage implements OnInit {
  @ViewChild(CalendarComponent) myCal: CalendarComponent
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }

  eventSource: any[];
  viewTitle: string;
  selectedBy = new Date();
  events: any = [];

  turfData: any = {}
  loading: boolean = true;

  constructor(private route: ActivatedRoute, public modalCtrl: ModalController, private router: Router, private turfService: TurfApiService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.turfData = this.router.getCurrentNavigation().extras.state.user;
        this.getBookings(this.turfData?.turf_id)
      }
    });
  }

  getBookings(id) {
    // booked_date:"2019-07-16",booked_from:"03:05:00",booked_to:"22:14:00",turf_booking_id:11,turf_id:2
    this.turfService.getBookingsById(id).subscribe((res) => {
      res.length > 0 ?
        (res.forEach(el => {
          el['startTime'] = el.booked_date + 'T' + el.booked_from;
          el['endTime'] = el.booked_date + 'T' + el.booked_to;
          el['turf_booking_id'] = el.turf_booking_id;
          el['allDay'] = false;
          el['turf_id'] = el.turf_id;
          el['title'] = 'IGNITECH';
          this.addBookings(el);
        }), this.loading = false) : '';
    },
      (error) => {
        throw error
      })
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
      cssClass: 'add-event-modal',
      componentProps: {
        'selectedDay': this.selectedBy,
        'turfData': this.turfData
      },
      swipeToClose: false,
    });
    modal.onDidDismiss().then((selectedData: any) => {
      let data = selectedData.data
      if (data) {
        this.addBookings(data);
      }
    });
    return await modal.present();
  }

  addBookings(data) {
    let eventData: any = data;
    eventData.startTime = new Date(data.startTime);
    eventData.endTime = new Date(data.endTime);
    this.events.push(eventData);
    // this.eventSource = [];
    setTimeout(() => {
      this.eventSource = this.events;
    })
  }
}
