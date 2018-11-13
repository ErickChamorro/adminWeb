import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// servicios
import { FuncionesService } from '../../servicios/funciones/funciones.service';
import { ApiService } from '../../servicios/dataApi/api.service';

// interfaces
import { ZonaInterface } from '../../models/zona';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  zonas: any;
  constructor(
    private funciones: FuncionesService,
    private apiService: ApiService,
    private router: Router
  ) {
    // propiedades que tiene el arrar de zonas
    // this.zonas = {
    //   descripcion_zona: '',
    //   id_usuario_supervisor: null,
    //   id_zona: null,
    //   supervisor: ''
    // };
  }

  ngOnInit() {
    // la funcion viene del servicio de funciones. presione F12 con el cursor encima de "togglear_sidebar" para ver la funcion
    this.funciones.togglear_sidebar();

    this.apiService.get_zona().subscribe(data => {
      console.log(data['Zonas']);
      this.zonas = data['Zonas'];
    });
  }

  llevame_a_zona() {
    this.router.navigate(['dashboard/zona']);
  }
}
