import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';
import { SwiperModule } from 'swiper/angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { IeComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    NgCalendarModule,
    IeComponentsModule
  ],
  declarations: [TestPage]
})
export class TestPageModule { }
