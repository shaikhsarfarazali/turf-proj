import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BaseHelper } from 'src/helper/baseHelper';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsPageModule)
  },
  {
    path: 'turf-booking',
    loadChildren: () => import('./pages/Turf/turf-booking/turf-booking.module').then(m => m.TurfBookingPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then(m => m.TestPageModule)
  },
  {
    path: 'event-modal',
    loadChildren: () => import('./pages/event-modal/event-modal.module').then(m => m.EventModalPageModule)
  },
  {
    path: 'turf-detail',
    loadChildren: () => import('./pages/Turf/turf-detail/turf-detail.module').then(m => m.TurfDetailPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
