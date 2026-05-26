import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CustomInputComponent } from '../../shared/components/custom-input/custom-input.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
imports: [
    IonContent, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    HeaderComponent,  
    CustomInputComponent
  ]})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

}
