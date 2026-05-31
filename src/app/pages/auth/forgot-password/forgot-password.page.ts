import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logInOutline, personAddOutline, alertCircleOutline } from 'ionicons/icons';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../models/user.models';
import { UtilService } from '../../../services/utils';
import { IonButton, IonIcon, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent,
    CustomInputComponent, LogoComponent, IonButton, IonIcon]
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  router = inject(Router);
  ngZone = inject(NgZone);
  utilsSvc = inject(UtilService);

  constructor() {
    addIcons({ logInOutline, personAddOutline, alertCircleOutline });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {


        this.utilsSvc.presentToast({
          message: `Correo enviado con exito}`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'call-circle-outline'
        });
        this.utilsSvc.routerLink('/auth');
        this.form.reset();
      })
        .catch(error => {
          this.ngZone.run(() => {
            console.error(error);
            alert(error.message); // Alerta nativa directa sin servicios fallando
          });
        });

    }
  }
  getUserInfo(uid: string) {
    if (this.form.valid) {

      let path = `users/${uid}`;

      this.firebaseSvc.getDocument(path).then((user: User) => {

        // Guardamos los datos de sesión localmente
        this.utilsSvc.saveInLocalStorage('user', user);

        // Cerramos el loading justo antes de movernos de pantalla para evitar congelamientos
        this.utilsSvc.dismissLoading();

        // 🚀 Redirección limpia al Home
        this.utilsSvc.routerLink('/main/home');

        this.form.reset();
        this.utilsSvc.presentToast({
          message: ``,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        });

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