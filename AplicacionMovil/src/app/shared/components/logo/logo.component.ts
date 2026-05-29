import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon
  ]
})
export class LogoComponent implements OnInit {

  constructor() {
    addIcons({ homeOutline });
  }

  ngOnInit() {
  }

}