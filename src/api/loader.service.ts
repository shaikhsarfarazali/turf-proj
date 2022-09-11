import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    constructor(public loadingController: LoadingController) { }

    // Simple loader
    async showLoader() {
        this.loadingController.create({
            message: 'Please Wait...',
            spinner: 'circles',
        }).then((response) => {
            response.present();
        });
    }
    // Dismiss loader
    async hideLoader() {
        this.loadingController.dismiss().then((response) => {
            console.log('Loader closed!', response);
        }).catch((err) => {
            console.log('Error occured : ', err);
        });
    }
    // Auto hide show loader
    autoLoader() {
        this.loadingController.create({
            message: 'Loading...',
            spinner: 'circles',
            duration: 4000
        }).then((response) => {
            response.present();
            response.onDidDismiss().then((response) => {
                console.log('Loader dismissed', response);
            });
        });
    }
    // Custom style + hide on tap loader
    customLoader() {
        this.loadingController.create({
            message: 'Loading...',
            duration: 4000,
            cssClass: 'loader-css-class',
            backdropDismiss: true
        }).then((res) => {
            res.present();
        });
    }
}