import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController); // Lo agregamos para que tus avisos (toast) funcionen
  router = inject(Router);

  // ========== Loading / Pantalla de Carga ==========

  // 1. FUNCIÓN PARA CREAR Y MOSTRAR EL LOADING (Te faltaba esta)
  async loading() {
    const loader = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'md'
    });
    await loader.present();
    return loader;
  }

  // 2. FUNCIÓN PARA CERRAR EL LOADING (Estaba creando uno en vez de cerrarlo)
  async dismissLoading() {
    return await this.loadingCtrl.dismiss();
  }

  // ========== Toast / Alertas Flotantes ==========
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    return toast.present();
  }

  // ========== Guardar en LocalStorage ==========
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // ========== Obtener de LocalStorage ==========
  getFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // ========== Enrutamiento ==========
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
}