import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,     // <-- Habilita el uso de *ngIf
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons,       // <-- Contenedor de botones de Ionic
    IonBackButton     // <-- El componente del botón de regreso
  ]
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() backButton!: boolean; // Propiedad para decidir si se muestra o no el botón

  constructor() { }

  ngOnInit() { }
}