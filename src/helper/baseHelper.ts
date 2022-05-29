import {
  LoadingController,
  NavController,
  MenuController,
  ToastController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavigationExtras } from '@angular/router';
import { GlobalProvider } from './global';

@Injectable({
  providedIn: 'root',
})
export class BaseHelper {
  gLoading;

  constructor(
    private platform: Platform,
    protected loadingCtrl: LoadingController,
    protected toastController: ToastController,
    protected modalCtrl: ModalController,
    protected navCtrl: NavController,
    protected menu: MenuController,
    protected storage: Storage,
    private g: GlobalProvider
  ) {}

  async toast(message, duration = 2000, color = `success`) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          // handler: () => {
          //   console.log('Cancel clicked');
          // },
        },
      ],
    });
    toast.present();
  }

  setJws(tokenObj, mediaUrl) {
    this.setStorage('companyToken', tokenObj);
    this.g.jws = tokenObj.token;
    // this.g.profile = profile;
    // this.g.mediaUrl = mediaUrl;
  }
  clearJws() {
    this.setStorage('companyToken', null);
    this.g.jws = null;
    this.g.profile = null;
  }
  async getJws() {
    return await this.getStorage('companyToken');
  }
  async loadLoading(toggle = true) {
    if (toggle) {
      if (!this.gLoading) {
        await this.initLoadLoading();
      }
      this.gLoading.present();
    } else {
      if (this.gLoading) {
        await this.gLoading.dismiss();
      }

      this.initLoadLoading();
    }
    return;
  }

  setStorage(key, value) {
    this.storage.set(key, value);
  }

  async getStorage(key) {
    return await this.storage.get(key);
  }

  async initLoadLoading() {
    this.gLoading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      duration: 5000,
    });
  }

  navigateRoot(path, queryParams = null) {
    if (queryParams) {
      const navigationExtras: NavigationExtras = {
        queryParams,
      };
      this.navCtrl.navigateRoot(path, navigationExtras);
    } else {
      this.navCtrl.navigateRoot(path);
    }
  }
  navigate(path, queryParams = null) {
    this.navCtrl.navigateForward(path, { queryParams });
  }

  pop() {
    this.navCtrl.pop();
  }

  async logout() {
    this.navigate('');
  }
}
