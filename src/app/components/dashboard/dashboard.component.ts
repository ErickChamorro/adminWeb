import { Component, OnInit } from '@angular/core';

// servicios
import { FuncionesService } from '../../servicios/funciones/funciones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private funciones: FuncionesService) {}

  ngOnInit() {
    // la funcion viene del servicio de funciones. presione F12 con el cursor encima de "togglear_sidebar" para ver la funcion
    this.funciones.togglear_sidebar();
  }
}
