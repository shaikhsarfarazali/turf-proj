import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurfBookingPageRoutingModule } from './turf-booking-routing.module';

import { TurfBookingPage } from './turf-booking.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { IeComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurfBookingPageRoutingModule,
    NgCalendarModule,
    IeComponentsModule
  ],
  declarations: [TurfBookingPage]
})
export class TurfBookingPageModule { }
