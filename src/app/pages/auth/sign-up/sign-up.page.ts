import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logInOutline, personAddOutline, alertCircleOutline } from 'ionicons/icons';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.models';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { UtilService } from '../../../services/utils';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,

    // Componentes estructurales de Ionic
    IonContent,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,

    // Componentes compartidos
    HeaderComponent,
    LogoComponent,
    CustomInputComponent
  ],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilService); 
  router = inject(Router);
  ngZone = inject(NgZone);

  constructor() {
    addIcons({ logInOutline, personAddOutline, alertCircleOutline });
  }

  ngOnInit() {
  }

  // Se añade async aquí para poder controlar la pantalla de carga correctamente
  async submit() {
  if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.signUp(this.form.value as User).then(async res => {
      // 1. Actualizamos nombre
      await this.firebaseSvc.updateUser(this.form.value.name);
      
      // 2. Guardamos en Firestore
      this.setUserInfo(res.user.uid);

      loading.dismiss();
    }).catch(e => {
      loading.dismiss();
      alert(e.message);
    });
  }
}

  setUserInfo(uid: string) {
    if (this.form.valid) {
      
      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
        
        // Guardamos los datos de sesión localmente
        this.utilsSvc.saveInLocalStorage('user', this.form.value);

        // Cerramos el loading justo antes de movernos de pantalla para evitar congelamientos
        await this.utilsSvc.dismissLoading();

        // 🚀 Redirección limpia al Home
        this.utilsSvc.routerLink('/main/home');

        this.form.reset();
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        // Nos aseguramos de cerrar cualquier rastro del loading flotante
        this.utilsSvc.dismissLoading();
      });
    }
  }
}