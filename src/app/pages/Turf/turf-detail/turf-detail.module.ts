import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurfDetailPageRoutingModule } from './turf-detail-routing.module';

import { TurfDetailPage } from './turf-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurfDetailPageRoutingModule
  ],
  declarations: [TurfDetailPage]
})
export class TurfDetailPageModule {}
