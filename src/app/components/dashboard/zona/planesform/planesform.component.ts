import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../servicios/dataApi/api.service';

@Component({
  selector: 'app-planesform',
  templateUrl: './planesform.component.html',
  styleUrls: ['./planesform.component.css']
})
export class PlanesformComponent implements OnInit {
  disableSelectUno = new FormControl(false);
  disableSelectDos = new FormControl(false);
  disableSelectTres = new FormControl(false);

  nombre_sucursal: any;
  sucursales: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navbar: NavbarComponent,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.get_sucursal();
  }

  enviar_plan() {
    swal({
      title: 'Exito',
      text: 'Plan de trabajo asignado exitósamente',
      type: 'success'
    }).then(result => {
      // para volver a la pagina anterior...
      window.history.back();
    });
  }

  get_sucursal() {
    // funcion para gestionar parametros
    this.route.params.subscribe(data => {
      // tener api de sucursales
      // this.apiService.get_detalle_zona(data['id']).subscribe(sucursales => {
      // variable donde se guarda el array que muestre las droguerias
      // this.sucursales = sucursales['sucursal'][data['id']];
      this.nombre_sucursal = data['id'];
      // si quieres ver que nombre de la zona es en la consola descomenta la linea de abajo
      console.log(this.nombre_sucursal);
      // });
    });
  }
}
