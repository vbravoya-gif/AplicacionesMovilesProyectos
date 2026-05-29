import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  async loading() {
    return await this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
}