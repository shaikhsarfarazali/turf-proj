import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurfDetailPageRoutingModule } from './turf-detail-routing.module';

import { TurfDetailPage } from './turf-detail.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { IeComponentsModule } from 'src/app/components/components.module';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurfDetailPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule,
    IeComponentsModule
  ],
  declarations: [TurfDetailPage]
})
export class TurfDetailPageModule { }
