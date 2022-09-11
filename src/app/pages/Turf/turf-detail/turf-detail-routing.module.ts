import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurfDetailPage } from './turf-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TurfDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurfDetailPageRoutingModule {}
