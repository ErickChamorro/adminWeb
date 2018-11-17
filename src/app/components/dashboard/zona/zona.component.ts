import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// servicios
import { ApiService } from '../../../servicios/dataApi/api.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {
  // data que extrae del api de sucursales
  sucursales: any;

  // variable que contiene el nombre de la zona que se mostrara en este componente
  parametro_id_zona = '';
  constructor(private route: ActivatedRoute, private navbar: NavbarComponent) {}

  ngOnInit() {
    // funcion que muestra el listado de droguerias de la zona
    this.listar_droguerias();
  }

  listar_droguerias() {
    // funcion para gestionar parametros
    this.route.params.subscribe(data => {
      // tener api de sucursales
      this.navbar.get_detalle_zona(data['id']).subscribe(sucursales => {
        // variable donde se guarda el array que muestre las droguerias
        this.sucursales = sucursales['sucursal'];
        // variable donde guarda el nombre de la zona
        this.parametro_id_zona = sucursales['zona']['descripcion_zona'];

        // si quieres ver que nombre de la zona es en la consola descomenta la linea de abajo
        // console.log(this.parametro_id_zona);
      });
    });
  }
}
