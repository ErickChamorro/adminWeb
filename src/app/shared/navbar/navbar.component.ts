import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../servicios/dataApi/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  coordinador: any;
  constructor(private http: HttpClient, private apiService: ApiService) {
    // las propiedades que tiene el array de "region"
    this.coordinador = {
      nombre: '',
      apellido: '',
      id_cordinador: '',
      id_region: '',
      region: ''
    };
  }

  ngOnInit() {
    // esto es para mostrar el usuario coordinador y las zonas que él esté a cargo
    // incluye una cabecera y se encuentra en servicio de API. presione F12 sobre la funcion "get_coordinador"
    // para que te lleve directo a la funcion
    this.apiService.get_coordinador().subscribe(data => {
      console.log(data['region']);
      this.coordinador = data['region'];
    });
  }
}
