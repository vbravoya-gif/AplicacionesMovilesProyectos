import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router'; 
import { addIcons } from 'ionicons';
import { logInOutline, personAddOutline, alertCircleOutline } from 'ionicons/icons';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CustomInputComponent } from '../../shared/components/custom-input/custom-input.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonButton, 
    IonIcon, 
    IonHeader,
    IonToolbar,
    IonTitle,
    RouterLink,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    HeaderComponent,
    CustomInputComponent,
    LogoComponent
  ]
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  firebaseSvc = inject(FirebaseService);
  router = inject(Router);
  ngZone = inject(NgZone);

  constructor() {
    addIcons({ logInOutline, personAddOutline, alertCircleOutline });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {

      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        this.ngZone.run(() => {
          console.log(res);
          // Tu login funciona directo aquí hermano
        });
      }).catch(error => {
        this.ngZone.run(() => {
          console.error(error);
          alert(error.message); // Alerta nativa directa sin servicios fallando
        });
      });

    }
  }
}