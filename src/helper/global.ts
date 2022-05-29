import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
// import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class GlobalProvider {
  loadingJwt = true;
  profile;
  jws: string;
  role;
  mediaUrl;
  tempCache: any = {};
  constructor(
    protected storage: Storage,
    protected toastController: ToastController,
    protected alertController: AlertController
  ) {}

  async setMedia(mediaUrl) {
    await this.storage.set(`mediaUrl`, mediaUrl);
    this.mediaUrl = mediaUrl;
  }

  setCache(key, val) {
    this.tempCache[key] = val;
  }

  getCache(key) {
    return new Promise((res, rej) => {
      res(this.tempCache[key]);
    });
  }

  async showConfirmPop(
    headMsg,
    subMsg,
    okText = 'Yes',
    cancelText = 'No',
    cssClass?
  ) {
    if (!cssClass) cssClass = 'general-pop';
    return new Promise(async (res) => {
      const alert = await this.alertController.create({
        cssClass: cssClass,
        header: headMsg,
        message: subMsg,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              res(false);
              // console.log("Confirm Cancel: blah");
            },
          },
          {
            text: okText,
            handler: () => {
              res(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }
}
