import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurfBookingPage } from './turf-booking.page';

const routes: Routes = [
  {
    path: '',
    component: TurfBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurfBookingPageRoutingModule { }
